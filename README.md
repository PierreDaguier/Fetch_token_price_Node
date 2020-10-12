Une fois lancé, ce programme incorpore chaque heure la valeur de la cryptomonnaie Ether en euros dans une base de données distante
MongoDb. Lorsque l'utilisateur interroge le serveur sur /, celui ci lui renverra les 24 dernières valeurs au format json.



harvester.js récupère la valeur du token Ether via une API et utilise les fonctions de mongodbstuff.js pour l'inscrire dans la base de données.

index.js démarre le serveur

mongodbstuff.js contient les fonctions d'interaction avec la database.

config.json.example correspond aux différentes variables et username nécessaires à l'utilisation de la database et de l'exploitation de l'API dans harvester.js





