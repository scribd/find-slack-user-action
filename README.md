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

## Outputs

### `username`

The retrieved Slack username.

### `member-id`

The retrieved Slack user's member ID.

### `found-user`

Boolean indicating if a matching Slack username was found.
