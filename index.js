const core = require('@actions/core');
const github = require('@actions/github');

try {
  const snykOrgId = core.getInput('snyk-org-id');
  const regexTitle = core.getInput('regex-title');
  const regexEmail = core.getInput('regex-email');
  const regexCheckbox = core.getInput('regex-checkbox');
  console.log(`snykOrgId ${snykOrgId}!`);
  console.log(`regexTitle ${regexTitle}!`);
  console.log(`regexEmail ${regexEmail}!`);
  console.log(`regexCheckbox ${regexCheckbox}!`);
  core.setOutput("http-response-code", 200);
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

