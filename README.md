Build the image:

```sh
PROJECT=$(basename `pwd`) && docker image build -t $PROJECT-image . --build-arg user_id=`id -u` --build-arg group_id=`id -g`
```

And run it:

```sh
docker container run \
  -it \
  --rm \
  --init \
  -p 5901:5901 \
  -p 6080:6080 \
  -e NODE_ENV=development \
  --mount type=bind,src=`pwd`,dst=/app \
  --name $PROJECT-container \
  $PROJECT-image /bin/zsh
```

The noVNC can be accessed at:

- http://localhost:6080/

Run the following commands inside the Docker containers:

```sh
node examples/redirectChain.mjs
npx vitest run
```

You can check if you have enough memory by running this command:

```console
% numfmt --to iec $(echo $(($(getconf _PHYS_PAGES) * $(getconf PAGE_SIZE))))
```
