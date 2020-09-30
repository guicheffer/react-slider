PKG:=yarn

# This is authority from @guicheffer | guicheffer.me

help:
	@echo
	@echo "✍🏽  Please use 'make <target>' where <target> is one of the commands below:"
	@echo
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e "s/\\$$//" | sed -e "s/##//"
	@echo

# ------------------------------------------------------------------------------------ #

install: ## install stuff
	$(PKG) install

start: ## start development
	make install
	$(PKG) start

deploy: ## build development
	$(PKG) build

eject: ## eject development in one file
	$(PKG) eject

i: install
dev: start
build: deploy

test: test-stuff
test-stuff: ## test stuff
	$(PKG) test
