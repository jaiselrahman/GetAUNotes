workflow "Build and deploy on push" {
  on = "push"
  resolves = [
    "Deploy",
  ]
}

action "Deploy" {
  uses = "./.github/actions/deploy"
  secrets = ["FIREBASE_TOKEN"]
}