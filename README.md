# fsocial

[![Build Status](https://travis-ci.com/moonlight8978/fsocial.svg?branch=master)](https://travis-ci.com/moonlight8978/fsocial) [![CircleCI](https://circleci.com/gh/moonlight8978/fsocial.svg?style=svg)](https://circleci.com/gh/moonlight8978/fsocial) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Simple social network webapp for HUST's final project => final-social => fsocial
For research purpose

### Environment

#### OS

```
$ hostnamectl
# Ubuntu 18.04.2 LTS
```

#### Docker

```bash
$ docker -v
# Docker version 18.09.4, build d14af54266

$ docker-compose -v
# docker-compose version 1.24.0, build 0aa59064
```

### Technology

#### Backend

- Rails 5.2.3 (Rails API)

#### Frontend

- React 16.8.3 (with ContextAPI)

### Setup

#### Development

```bash
$ cp deploy/dev/Makefile .
$ make prepare
$ make env
$ docker-compose build
```

#### Staging

```bash
$ cp deploy/staging/Makefile .
$ make prepare
$ make env
$ docker-compose pull
$ docker-compose up -d && docker-compose down
$ docker swarm init
$ docker swarm deploy --compose-file=docker-stack.yml fsocial
```

#### Regenerate master key

```bash
$ rm server/config/credentials.yml.enc
$ docker-compose --rm -e EDITOR=vim server rails credentials:edit
```

#### Master data

```bash
$ docker-compose run --rm server rake db:reset data:counter
```
