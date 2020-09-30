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

i: install
dev: start

test: test-stuff
test-stuff: ## test stuff
	$(PKG) test
