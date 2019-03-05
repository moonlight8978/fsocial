.PHONY: prepare build up autoinit ci

.DEFAULT_GOAL := prepare

prepare:
	cp deploy/dev/Dockerfile.proxy proxy/Dockerfile
	cp deploy/dev/fsocial.conf proxy/fsocial.conf
	cp deploy/dev/Dockerfile.server server/Dockerfile
	cp deploy/dev/Dockerfile.web web/Dockerfile
	cp deploy/dev/Dockerfile.utils-yml utils/yml/Dockerfile
	cp deploy/dev/docker-compose.yml docker-compose.yml
	cp deploy/dev/puma.rb server/config/puma.rb
	cp .env.dev .env

postbuild:
	docker-compose run --rm web yarn
	docker-compose run --rm utils-yml yarn
	docker-compose run --rm server yarn

build:
	docker-compose build

up:
	docker-compose up -d

autoinit: prepare build postbuild up

ci:
	docker-compose run --rm web yarn testci
	docker-compose run --rm web yarn eslint
	docker-compose run --rm web yarn stylelint
	docker-compose run --rm server rubocop
	docker-compose run --rm server rake spec
