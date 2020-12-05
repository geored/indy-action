# GChat Action   
( For sending release msg's to gchat  for indy releases )

Create your workflow:

```
name:    #[ Name  of  workflow ]

on:
   release:
     types: [created]
   pull_request:
     types: [opened, reopened]

jobs:
  gchat:
     runs-on: ubuntu-latest
     steps:
       - uses: geored/indy-action@v5
         with:
           gchat-webhooks: ${{ secrets.WEBHOOK_URLS }}  # gchat room webhook
```



