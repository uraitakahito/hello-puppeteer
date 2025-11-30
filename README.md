## Setup

### Launching Chromium

Run Chromium in a separate container with a GUI environment.
Refer to [this](https://github.com/uraitakahito/puppeteer-novnc-docker) repository.

### Launching the development Docker container

Please download the required files by following these steps:

```
curl -L -O https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/heads/main/Dockerfile
curl -L -O https://raw.githubusercontent.com/uraitakahito/hello-javascript/refs/heads/main/docker-entrypoint.sh
chmod 755 docker-entrypoint.sh
```

Detailed environment setup instructions are described at the beginning of the `Dockerfile`.

**Important: Only the container start command differs from what’s written in the Dockerfile. Please use the following command.**

```sh
#
# Build the Docker image:
#
PROJECT=$(basename `pwd`) && docker image build -t $PROJECT-image . --build-arg user_id=`id -u` --build-arg group_id=`id -g` --build-arg TZ=Asia/Tokyo
#
# Create a volume to persist the command history executed inside the Docker container.
# It is stored in the volume because the dotfiles configuration redirects the shell history there.
#   https://github.com/uraitakahito/dotfiles/blob/b80664a2735b0442ead639a9d38cdbe040b81ab0/zsh/myzshrc#L298-L305
#
docker volume create $PROJECT-zsh-history
#
# Start the Docker container:
#
docker container run --add-host=puppeteer:host-gateway -d --rm --init -v $SSH_AUTH_SOCK:/ssh-agent -e SSH_AUTH_SOCK=/ssh-agent --mount type=bind,src=`pwd`,dst=/app --mount type=volume,source=$PROJECT-zsh-history,target=/zsh-volume --name $PROJECT-container $PROJECT-image
```

## Running get-title example

With custom host and port:

```sh
node examples/get-title.mjs --host puppeteer --port 9222
```

Ensure that the value passed to `--host` matches the value specified for `--add-host` in the `docker container run` command.

### Accessing Chrome DevTools Protocol

When accessing the DevTools endpoint from inside a Docker container using a hostname (e.g., `puppeteer`), you must override the `Host` header. This is required because Chrome v66+ validates the `Host` header and only accepts IP addresses or `localhost` to prevent DNS Rebinding attacks.

```sh
# Using hostname with Host header override
curl -H "Host: localhost" http://puppeteer:9222/json/version

# Or using IP address directly
curl http://192.168.65.254:9222/json/version
```

Without the header override, you will receive an error:

```
Host header is specified and is not an IP address or localhost.
```

References:
- [Chrome remote debugging expects host header - Puppeteer Issue #2242](https://github.com/puppeteer/puppeteer/issues/2242)
- [chrome-remote-interface Issue #340](https://github.com/cyrus-and/chrome-remote-interface/issues/340)

### Troubleshooting

You can check if you have enough memory by running this command:

```console
% numfmt --to iec $(echo $(($(getconf _PHYS_PAGES) * $(getconf PAGE_SIZE))))
```
