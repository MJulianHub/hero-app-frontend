# Heroes App

> **Nota**: Este proyecto fue desarrollado como ejercicio práctico en el marco de un curso de formación.

Aplicación web para gestionar un universo de superhéroes y villanos. Permite visualizar, buscar, filtrar y administrar personajes del universo heroico.

## Funcionalidades

- **Exploración de personajes**: Lista paginada de héroes y villanos con imágenes y datos relevantes
- **Sistema de favoritos**: Marca personajes como favoritos para acceso rápido
- **Búsqueda**: Busca personajes por nombre
- **Filtros por categoría**: Filtra entre todos, héroes o villanos
- **Panel de administración**: Gestión completa de personajes (CRUD)
- **Dashboard estadístico**: Vista de estadísticas del universo de personajes

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Estilos**: Tailwind CSS + shadcn/ui
- **Gestión de estado**: TanStack Query (React Query)
- **Routing**: React Router v7
- **Backend**: NestJS (ver repositorio separado)

## Requisitos Previos

- Node.js 18+
- npm o yarn
- Git

## Pasos para Levantar el Desarrollo

### 1. Clonar el Repositorio del Frontend

```bash
git clone <url-del-repositorio-frontend>
cd heroes-app
```

### 2. Clonar y Configurar el Backend

El backend es un proyecto NestJS separado que debe estar corriendo para el funcionamiento de la aplicación.

```bash
# Ir al directorio padre
cd ..

# Clonar el repositorio del backend
git clone <url-del-repositorio-backend>
cd 06-nest-heroes-backend-main
```

Seguir las instrucciones del README del backend para:
- Instalar dependencias (`npm install`)
- Configurar variables de entorno
- Levantar el servidor (`npm run start:dev`)

### 3. Configurar el Frontend

Volver al directorio del frontend:

```bash
cd ../heroes-app
```

Copiar el archivo de configuración de entorno:

```bash
cp .env.template .env
```

Editar el archivo `.env` si es necesario (por defecto apunta a `http://localhost:3000`):

```
VITE_API_URL=http://localhost:3000
```

### 4. Instalar Dependencias

```bash
npm install
```

### 5. Levantar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Scripts Disponibles

| Comando           | Descripción                        |
|-------------------|-------------------------------------|
| `npm run dev`     | Inicia el servidor de desarrollo    |
| `npm run build`   | Genera la build de producción       |
| `npm run preview`| Previsualiza la build de producción |
| `npm run lint`    | Ejecuta el linter                   |

## Rutas de la Aplicación

| Ruta        | Descripción                     |
|-------------|----------------------------------|
| `/`         | Página principal con lista de personajes |
| `/search`   | Búsqueda de personajes           |
| `/heroes/:id` | Detalle de un personaje         |
| `/admin`    | Panel de administración         |
