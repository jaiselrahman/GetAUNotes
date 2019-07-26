workflow "Build and deploy on push" {
  on = "push"
  resolves = [
    "Firebase deploy",
  ]
}

action "Install hosting dependencies" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "--prefix=public install"
}

action "Build hosting" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "--prefix=public run build --modern"
  needs = ["Install hosting dependencies"]
}

action "Firebase deploy" {
  uses = "w9jds/firebase-action@master"
  needs = ["Build hosting"]
  args = "deploy --only functions,hosting"
  secrets = ["FIREBASE_TOKEN"]
}
