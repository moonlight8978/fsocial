.PHONY: prepare env

.DEFAULT_GOAL := prepare

prepare:
	cp deploy/staging/Dockerfile.proxy proxy/Dockerfile
	cp deploy/staging/fsocial.conf proxy/fsocial.conf
	cp deploy/staging/Dockerfile.server server/Dockerfile
	cp deploy/staging/Dockerfile.web web/Dockerfile
	cp deploy/staging/docker-* ./
	cp deploy/staging/puma.rb server/config/puma.rb
	cp deploy/staging/web.conf web/web.conf

env:
	cp .env.staging .env

build-local:
	cp .env.staging web/.env
	cd web && rm -rf build
	cd web && yarn install
	cd web && yarn build
	docker-compose build
	docker-compose push

deploy-compose:
	git pull origin master
	docker-compose pull
	docker-compose down
	docker-compose up -d

deploy-swarm:
	git pull origin master
	docker-compose pull
	docker stack deploy --compose-file=docker-stack.yml fsocial
