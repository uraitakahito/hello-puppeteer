Please read the instructions in [Dockerfile](./Dockerfile) to start the Docker container.

## Running in headless mode

```sh
node examples/get-title.mjs
```

## Running in headful mode

### Running after logging into noVNC

The noVNC can be accessed at:

- http://localhost:6080/

Run the following commands inside the Docker containers:

```sh
node examples/get-title.mjs --no-headless --slow-mo 250
```

### Running from the terminal

Set the `DISPLAY` environment variable to use the VNC server:

```sh
DISPLAY=:1 node examples/get-title.mjs --no-headless --slow-mo 250
```

You can watch the browser in action via noVNC at http://localhost:6080/

### Using xvfb

Use `xvfb-run` to run headful mode without a display (useful for CI/CD):

```sh
xvfb-run --auto-servernum npx node examples/get-title.mjs --no-headless --slow-mo 250
```

### Troubleshooting

You can check if you have enough memory by running this command:

```console
% numfmt --to iec $(echo $(($(getconf _PHYS_PAGES) * $(getconf PAGE_SIZE))))
```
