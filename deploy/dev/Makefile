.PHONY: prepare build up autoinit

.DEFAULT_GOAL := prepare

prepare:
	cp deploy/dev/Dockerfile.proxy proxy/Dockerfile
	cp deploy/dev/fsocial.conf proxy/fsocial.conf
	cp deploy/dev/Dockerfile.server server/Dockerfile
	cp deploy/dev/Dockerfile.web web/Dockerfile
	cp deploy/dev/docker-compose.yml docker-compose.yml
	cp .env.dev .env

build:
	docker-compose build
	docker-compose run --rm web yarn

up:
	docker-compose up -d

autoinit: prepare build up
