COMPOSE = docker compose
PROJECT_NAME = exercice3
NODE_MODULES_BACK = backend/node_modules
NODE_MODULES_FRONT = frontend/node_modules

.PHONY: all clean fclean re

all:
	$(COMPOSE) up -d --build

clean:
	$(COMPOSE) down

fclean: clean
	docker image prune -a -f

re: fclean all
