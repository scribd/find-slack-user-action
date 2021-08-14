# Find Slack User Action

GitHub Action that retrieves a Slack username for the author of the most recent commit (or provided email).

## Example usage

```yaml
- name: Find Slack user
  id: find-slack-user
  uses: scribd/find-slack-user-action@v1
  with:
    slack-token: ${{ secrets.SLACK_API_TOKEN }}

- name: Print Slack user
  run: echo "${{ steps.find-slack-user.outputs.username }}"

- name: Mention the user in Slack
  uses: archive/github-actions-slack@v2.2.1
  with:
    slack-function: send-message
    slack-bot-user-oauth-access-token: ${{ secrets.SLACK_API_TOKEN }}
    slack-channel: ABC123
    slack-text: |
      "Hello, <@${{ steps.find-slack-user.outputs.member-id }}>!"
```

## Inputs

### `email`

**Required** The email to convert to slack user. *Defaults to whomever pushed the last commit*

### `slack-token`

**Required** The Slack API token.

### `default-username`

The username to use if the email address does not match a Slack user.

### `default-member-id`

The member ID to use if the email address does not match a Slack user.

### `include-at-symbol`

Include @ as a prefix to the found user. *Defaults to false*

## Outputs

### `username`

The retrieved Slack username.

### `member-id`

The retrieved Slack user's member ID. This is what you'll use to [mention your user](https://api.slack.com/reference/surfaces/formatting#mentioning-users):
> Hey <@U024BE7LH>, thanks for submitting your report.

### `found-user`

Boolean indicating if a matching Slack username was found.


## Permissions

You'll need to provide the following permissions for the slack bot:

- https://api.slack.com/scopes/users:read.email
