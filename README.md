# django-channels-example


### Docker manual
`docker images` - list images
`docker pull [container-name]` - download image

`docker run [container-name]` - run container
`docker run -it [container-name]` - run container with opened tty (`-t`) and keep it opened (`-i`)
`docker run --rm [container-name]` - run container and delete it when his work ends
`docker run -d -P --name [container-custom-name] [container-actual-name]` - run container, set custom name (`--name`), detach it so it will continue his work (`-d`), open all public ports (`-P`)

`docker ps` - list of active containers
`docker ps -a` - list of all containers in system

`docker rm [container-id]` - remove container
`docker rm $(docker ps -a -q -f status=exited)` - remove all containers which have status `exited`. Flag `-q` return only ID's, flag `-f` filter output with geven parameters

`docker port [container-id]` - check available ports for container
`docker stop [container-id]` - stop container

`docker build -t [tagname] [directory-with-docker-file]` - build image with given tagname

`docker stop $(docker ps -a -q)` - stop all containers
`docker rm $(docker ps -a -q)` - remove all containers

`docker logs [container-id]` - retrieves logs present at the time of execution


### Build & run Docker container
```
cd .../directory-with-dockerfile
docker build -t [container-custom-name] .
docker run -d [container-custom-name]
docker ps
docker exec -it [container-id] /bin/bash
```


### Build & run docker-compose container
```
cd .../directory-with-docker-compose-file
docker-compose down
docker-compose build
docker-compose up -d
```


### Config backend project
In the `backend/api/api/` directory, create a `settings_local.py` file with the contents of the `settings_example.py` file and run django server.


### Config public project
1. Install depedencies:
```
npm install
bower install
```

2. Before running the application, it is necessary to create the configuration file `config_local.js` in the directory `public/src/config/`.

3. Run:
```
gulp
```
