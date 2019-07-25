workflow "Build and deploy on push" {
  on = "push"
  resolves = [
    "branch.filter",
  ]
}

action "branch.filter" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}
