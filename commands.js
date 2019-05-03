var botBuilder = require('claudia-bot-builder')
const slackTemplate = botBuilder.slackTemplate;

module.exports = {
  '/gluon': (request) => {
    const message = new slackTemplate('Your decentralized reputation:');
    
    return message
      .addAttachment('summary')
        .addTitle('Skill')
        .addText('Developer')
        .addText('UX Designer')
        .addAction('Share', 'button', 'share')
      .addAttachment('sign')
        .addAction('Endorse skill', 'button', 'skill')
        .addAction('Emoji', 'button', 'emoji')
      .get();
  },

  '/skill': (request) => {
    return 'Skill command, with original text: ' + request.text
  },


}