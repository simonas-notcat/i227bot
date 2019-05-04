var botBuilder = require('claudia-bot-builder')
const slackTemplate = botBuilder.slackTemplate;
var profile = require('./messages/profile')
var create_new_claim = require('./messages/create_new_claim')
var new_claim = require('./messages/new_claim')
var share_all_claims = require('./messages/share_all_claims')
var create_sdr = require('./messages/create_sdr')
var post_sdr = require('./messages/post_sdr')
var respond_to_sdr = require('./messages/respond_to_sdr')


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
      case 'share_my_claims':
        message.blocks = share_all_claims.blocks
      break
      case 'create_sdr':
        message.blocks = create_sdr.blocks
      break
      default:
        message.text = 'Unsupported action_id  \`\`\`\n' + JSON.stringify(request) + '\n\`\`\`'
    }
    
    return message
  },

  'create_new_claims': (request) => {
    const message = new slackTemplate().get();

    switch(request.actions[0].action_id) {
      case 'select_user':
      case 'select_skill':
        message.blocks = create_new_claim.blocks
      break
      default:
        message.text = 'Unsupported action_id  \`\`\`\n' + JSON.stringify(request) + '\n\`\`\`'
    }
    
    return message
  },

  'share_all_claims': (request) => {
    const message = new slackTemplate().get();

    switch(request.actions[0].action_id) {
      case 'generate_link':
        message.text = '@simonas has these claims '
        message.attachments = [
          {
              "fallback": "Gluon Space: Decentralized reputation",
              "title": "Decentralized reputation",
              "title_link": "https://gluon.space/",
              "text": "@simonas is sharing these claims about @simonas",
              "image_url": "https://gluon.space/web-title.jpg"
          }
        ]
        message.response_type = 'in_channel'
      break
      default:
        message.text = 'Unsupported action_id  \`\`\`\n' + JSON.stringify(request) + '\n\`\`\`'
    }
    
    return message
  },


  'create_claim': (request) => {
    const message = new slackTemplate().get();
    
    message.blocks = new_claim.blocks
    message.response_type = 'in_channel'
    return message
  },

  'create_sdr': (request) => {
    const message = new slackTemplate().get();
    
    switch(request.actions[0].action_id) {
      case 'select_skill':
        message.blocks = create_sdr.blocks
      break
      default:
        message.text = 'Unsupported action_id  \`\`\`\n' + JSON.stringify(request) + '\n\`\`\`'
    }
    return message
  },

  'post_sdr': (request) => {
    const message = new slackTemplate().get();
    
    switch(request.actions[0].action_id) {
      case 'post_sdr':
        message.blocks = post_sdr.blocks
        message.response_type = 'in_channel'
        break
      default:
        message.text = 'Unsupported action_id  \`\`\`\n' + JSON.stringify(request) + '\n\`\`\`'
    }
    return message
  },

  'respond_to_sdr': (request) => {
    const message = new slackTemplate().get();
    
    switch(request.actions[0].action_id) {
      case 'respond_to_sdr':
        message.blocks = respond_to_sdr.blocks
        message.response_type = 'in_channel'
        break
      default:
        message.text = 'Unsupported action_id  \`\`\`\n' + JSON.stringify(request) + '\n\`\`\`'
    }
    return message
  },

}