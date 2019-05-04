var botBuilder = require('claudia-bot-builder')
const slackTemplate = botBuilder.slackTemplate;
var profile = require('./messages/profile')
var create_new_claim = require('./messages/create_new_claim')


module.exports = {
  'profile': (request) => {
    const message = new slackTemplate().get();
    
    message.blocks = profile.blocks
    return message
  },
  
  'profile_actions': (request) => {
    const message = new slackTemplate().get();

    switch(request.actions[0].action_id) {
      case 'create_new_skill':
        message.blocks = create_new_claim.blocks
      break
      default:
        message.text = 'Unsupported action_id  \`\`\`\n' + JSON.stringify(request) + '\n\`\`\`'
    }
    
    return message
  },

}