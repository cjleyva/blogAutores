# INSTRUCCIONES COMPLETAS DE INSTALACIÓN - BlogAutores

## Requisitos previos

Antes de empezar, asegúrate de tener instalado:

- PHP 8.2 o superior
- Composer
- Node.js 18 o superior
- MySQL 5.7 o superior
- Git

## Instalación paso a paso

Paso 1: Clonar el repositorio

git clone https://github.com/cjleyva/blogAutores.git
cd blogAutores

Paso 2: Instalar dependencias de PHP

composer install

Paso 3: Instalar dependencias de Node.js

npm install

Paso 4: Crear archivo de configuración

cp .env.example .env

Paso 5: Generar clave de la aplicación

php artisan key:generate

Paso 6: Configurar la base de datos

Abre el archivo .env y modifica estas líneas:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=blogautores
DB_USERNAME=root
DB_PASSWORD=secret

Paso 7: Crear la base de datos

mysql -u root -p -e "CREATE DATABASE blogautores"

Si tu contraseña es secret:
mysql -u root -psecret -e "CREATE DATABASE blogautores"

Si no tienes contraseña:
mysql -u root -e "CREATE DATABASE blogautores"

Paso 8: Ejecutar migraciones y seeders

php artisan migrate --seed

Paso 9: Compilar assets

npm run dev

Paso 10: Iniciar el servidor

php artisan serve

Paso 11: Abrir la aplicación

Vista pública: http://localhost:8000
Panel administrativo: http://localhost:8000/admin

## Comandos útiles

Iniciar servidor de desarrollo:
php artisan serve

Compilar assets (modo desarrollo):
npm run dev

Compilar assets (modo producción):
npm run build

Ejecutar migraciones:
php artisan migrate

Ejecutar seeders:
php artisan db:seed

Resetear base de datos:
php artisan migrate:fresh --seed

Limpiar toda la caché:
php artisan optimize:clear

Ver todas las rutas registradas:
php artisan route:list

## Posibles errores y soluciones

Error: Vite manifest not found
Solución: npm run build

Error: Connection refused
Solución: Verificar MySQL y ejecutar php artisan config:clear

Error: Class not found
Solución: composer dump-autoload

Error: Port 8000 already in use
Solución: php artisan serve --port=8001

Error: Access denied for user
Solución: Revisar DB_PASSWORD en el archivo .env

## Cómo usar la aplicación

Panel administrativo (http://localhost:8000/admin):

- Crear autor: Escribir nombre y apellidos → click en "Agregar"
- Crear post: Completar título, contenido, imagen → seleccionar autor → "Publicar"
- Editar post: Click en "Editar" → modificar título → confirmar
- Eliminar post: Click en "Eliminar" → confirmar

Vista pública (http://localhost:8000):

- Ver todos los posts en formato grilla
- Click en "Leer más" para ver el detalle completo

## Tecnologías utilizadas

- Laravel 12
- Vue 3
- Inertia.js
- MySQL
- FontAwesome

## Autor

Desarrollado po Carlos Leyva
