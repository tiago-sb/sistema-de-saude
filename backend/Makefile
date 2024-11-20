include .env

$(eval export $(shell sed -ne 's/ *#.*$$//; /./ s/=.*$$// p' .env))

.PHONY: run-dev
run:
	@uvicorn app.main:app --reload

.PHONY: coverage
coverage:
	@py.test --cov=app --cov-report=term-missing --cov-report=xml --cov-fail-under=90 ./tests/

.PHONY: test
test:
	@py.test ./t
