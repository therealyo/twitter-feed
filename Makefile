# -----------------------------------------------Docker compose commands------------------------------------------------
.PHONY: run
run:
	docker-compose up -d

.PHONY: restart
restart:
	docker-compose up --build -d

.PHONY: restart-app
restart-app:
	docker-compose up -d --no-deps --build app

.PHONY: stop
stop:
	docker-compose down

# --------------------------------------------------Migration commands--------------------------------------------------
.PHONY: migration
migration:
	npm run migrate

