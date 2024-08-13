#!/bin/sh

# https://zenn.dev/yusukeiwaki/scraps/00fd022cb857e0
# Before calling this script, execute profile.mjs to create my_prefs.

firefox \
  --remote-debugging-port=0 \
  --profile ./my_prefs \
  --no-remote \
  --foreground \
  about:blank
