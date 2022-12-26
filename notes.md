# Docker with node

## Docker CLI

1. Building Docker image

```sh
docker build -t [ImageName] .
```

2. Listing the images

```sh
docker image ls
```

3. Deleting image

```sh
docker image rm [IMAGE_ID]
```

4. Running the docker image

```sh
docker run -d --name [ContainerName]  [ImageName] #:ro readonly mode
```

5. Listing the running containers

```sh
docker ps
```

6. Logging to the docker container

```sh
docker exec -it [ContainerName] bash
```

7. Deleting volumes

```sh
docker volume prune
```

8. Creating docker-compose file

```yml
version: "3"
services:
  node-app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - ./.env
    volumes:
      - ./:/app
      - /app/node_modules
```
