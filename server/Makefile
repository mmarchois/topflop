start:
	docker-compose -p topflop up -d
stop:
	docker-compose -p topflop stop
build:
	docker-compose -p topflop build
down:
	docker-compose -p topflop down
ps:
	docker-compose -p topflop ps
logs:
	docker-compose -p topflop logs -f api
init-database:
	docker-compose -p topflop run api npm run migration:migrate
