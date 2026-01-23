# Description
Shop.ma est une application e-commerce permettant la vente en ligne de produits artisanaux et traditionnels marocains.
## Public cible :
- Jeunes Marocains (18-35 ans)
- Touristes visitant le Maroc
- Passionnés d’artisanat
## Valeur ajoutée :
- Interface moderne pour produits traditionnels
- Plateforme accessible et intuitive
- Promotion de l’artisanat marocain
## Structure du projet

```text
shop-ma/
├── api
│   ├── app
│   ├── artisan
│   ├── bootstrap
│   ├── composer.json
│   ├── composer.lock
│   ├── config
│   ├── database
│   ├── phpunit.xml
│   ├── public
│   │   ├──images/
│   ├── routes
│   └── tests
└── web
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── features/
│   │   ├── data/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.css
├── README.md
```

# Technologies
- React
- Vite
- React Router
- Redux Toolkit
- Axios
- Tailwindcss
# Installation
```bash
git clone git@github.com:mbarek-hani/shop-ma-mbarek-hani.git
```
## frontend
```bash
cd shop-ma-mbarek-hani/web
npm install
```
## backend
```bash
cd shop-ma-mbarek-hani/api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
```
# Running
## frontend
```bash
cd shop-ma-mbarek-hani/web
npm run dev
```
## backend
```bash
cd shop-ma-mbarek-hani/api
php artisan serve
```
# Fonctionnalités
- Affichage catalogue produits (minimum 20 produits)
- Recherche par nom de produit
- Filtres : catégorie, prix min/max, stock
- Tri : prix croissant/décroissant, nom A-Z
- Ajout/suppression produits panier
- Modification quantités panier
- Calcul total TTC
- Formulaire contact avec validation (email, champs requis)
- Navigation multi-pages (React Router)
- Design responsive (mobile-first)
# Auteur
M'barek hani
