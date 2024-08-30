# Debian 12
FROM node:22.7.0-bookworm

ARG user_name=developer
ARG user_id
ARG group_id
ARG dotfiles_repository="https://github.com/uraitakahito/dotfiles.git"

# Avoid warnings by switching to noninteractive for the build process
ENV DEBIAN_FRONTEND=noninteractive

#
# Install packages
#
RUN apt-get update -qq && \
  apt-get install -y -qq --no-install-recommends \
    # Basic
    ca-certificates \
    git \
    iputils-ping \
    # Editor
    vim \
    # Utility
    tmux \
    # fzf needs PAGER(less or something)
    fzf \
    trash-cli && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
# https://zenn.dev/tom1111/articles/0dc7cde5c8e9bf
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      chromium \
      fonts-ipafont-gothic \
      fonts-wqy-zenhei \
      fonts-thai-tlwg \
      fonts-kacst \
      fonts-freefont-ttf \
      libxss1 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

RUN git config --system --add safe.directory /app

#
# Add user and install basic tools.
#
RUN cd /usr/src && \
  git clone --depth 1 https://github.com/uraitakahito/features.git && \
  USERNAME=${user_name} \
  USERUID=${user_id} \
  USERGID=${group_id} \
  CONFIGUREZSHASDEFAULTSHELL=true \
  UPGRADEPACKAGES=false \
    /usr/src/features/src/common-utils/install.sh

##############################
#  VNC support starts here   #
##############################
#
# desktop-lite
# installsAfter: common-utils
# https://github.com/uraitakahito/features/blob/0e14fce20c1008c837ac6b31b04297bd35108f9e/src/desktop-lite/devcontainer-feature.json#L58
#
RUN /usr/src/features/src/desktop-lite/install.sh
##############################
#  VNC support ends here     #
##############################

RUN usermod -aG audio ${user_name} && \
  usermod -aG video ${user_name}

#
# Firefox is version 115.14(2024/08/15)
#
# RUN apt-get update -qq && \
#   apt-get install -y -qq --no-install-recommends \
#     firefox-esr \
#     firefox-esr-l10n-ja \
#     fonts-noto-cjk \
#     fonts-ipafont-gothic \
#     fonts-ipafont-mincho && \
#   apt-get clean && \
#   rm -rf /var/lib/apt/lists/*

USER ${user_name}
WORKDIR /home/${user_name}

#
# dotfiles
#
RUN cd /home/${user_name} && \
  git clone --depth 1 ${dotfiles_repository} && \
  dotfiles/install.sh

##############################
#  VNC support starts here   #
##############################
#
# desktop-lite
# https://github.com/uraitakahito/features/blob/0e14fce20c1008c837ac6b31b04297bd35108f9e/src/desktop-lite/install.sh#L296-L417
#
ENV USERNAME ${user_name}
ENV VNC_PORT 5901
ENV NOVNC_PORT 6080
WORKDIR /app
ENTRYPOINT ["/usr/local/share/desktop-init.sh"]
CMD ["tail", "-F", "/dev/null"]
##############################
#  VNC support ends here     #
##############################
