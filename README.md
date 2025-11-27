Please read the instructions in [Dockerfile](./Dockerfile) to start the Docker container.

The noVNC can be accessed at:

- http://localhost:6080/

Run the following commands inside the Docker containers:

```sh
node examples/get-title.mjs
```

You can check if you have enough memory by running this command:

```console
% numfmt --to iec $(echo $(($(getconf _PHYS_PAGES) * $(getconf PAGE_SIZE))))
```
