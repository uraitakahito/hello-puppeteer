# Debian 12
FROM node:22.6.0-bookworm

ARG user_name=developer
ARG user_id
ARG group_id
ARG dotfiles_repository="https://github.com/uraitakahito/dotfiles.git"

#
# Install packages
#
RUN apt-get update -qq && \
  DEBIAN_FRONTEND=noninteractive apt-get install -y -qq --no-install-recommends \
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

#
# eza
# https://github.com/eza-community/eza/blob/main/INSTALL.md
#
RUN apt-get update -qq && \
  DEBIAN_FRONTEND=noninteractive apt-get install -y -qq --no-install-recommends \
    gpg \
    wget && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  mkdir -p /etc/apt/keyrings && \
  wget -qO- https://raw.githubusercontent.com/eza-community/eza/main/deb.asc | gpg --dearmor -o /etc/apt/keyrings/gierens.gpg && \
  echo "deb [signed-by=/etc/apt/keyrings/gierens.gpg] http://deb.gierens.de stable main" | tee /etc/apt/sources.list.d/gierens.list && \
  chmod 644 /etc/apt/keyrings/gierens.gpg /etc/apt/sources.list.d/gierens.list && \
  apt update && \
  apt install -y eza && \
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

COPY docker-entrypoint.sh /usr/local/bin/
COPY zshrc-entrypoint-init.d /etc/zshrc-entrypoint-init.d

#
# Add user and install basic tools.
#
RUN cd /usr/src && \
  git clone --depth 1 https://github.com/uraitakahito/features.git && \
  USERNAME=${user_name} \
  USERUID=${user_id} \
  USERGID=${group_id} \
  CONFIGUREZSHASDEFAULTSHELL=true \
    /usr/src/features/src/common-utils/install.sh

#
# desktop-lite
# installsAfter: common-utils
# https://github.com/uraitakahito/features/blob/0e14fce20c1008c837ac6b31b04297bd35108f9e/src/desktop-lite/devcontainer-feature.json#L58
#
RUN /usr/src/features/src/desktop-lite/install.sh

RUN usermod -aG audio ${user_name} && \
  usermod -aG video ${user_name}

USER ${user_name}
WORKDIR /home/${user_name}

#
# dotfiles
#
RUN cd /home/${user_name} && \
  git clone --depth 1 ${dotfiles_repository} && \
  dotfiles/install.sh

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
