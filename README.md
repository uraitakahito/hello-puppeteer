Please read the instructions in [Dockerfile](./Dockerfile) to start the Docker container.

## Running get-title example

Connect to a remote browser and get the page title:

```sh
node examples/get-title.mjs
```

With custom host and port:

```sh
node examples/get-title.mjs --host puppeteer --port 9222
```

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
