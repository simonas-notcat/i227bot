var botBuilder = require('claudia-bot-builder')
const slackTemplate = botBuilder.slackTemplate;
var commands = require('./commands')
var callbacks = require('./callbacks')

const api = botBuilder(function (request) {
  switch (request.type) {
    case 'slack-slash-command':
      if (commands[request.originalRequest.command]){
        return commands[request.originalRequest.command](request.originalRequest)
      } else {
        return 'Command not supported'
      }
      break

    case 'slack-message-action':
      if (callbacks[request.originalRequest.callback_id]){
        return callbacks[request.originalRequest.callback_id](request.originalRequest)
      } else {
        return 'callback_id not supported'
      }
    break
    default:
      return 'Original message: \`\`\`\n' + JSON.stringify(request) + '\n\`\`\`'
  }

});

api.post('/slack/events', request => {
  // Verify request if challenge is sent
  if (request.body.challenge && request.body.type === 'url_verification')
    return request.body.challenge

  // Otherwise handle an event from Events API
  return 'Original event: \`\`\`\n' + JSON.stringify(request) + '\n\`\`\`'
})

module.exports = api