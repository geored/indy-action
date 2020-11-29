const core = require('@actions/core')
const github = require('@actions/github')
const axios = require('axios')
const gchats = core.getInput('gchat-webhooks')

console.log(`Sending notification msg to  endpoints: ${gchats}`)


// Example Workflow for releases and PR's:

// name: Release|PR
// on:
//   release:
//     types: [created]
//   pull_request:
//     types: [opened, reopened]
// jobs:
//   chat:
//     runs-on: ubuntu-latest
//     steps:
//       - uses: delivery-much/actions-chat@v1
//         with:
//           url: ${{ secrets.WEBHOOK_URLS }}

// Explanation: WEBHOOK_URLS = whitespace seperated list of webhook urls

(async function run() {

    //  sending post request to all provided endpoints...
    const allChats = gchats.split(' ');

    for (chat in allChats) {
      // create  new  message ...
      switch (github.context.eventName) {
        case 'pull_request': {
          const { repo } = github.context.repo
          const title = github.context.payload.pull_request.title
          const author = github.context.actor
          const htmlUrl = github.context.payload.pull_request.html_url

          const body = newPullRequest(repo, title, author, htmlUrl)


          // async send http post  request...
          await sendMessageToChat(body,chat);

          break
        }
        case 'release': {
          const { repo } = github.context.repo
          const tag = github.context.payload.release.tag_name
          const author = github.context.actor
          const htmlUrl = github.context.payload.release.html_url

          const body = newRelease(repo, tag, author, htmlUrl)


          // async send http post  request...
          await sendMessageToChat(body,chat);

          break
        }
        default:
          throw new Error('Sorry, we don\'t accept this event type yet.')
      }

    }

})();


const sendMessageToChat = (body,webhook) => {
  return axios({
    url: webhook,
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    data: body
  });
};

const newPullRequest = (repo, title, author, htmlUrl) => {
  const body = {
    cards: [
      {
        header: {
          title: 'New pull request',
          imageUrl: 'https://vectorified.com/images/git-icon-4.png'
        },
        sections: [
          {
            widgets: [
              {
                keyValue: {
                  topLabel: 'Repository',
                  content: repo
                }
              },
              {
                keyValue: {
                  topLabel: 'Title',
                  content: title
                }
              },
              {
                keyValue: {
                  topLabel: 'Author',
                  content: author
                }
              }
            ]
          },
          {
            widgets: [
              {
                buttons: [
                  {
                    textButton: {
                      text: 'OPEN',
                      onClick: {
                        openLink: {
                          url: htmlUrl
                        }
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  return body
}

const newRelease = (repo, tag, author, htmlUrl) => {
  const body = {
    cards: [
      {
        header: {
          title: 'New release',
          imageUrl: 'https://theentropic.gallerycdn.vsassets.io/extensions/theentropic/git-tag-loader/1.0.0/1563851448848/Microsoft.VisualStudio.Services.Icons.Default'
        },
        sections: [
          {
            widgets: [
              {
                keyValue: {
                  topLabel: 'Repository',
                  content: repo
                }
              },
              {
                keyValue: {
                  topLabel: 'Tag',
                  content: tag
                }
              },
              {
                keyValue: {
                  topLabel: 'Author',
                  content: author
                }
              }
            ]
          },
          {
            widgets: [
              {
                buttons: [
                  {
                    textButton: {
                      text: 'OPEN',
                      onClick: {
                        openLink: {
                          url: htmlUrl
                        }
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  return body
}


