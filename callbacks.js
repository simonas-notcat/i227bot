var botBuilder = require('claudia-bot-builder')
const slackTemplate = botBuilder.slackTemplate;

module.exports = {
  'summary': (request) => {
    return 'A1 callback: ' + JSON.stringify(request)
  },

  'sign': (request) => {

    const message = new slackTemplate('Select teammate:');
    
    return message
      .addAttachment('teammate')
        .addSelect('Teammate', 'nameas', null, 'users')
      .get();
  },

  'teammate': (request) => {

    const message = new slackTemplate('Select skill for <@' + request.actions[0]['selected_options'][0].value + '>');
    
    return message
      .addAttachment('skill')
        .addSelect('Skill', 'nameas', [
          {
            "text": "Developer",
            "value": "Developer"
          },
          {
            "text": "UX Designer",
            "value": "UX Designer"
          }
        ], 'static')
      .get();
  },


  'skill': (request) => {

    return 'Skill callback: ' + JSON.stringify(request)
  },
}