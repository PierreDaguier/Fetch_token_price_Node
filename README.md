# FETCH ETH VALUE TOKEN SCRIPTS



Une fois lancé, ce programme incorpore chaque heure la valeur de la cryptomonnaie Ether en euros dans une base de données distante
MongoDb. Lorsque l'utilisateur interroge le serveur sur /, celui ci lui renverra les 24 dernières valeurs au format json.

## Vous trouverez ci-dessous une description des différents fichiers disponibles dans /src

* harvester.js récupère la valeur du token Ether via une API et utilise les fonctions de mongodbstuff.js pour l'inscrire dans la base de données.

* index.js démarre le serveur, il doit cibler pour le démarrage (cf package.json)

* mongodbstuff.js contient les fonctions d'interaction avec la database.

* config.json.example correspond aux différentes variables et username nécessaires à l'utilisation de la database et de l'exploitation de l'API dans harvester.js

## Ci-dessous la liste des variables/fonctions utiles

* dbtools : correspond aux fonctions et variables extraites depuis mongodbstuff en tant que module, réutilisées dans les autres programmes

* infos : correspond à l'objet extrait de config.json

* dbName : le nom de votre base de données

* insertvalues() : il s'agit de la fonction qui insert la valeur de la devise prélevée à date dans la db

* findvalues() : il s'agit de la fonction allant chercher les entrées dans la collection de la db pour les renvoyer vers l'utilisateur

## Pour installer ce programme : 

* git clone ce repository

* Une fois dans le répertoire créé : 
>yarn install

* Passez vos paramètres dans config.json.example et renommez le config.json

* fs, express, axios et mongodb sont nécessaires au fonctionnement de ce programme

## To Do

* Proposer une requête par ID, correspondant à différentes devises.

* Proposer un component ReactJS réagissant au .json proposé par app.get dans index.js










