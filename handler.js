const {json, send, text} = require('micro');
const config = require('./config');
const actions = require('./actions');
const {signRequestBody} = require('./lib/crypto');

module.exports = async (req, res) => {
    if (req.headers['content-type'] !== 'application/json') {
        return send(res, 500, {body: `Update webhook to send 'application/json' format`})
    }

    try {
        const [payload, body] = await Promise.all([json(req), text(req)]);
        const headers = req.headers;
        const sig = headers['x-hub-signature'];
        const githubEvent = headers['x-github-event'];
        const id = headers['x-github-delivery'];
        const calculatedSig = signRequestBody(config.github.secret, body);
        const action = payload.action;
        let errMessage;
        const query = req.event.query;
        process.env.OWNER = query.user;
        process.env.REPOSITORY = query.repo;

        if (!sig) {
            errMessage = 'No X-Hub-Signature found on request';
            return send(res, 401, JSON.stringify({message: errMessage}));
        }

        if (!githubEvent) {
            errMessage = 'No Github Event found on request';
            return send(res, 422, JSON.stringify({message: errMessage}));
        }

        if (githubEvent !== 'issues') {
            errMessage = 'No Github Issues event found on request';
            return send(res, 422, JSON.stringify({message: errMessage}));
        }

        if (!id) {
            errMessage = 'No X-Github-Delivery found on request';
            return send(res, 401, JSON.stringify({message: errMessage}));
        }

        if (sig !== calculatedSig) {
            errMessage = 'No X-Hub-Signature doesn\'t match Github webhook secret.';
            return send(res, 401, JSON.stringify({message: errMessage}));
        }

        if (!Object.keys(actions).includes(action)) {
            errMessage = `No handlers for action: '${action}'. Skipping ...`;
            return send(res, 422, JSON.stringify({message: errMessage}));
        }

        // Invoke action
        actions[action](payload);
        errMessage = `Processed '${action}' for issue: '${payload.issue.number}'.`;
        return send(res, 200, JSON.stringify({message: errMessage}));
    } catch (err) {
        console.log(err);
        let errMessage = `Error occurred: ${err}`;
        send(res, 500, JSON.stringify({message: errMessage}));
    }
};
