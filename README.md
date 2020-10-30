# Snyk invite user issue action

A GitHub action to invite a user to Snyk. The action is triggered whenever a GitHub issue matching a title and body is created (e.g. onboarding ticket)

## Requirements

A GitHub secret named `SNYK_TOKEN` must be created on the repo and contain a valid Snyk API token with enough privilege to invite users to the Snyk org.

## Usage

```yml
on: 
  issues:
    types: [opened, reopened]

jobs:
  snyk_invite_job:
    runs-on: ubuntu-latest
    name: A job to invite a Snyk user 
    steps:
    - name: invite action step
      id: invite
      uses: pierre-ernst/Snyk-invite-user-issue-action@v0.1.0
      with:
        snyk-org-id: "4a18d42f-0706-4ad0-b127-24078731fbed"
        regex-title: "Issue Trigger - .+"
        regex-email: "- Email:\\s*([^\\s]+)\\s*"
        regex-checkbox: "- \\[ \\] The checkbox"  
      env:  
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}  
    - name: Get the output HTTP response code
      run: echo "The HTTP response code was ${{ steps.invite.outputs.http-response-code }}"

```

## Action inputs

| Name | Description | Required |
| --- | --- | ---|
| `snyk-org-id` | Snyk org id (not the org slug), example 4a18d42f-0706-4ad0-b127-24078731fbed | **yes** |
| `regex-title` | Regular expression used to match titles of Issues that needs to be considered as a trigger | **yes** |
| `regex-email` | Regular expression used to match the email address of the new Snyk user to be invited to the given org | **yes** |
| `regex-checkbox` | Optional regular expression used to match markdown checkbox that will be checked upon successful completion (usefull for meta-issues) | *no* |

## Action outputs

| Name | Description |
| --- | ---|
| `http-response-code` | HTTP response code returned by the Snyk API |
