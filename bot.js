const promiseDelay = require('promise-delay');
const aws = require('aws-sdk');
const lambda = new aws.Lambda();
const botBuilder = require('claudia-bot-builder');
const slackDelayedReply = botBuilder.slackDelayedReply;

const api = botBuilder((message, apiRequest) => {
  console.log({message, apiRequest})


	  // Invoke the same Lambda function asynchronously, and do not wait for the response
	  // this allows the initial request to end within three seconds, as requiured by Slack

    return new Promise((resolve, reject) => {
      lambda.invoke({
  			FunctionName: apiRequest.lambdaContext.functionName,
  			InvocationType: 'Event',
  			Payload: JSON.stringify({
          slackEvent: message // this will enable us to detect the event later and filter it
        }),
  			Qualifier: apiRequest.lambdaContext.functionVersion
  		}, (err, done) => {
        if (err) return reject(err);

        resolve();
      });
    })
      .then(() => {
        return '...'
      })
      .catch((e) => {
        return `Could not setup timer :(` + e.message
      });

}, { platforms: ['slackSlashCommand'] });


// this will be executed before the normal routing.
// we detect if the event has a flag set by line 21,
// and if so, avoid normal procesing, running a delayed response instead

api.intercept((event) => {
  if (!event.slackEvent) // if this is a normal web request, let it run
    return event;

  const message = event.slackEvent;

  return promiseDelay(1)
    .then(() => {
      return slackDelayedReply(message, getResponse(message))
    })
    .then(() => false); // prevent normal execution
});

module.exports = api;



const slackTemplate = botBuilder.slackTemplate;
var commands = require('./commands')
var callbacks = require('./callbacks')

const getResponse = function (request) {
  try {
    
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
      } else if (request.originalRequest.actions && request.originalRequest.actions[0] && callbacks[request.originalRequest.actions[0].block_id]) { 
        return callbacks[request.originalRequest.actions[0].block_id](request.originalRequest)
      } else {
        return 'Original message: \`\`\`\n' + JSON.stringify(request) + '\n\`\`\`'
      }
      break
      default:
      return 'Original message: \`\`\`\n' + JSON.stringify(request) + '\n\`\`\`'
    }
  } catch (e) {
    console.log(e)
    return e.message
  }
    
}
