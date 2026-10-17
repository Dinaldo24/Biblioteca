# 📚 Sistema de Gestión de Biblioteca (Fullstack)

Aplicación web Fullstack moderna para la gestión, catálogo y administración de libros, desarrollada con **React 19 + TypeScript + Vite + Tailwind CSS** en el Frontend, y **Spring Boot 3 + Java 21 + Spring Data JPA** en el Backend, con persistencia en **Microsoft SQL Server / PostgreSQL**.

---

## 🏗️ Arquitectura del Proyecto

```text
biblioteca-front-y-back/
├── frontend/               # Aplicación cliente en React + Vite + TypeScript
│   ├── src/
│   │   ├── Componentes/   # Modales, Tablas, Navbar, Login, Panel Admin
│   │   ├── context/       # Estado global y autenticación
│   │   └── App.tsx        # Catálogo público con filtros y búsqueda
│   └── package.json
│
└── backend/                # API REST en Spring Boot 3 + Java 21
    ├── src/main/java/com/biblioteca/
    │   ├── controller/    # Endpoints REST (/libros, /auth/login)
    │   ├── model/         # Entidades JPA (Libro, Usuario)
    │   ├── repository/    # Consultas a base de datos
    │   └── service/       # Lógica de negocio
    ├── script_sql_server.sql
    └── pom.xml
```

---

## ✨ Características Principales

### 📖 Zona Pública (Usuarios)
* **Catálogo interactivo:** Visualización de tarjetas de libros con portadas, autores y detalles.
* **Buscador en tiempo real:** Filtro por título o autor instantáneo.
* **Filtros avanzados:** Filtrado dinámico por género literario y rango de páginas con slider.

### 🛡️ Zona Administrativa (Acceso Protegido)
* **Autenticación con roles:** Inicio de sesión seguro para el administrador (`admin` / `123`).
* **Protección de rutas:** Verificación de sesión en `ProtecterRouter`.
* **Operaciones CRUD completas:**
  * ➕ **Subir libro:** Formulario modal para registrar nuevos libros directamente en la base de datos.
  * ✏️ **Editar libro:** Modificación de datos existentes (título, autor, género, año, páginas) mediante `PUT`.
  * 🗑️ **Eliminar libro:** Borrado seguro con confirmación modal mediante `DELETE`.
* **Paginación y conteo:** Tabla administrativa optimizada con paginación interactiva.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, React Router DOM 7.
* **Backend:** Java 21, Spring Boot 3.3.4, Spring Data JPA, Hibernate, Maven.
* **Base de Datos:** Microsoft SQL Server 2022 (compatible con PostgreSQL para despliegue en nube).

---

## 🚀 Ejecución en Local

### 1. Iniciar la Base de Datos
Ejecuta el script `backend/script_sql_server.sql` en **SQL Server Management Studio (SSMS)**.

### 2. Iniciar el Backend (Puerto 3001)
```powershell
cd backend
mvn spring-boot:run
```
*(O ejecuta el archivo `backend/run.bat`).*

### 3. Iniciar el Frontend (Puerto 5173)
```powershell
cd frontend
npm install
npm run dev
```

Abre en tu navegador: [http://localhost:5173](http://localhost:5173)

---

## 👤 Credenciales por Defecto (Admin)
* **Usuario:** `admin`
* **Contraseña:** `123`
* **Rol:** `ADMIN`
