FROM php:8.2-cli

# 1. Installation des dépendances système et NodeJS
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    zip \
    unzip \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 2. Installation des extensions PHP (Notamment PostgreSQL)
RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# 3. Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. Configuration du dossier de travail
WORKDIR /app

# 5. Copie du code source complet
COPY . .

# 6. Installation des dépendances PHP (Sans les packages de développement)
RUN composer install --optimize-autoloader --no-dev

# 7. Installation des dépendances Frontend (React) et Compilation
RUN npm install
RUN npm run build

# 8. Permissions nécessaires pour Laravel
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache

# 9. Exposition du port de l'application
EXPOSE 8000

# 10. Lancement de l'application
CMD php artisan serve --host=0.0.0.0 --port=8000
