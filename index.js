const core = require('@actions/core');
const slack = require('slack')

async function run() {
  try { 
    const email = core.getInput('email', { required: true })
    const slackToken = core.getInput('slack-token', { required: false }) || process.env.SLACK_API_TOKEN
    const includeAtSymbol = core.getInput('include-at-symbol') == 'true'

    if (!slackToken) {
      core.setFailed('No Slack token provided. Either add SLACK_API_TOKEN to the env or provide the slack-token parameter.')
      return
    }

    const response = await lookupUserByEmail(slackToken, email)

    core.setOutput("found-user", response.success)
    core.setOutput("username", response.success ? (includeAtSymbol ? '@' : '').concat(response.user.name) : core.getInput('default-username', { required: false }))
    core.setOutput("member-id", response.success ? response.user.id : core.getInput('default-member-id', { required: false }))
  }
  catch (err) {
    core.setFailed(err.message)
  }
}

async function lookupUserByEmail(slackToken, email) {
  try {
    const response = await slack.users.lookupByEmail({ token: slackToken, email });
    console.log(`Response: ${JSON.stringify(response)}`)
    core.setOutput("response", JSON.stringify(response))
    return { success: true, user: response.user };
  } catch (err) {
    console.error(`Error looking up user by email: ${err.message}`);
    return { success: false };
  }
}

run()