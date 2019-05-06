var botBuilder = require('claudia-bot-builder')
const slackTemplate = botBuilder.slackTemplate;
var callbacks = require('./callbacks')

module.exports = {
  '/gluon': (request) => {
    return callbacks.help(request);
  },

  '/skill': (request) => {
    return callbacks.create_new_claims(request);
  },


}