var botBuilder = require('claudia-bot-builder')
const slackTemplate = botBuilder.slackTemplate
var callbacks = require('./callbacks')
var UserManager = require('./UserManager')

module.exports = {
  '/i227': (request) => {
    return callbacks.help(request);
  },

  '/skill': (request) => {
    return callbacks.create_new_claims(request)
  },

  '/claim': async (request) => {
    const message = new slackTemplate().get()
    const issuer = await UserManager.getUser('slack', `slack_${request.user_id}_${request.team_id}`)
    // example request.text === "<@UK33C7HGX|andrejussereika> skill PM"
    // naive regex:
    const found = request.text.match(/@\w+/g)
    const subject_slack_id = found[0].substring(1)

    const subject = await UserManager.getUser('slack', `slack_${subject_slack_id}_${request.team_id}`)

    // naive type and value
    const words = request.text.split(' ')

    const vc = {
      sub: subject.data.dids[0].did,
      claim: {
      }
    }

    vc.claim[words[1]] = words[2]

    const signedVc = await issuer.signVc(vc)
    message.text = "Signed VC: " + signedVc.jwt
    return message
  },

  '/listclaims': async (request) => {
    const message = new slackTemplate().get()
    // naive regex:
    const found = request.text.match(/@\w+/g)
    const subject_slack_id = found[0].substring(1)

    const subject = await UserManager.getUser('slack', `slack_${subject_slack_id}_${request.team_id}`)

    const claims = await subject.getAllClaims()

    message.text = `Verifiable claims for <@${subject_slack_id}>:`
    claims.forEach(item => {
      message.text += '\n' + JSON.stringify(item.claim) + '\n' + item.jwt
    })

    return message
  },

}