const core = require('@actions/core');
const slack = require('slack')

async function run() {
  try { 
    const email = core.getInput('email', { required: true })
    const slackToken = core.getInput('slack-token', { required: false }) || process.env.SLACK_API_TOKEN

    if (!slackToken) {
      core.setFailed('No Slack token provided. Either add SLACK_API_TOKEN to the env or provide the slack-token parameter.')
      return
    }

    var success = true
    const response = await slack.users.lookupByEmail({token:slackToken, email:email}).catch(err => {
      success = false
    })

    core.setOutput("found-user", success)
    core.setOutput("username", success ? response.user.name : core.getInput('default-username', { required: false }))
    core.setOutput("member-id", success ? response.user.id : core.getInput('default-member-id', { required: false }))
  }
  catch (err) {
    core.setFailed(err.message)
  }
}

run()