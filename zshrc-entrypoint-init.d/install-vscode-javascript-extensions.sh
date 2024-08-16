#!/bin/bash
#
# Install Visual Studio Code JavaScript extensions
#
extensions=(
  # https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
  "dbaeumer.vscode-eslint"
  # https://marketplace.visualstudio.com/items?itemName=GitHub.copilot
  "GitHub.copilot"
  # https://marketplace.visualstudio.com/items?itemName=vitest.explorer
  "vitest.explorer"
)
for extension in ${extensions[@]}; do
  code --install-extension $extension
done
