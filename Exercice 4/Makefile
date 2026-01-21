COMPOSE = docker compose
PROJECT_NAME = exercice4

NODE_MODULES_BACK = backend/node_modules
NODE_MODULES_FRONT = frontend/node_modules

VOL_NAME = exercice4_postgres_data

.PHONY: all clean fclean re purge_bdd purge_all

all:
	$(COMPOSE) up -d --build

clean:
	$(COMPOSE) down

fclean: clean
	docker image prune -a -f

re: fclean all

purge_bdd: clean
	docker volume rm $(VOL_NAME) || echo "Volume déjà supprimé ou introuvable"

purge_all: fclean
	docker volume rm $(VOL_NAME) || true
	
	powershell -Command "if (Test-Path 'backend/node_modules') { Remove-Item -Recurse -Force 'backend/node_modules' }"
	powershell -Command "if (Test-Path 'frontend/node_modules') { Remove-Item -Recurse -Force 'frontend/node_modules' }"
	
	$(MAKE) all