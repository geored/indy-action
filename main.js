const core = require('@actions/core')

const gchats = core.getInput('gchat-webhooks')

console.log(`Sending notification msg to  endpoints: ${gchats}`)

  (async function run() {

    //  sending post request to all provided endpoints...
    const allChats = gchats.split('\s');

    for (chat in allChats) {
      // create  new  message ...

      // async send http post  request...
    }

  })()


function createMessage(user, count, update) {
  return {
    "actionResponse": { "type": update ? "UPDATE_MESSAGE" : "NEW_MESSAGE" },
    "cards": [{
      "header": { "title": `Last change/release by ${user}!` },
      "sections": [{
          "image": { "imageUrl": IMAGES[count % IMAGES.length] }
        }, {
          "buttons": [{
            "textButton": {
              "text": "CHANGE/RELEASE",
              "onClick": {
                "action": {
                  "actionMethodName": "change/release",
                  "parameters": [
                    {
                      "key": "count",
                      "value": `${count}`
                    }
                  ]
                }
              }
            }
          }, {
            "textButton": {
              "text": "NEW CHANGE/RELEASE",
              "onClick": {
                "action": {
                  "actionMethodName": "newchange/newrelease"
                }
              }
            }
          }]
        }]
      }]
    }]
  };
}


