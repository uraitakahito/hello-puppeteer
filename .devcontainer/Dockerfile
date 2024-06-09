# Debian 12.5
FROM node:22.2.0-bookworm

ARG user_id=501
ARG group_id=20
ARG user_name=developer
# The WORKDIR instruction can resolve environment variables previously set using ENV.
# You can only use environment variables explicitly set in the Dockerfile.
# https://docs.docker.com/engine/reference/builder/#/workdir
ARG home=/home/${user_name}

RUN apt-get update -qq && \
  apt-get upgrade -y -qq && \
  DEBIAN_FRONTEND=noninteractive apt-get install -y -qq --no-install-recommends \
    ca-certificates \
    git

#
# Add user.
#
#   Someone uses devcontainer, but the others don't.
#   That is why dockerfile calls `features` MANUALLY here without devcontainer.json.
#
RUN cd /usr/src && \
  git clone --depth 1 https://github.com/devcontainers/features.git && \
  USERNAME=${user_name} \
  UID=${user_id} \
  GID=${group_id} \
  CONFIGUREZSHASDEFAULTSHELL=true \
    /usr/src/features/src/common-utils/install.sh

#
# Install packages
#
RUN apt-get update -qq && \
  apt-get upgrade -y -qq && \
  DEBIAN_FRONTEND=noninteractive apt-get install -y -qq --no-install-recommends \
    # Basic
    iputils-ping \
    # Editor
    vim emacs \
    # Utility
    tmux \
    # fzf needs PAGER(less or something)
    fzf \
    exa \
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

RUN usermod -aG audio ${user_name} && \
  usermod -aG video ${user_name}

COPY bin/docker-entrypoint.sh /usr/local/bin/
COPY zshrc-entrypoint-init.d /etc/zshrc-entrypoint-init.d

USER ${user_name}
WORKDIR /home/${user_name}

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["tail", "-F", "/dev/null"]
