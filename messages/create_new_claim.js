const blocks = [
	{
		"type": "section",
		"text": {
			"type": "plain_text",
			"text": "Create new skill claim",
			"emoji": true
		}
	},
	{
		"type": "actions",
		"elements": [
			{
				"type": "users_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select a user",
					"emoji": true
				}
			},
			{
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select skill",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Developer",
							"emoji": true
						},
						"value": "value-0"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "UX Designer",
							"emoji": true
						},
						"value": "value-1"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Product manager",
							"emoji": true
						},
						"value": "value-2"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Custom ...",
							"emoji": true
						},
						"value": "value-2"
					}
				]
			}
		]
	},
	{
		"type": "actions",
		"elements": [
			{
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Create",
					"emoji": true
				},
                "style": "primary",
				"value": "click_me_123"
			}
		]
	}    
]

module.exports = {
  blocks
}