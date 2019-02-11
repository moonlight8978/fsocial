.PHONY: prepare env

.DEFAULT_GOAL := prepare

prepare:
	cp deploy/staging/Dockerfile.proxy proxy/Dockerfile
	cp deploy/staging/fsocial.conf proxy/fsocial.conf
	cp deploy/staging/Dockerfile.server server/Dockerfile
	cp deploy/staging/Dockerfile.web web/Dockerfile
	cp deploy/staging/docker-compose.yml docker-compose.yml
	cp deploy/staging/puma.rb server/config/puma.rb
	cp deploy/staging/web.conf web/web.conf

env:
	cp .env.staging .env
