dc_dev := docker-compose

yarn:
	cd api-backend && yarn
	cd front-end && yarn

# ------------------ Development only commads ------------------

# Start the local docker environment 
dev-up:
	$(dc_dev) up --force-recreate --remove-orphans;

# Clean everything related to local docker environment and restart it 
dev-restart:
	$(dc_dev) down -v
	$(MAKE) dev-up
