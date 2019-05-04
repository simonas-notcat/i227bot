var botBuilder = require('claudia-bot-builder')
const slackTemplate = botBuilder.slackTemplate;

module.exports = {
  'profile': (request) => {
    const message = new slackTemplate().get();
    
    message.blocks = [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Here is your profile summary from all available sources."
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Skill *Developer*"
        }
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "image",
            "image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_1.png",
            "alt_text": "Michael Scott"
          },
          {
            "type": "image",
            "image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
            "alt_text": "Dwight Schrute"
          },
          {
            "type": "image",
            "image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_3.png",
            "alt_text": "Pam Beasely"
          },
          {
            "type": "plain_text",
            "emoji": true,
            "text": "3 signers"
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Skill *UX Designer*"
        }
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "image",
            "image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_1.png",
            "alt_text": "Michael Scott"
          },
          {
            "type": "image",
            "image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
            "alt_text": "Dwight Schrute"
          },
          {
            "type": "plain_text",
            "emoji": true,
            "text": "2 signers"
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "emoji": true,
              "text": "Create skill claim"
            },
            "style": "primary",
            "value": "click_me_123"
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "emoji": true,
              "text": "Share my claims"
            },
            "value": "click_me_123"
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "emoji": true,
              "text": "Find users by claims"
            },
            "value": "click_me_123"
          }
        ]
      }
    ]
    return message
  },
  'summary': (request) => {

    const message = new slackTemplate();
    const result = message.get()
    result['blocks'] = [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Danny Torrence left the following review for your property:"
        }
      },
      {
        "type": "section",
        "block_id": "section567",
        "text": {
          "type": "mrkdwn",
          "text": "<https://example.com|Overlook Hotel> \n :star: \n Doors had too many axe holes, guest in room 237 was far too rowdy, whole place felt stuck in the 1920s."
        },
        "accessory": {
          "type": "image",
          "image_url": "https://is5-ssl.mzstatic.com/image/thumb/Purple3/v4/d3/72/5c/d3725c8f-c642-5d69-1904-aa36e4297885/source/256x256bb.jpg",
          "alt_text": "Haunted hotel image"
        }
      },
      {
        "type": "section",
        "block_id": "section789",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*Average Rating*\n1.0"
          }
        ]
      }
    ]
    return result
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