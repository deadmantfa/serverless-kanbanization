# serverless-kanbanization
Automate GitHub Projects Kanban board using GitHub API's based on Issue Labels
This is a fairly simple and extensible kanban power-up for GitHub Projects that automates the triaging of new issues to project boards and to track issue statuses automatically

Big thanks to [Paul Dariye](https://github.com/pauldariye) for creating the base of this project.

## Features

- Move a project card along the board automatically.
- Triage issues to different project boards automatically.

[Read more about it in this blog post](https://medium.com/the-andela-way/https-medium-com-the-andela-way-how-to-build-a-power-up-for-your-github-project-board-for-project-344d5b380a68).

## Usage

Install it and run:
```bash
git clone git@github.com:deadmantfa/serverless-kanbanization.git
cp .env.example .env # TODO: Add all env variables here
cd serverless-kanbanization && yarn
yarn dev
```

Visit [https://localhost:3000](https://localhost:3000) or `https://[NGROK_SUBDOMAIN].ngrok.io`

## Deploy

Deploy it to the AWS Lambda with [serverless](https://serverless.com/) ([download](https://serverless.com/framework/docs/getting-started/))

Make changed to the mentioned file

```yaml
vi serverless.yml
```
```bash
yarn deploy
```

## GitHub Setup
1. Open repository Settings -> Webhooks
2. Set URL to the deployment response API Gateway url
3. Add the following parameter _?user=<github-username>&repo=<github-reponame>_
4. Set Webhook secret.
5. Choose "Let me select individual event".
6. Check only "Issues" and uncheck all others.

## Acknowlegement
- [aws-node-github-webhook-listener](https://github.com/serverless/examples/tree/master/aws-node-github-webhook-listener)
- [kanbanize](https://github.com/pauldariye/kanbanize)
- [Medium](https://medium.com/the-andela-way/https-medium-com-the-andela-way-how-to-build-a-power-up-for-your-github-project-board-for-project-344d5b380a68).
- [Paul Dariye](https://github.com/pauldariye).

## License
[GPL-3.0-or-later](https://raw.githubusercontent.com/deadmantfa/serverless-kanbanization/master/LICENSE)
