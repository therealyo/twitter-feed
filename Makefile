POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=database
database=postgres://$(POSTGRES_USER):$(POSTGRES_PASSWORD)@$(POSTGRES_HOST):$(POSTGRES_PORT)/$(POSTGRES_DB)?sslmode=disable

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

