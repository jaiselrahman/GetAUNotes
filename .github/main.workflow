workflow "Build and deploy on push" {
  on = "push"
  resolves = [
    "Firebase deploy",
  ]
}

action "Deploy branch filter" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Install hosting dependencies" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "--prefix=public install"
  needs = ["Deploy branch filter"]
}

action "Build hosting" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "--prefix=public run build --modern"
  needs = [
    "Install hosting dependencies",
  ]
}

action "Install functions dependencies" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "--prefix=functions install"
  needs = ["Deploy branch filter"]
}

action "Firebase deploy" {
  uses = "w9jds/firebase-action@master"
  needs = ["Build hosting", "Install functions dependencies"]
  args = "deploy --only functions,hosting"
  secrets = ["FIREBASE_TOKEN"]
}
