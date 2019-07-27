FROM node:8-slim

LABEL "com.github.actions.name"="Deploy to Firebase"
LABEL "com.github.actions.description"="This action will handle the building and deploying process of the to firebase"
LABEL "com.github.actions.icon"="git-commit"
LABEL "com.github.actions.color"="orange"

LABEL "repository"="https://github.com/JaiselRahman/ShareNotes"
LABEL "maintainer"="Jaisel Rahman <jaiselrahman@gmail.com>"

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
