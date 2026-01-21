# Variables
COMPOSE = docker compose

.PHONY: all clean fclean re logs

# Lancer tout
all:
	$(COMPOSE) up -d --build

# Arrêter tout
clean:
	$(COMPOSE) down

# Tout supprimer (images incluses)
fclean: clean
	docker image prune -a -f

# Redémarrer à zéro
re: fclean all

# Voir les logs (utile pour voir si Tor démarre bien)
logs:
	$(COMPOSE) logs -f