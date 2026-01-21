COMPOSE = docker compose
DB_FILE = backend/data/database.sqlite
PROJECT_NAME = exercice2
NODE_MODULES_BACK = backend/node_modules
NODE_MODULES_FRONT = frontend/node_modules

.PHONY: all clean fclean re purge

all:
	$(COMPOSE) up -d --build

clean:
	$(COMPOSE) down

fclean: clean
	docker image prune -a -f

purge:
	powershell -Command "if (Test-Path '$(DB_FILE)') { Remove-Item -Force '$(DB_FILE)'; Write-Host 'Base de données supprimée.' } else { Write-Host 'Aucune base de données trouvée.' }"

re: fclean all