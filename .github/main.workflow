workflow "Build and deploy on push" {
  on = "push"
  resolves = [
    "Build hosting",
  ]
}

action "Deploy branch filter" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Install hosting dependencies" {
  uses = "actions/npm@master"
  args = "--prefix=public install"
  needs = ["Deploy branch filter"]
}

action "Build hosting" {
  uses = "actions/npm@master"
  args = "--prefix=public run build --modern"
  needs = [
    "Install hosting dependencies"
  ]
}
