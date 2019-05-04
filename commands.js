var botBuilder = require('claudia-bot-builder')
const slackTemplate = botBuilder.slackTemplate;
var callbacks = require('./callbacks')

module.exports = {
  '/gluon': (request) => {
    return callbacks.profile(request);
  },

  '/skill': (request) => {
    return 'Skill command, with original text: ' + request.text
  },


}