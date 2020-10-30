const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
  const snykOrgId = core.getInput('snyk-org-id');
  const regexTitle = new RegExp(core.getInput('regex-title'));
  const regexEmail = new RegExp(core.getInput('regex-email'));
  const checkboxPattern = core.getInput('regex-checkbox');
  
  if ( regexTitle.test(github.context.payload.issue.title) ) {
    const emailMatch = regexEmail.exec(github.context.payload.issue.body);
    if ( emailMatch != null ) {
      console.log(`title: ${github.context.payload.issue.title}`)
      console.log(`email: ${emailMatch[1]}`)
    }
  }
  
/*
  axios.defaults.baseURL= 'https://snyk.io/api/v1'; 
  axios.defaults.headers.common['Authorization']= `token ${process.env.SNYK_TOKEN}`; 
  axios.defaults.headers.post['Content-Type']= 'application/json'; 
  axios.post(`/org/${snykOrgId}/invite`, {
    email: 'pierre@evil.org'
  })
  .then(function (response) {
    core.setOutput("http-response-code", response.status);
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
    core.setOutput("http-response-code", error.response.status);
    core.setFailed(error.response);
  });
*/ 
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

