var botBuilder = require('claudia-bot-builder'),
    excuse = require('huh');

const slackTemplate = botBuilder.slackTemplate;
const slackDialog = botBuilder.slackDialog;

const api = botBuilder(function (request) {
  if (request.type === 'slack-slash-command') {

    if (request.text === 'summary') {
      const message = new slackTemplate('This is sample text');
    
      return message
        .addAttachment('A1')
          .addAction('Button 1', 'button', '1')
          .addAction('Button with confirm', 'button', '2')
            .addConfirmation('Ok?', 'This is confirm text', 'Ok', 'Cancel')
          .addAction('Button 3', 'button', '3')
        .get();
    } 

    if (request.text === 'dialog') {
      const dialog = new slackDialog(request.originalRequest.token, request.originalRequest.trigger_id, 'Sign something', 'Sign', '12345');
    
      return dialog
        .addInput('Tekstas', 'pavadinimas')
        .get();
    }     
  }

  return 'Original message: \`\`\`\n' + JSON.stringify(request) + '\n\`\`\`'
});

api.post('/slack/events', request => {
  // Verify request if challenge is sent
  /*
  {
    "token": "Jhj5dZrVaK7ZwHHjRyZWjbDl",
    "challenge": "3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P",
    "type": "url_verification"
  }
  */
  if (request.body.challenge && request.body.type === 'url_verification')
    return request.body.challenge

  // Otherwise handle an event from Events API
  return 'Original event: \`\`\`\n' + JSON.stringify(request) + '\n\`\`\`'
})

module.exports = api