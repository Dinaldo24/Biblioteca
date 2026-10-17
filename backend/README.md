# Backend Biblioteca - Spring Boot & SQL Server 2022

Backend API REST desarrollado con **Spring Boot 3**, **Java 21**, **Spring Data JPA** y **Microsoft SQL Server 2022**.

---

## 📁 Estructura del Proyecto

```text
backend biblioteca/
├── pom.xml                                    # Dependencias de Maven
├── script_sql_server.sql                       # Script para SQL Server Management Studio
├── README.md                                  # Guía paso a paso
└── src/
    └── main/
        ├── java/com/biblioteca/
        │   ├── BibliotecaApplication.java    # Clase principal de Spring Boot
        │   ├── config/
        │   │   └── CorsConfig.java           # Configuración CORS para React
        │   ├── controller/
        │   │   └── LibroController.java      # Endpoints REST (/libros)
        │   ├── model/
        │   │   └── Libro.java                # Entidad JPA (tabla libros)
        │   ├── repository/
        │   │   └── LibroRepository.java      # Consultas a base de datos
        │   └── service/
        │       └── LibroService.java         # Lógica de negocio
        └── resources/
            └── application.properties        # Configuración de puerto y conexión a SQL Server
```

---

## 🗄️ Paso 1: Configurar la Base de Datos en SQL Server (SSMS)

1. Abre **SQL Server Management Studio (SSMS)**.
2. Inicia sesión con **Autenticación de Windows** o con usuario `sa`.
3. Abre el archivo `script_sql_server.sql` ubicado en esta carpeta.
4. Presiona **Execute (F5)**.
5. El script:
   - Creará la base de datos `biblioteca_db`.
   - Creará la tabla `libros` con las columnas: `id`, `titulo`, `autor`, `genero`, `anio`, `paginas`.
   - Insertará los 20 libros iniciales de prueba.

---

## ⚙️ Paso 2: Verificar Credenciales en `application.properties`

En `src/main/resources/application.properties` tienes:

```properties
server.port=3001

spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=biblioteca_db;encrypt=true;trustServerCertificate=true;
spring.datasource.username=sa
spring.datasource.password=123
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver
```

> **Nota:** El puerto configurado es el `3001` para que coincida exactamente con la configuración de tu frontend React (`http://localhost:3001/libros`).

---

## 🚀 Paso 3: Ejecutar el Backend

### Opción A: Desde Visual Studio Code / IntelliJ IDEA / Eclipse
- Abre la carpeta `backend biblioteca` en tu editor preferido.
- Ejecuta la clase `BibliotecaApplication.java` (botón Run).

### Opción B: Desde la terminal (PowerShell / CMD)
```powershell
cd "c:\Users\NALDO\OneDrive\Documentos\backend biblioteca"
mvn spring-boot:run
```

---

## 🌐 Endpoints Disponibles

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/libros` | Retorna todos los libros en formato JSON |
| `GET` | `/libros?titulo={busqueda}` | Filtra libros por título |
| `GET` | `/libros?genero={genero}` | Filtra libros por género |
| `GET` | `/libros/{id}` | Retorna un libro específico por su ID |
| `POST` | `/libros` | Registra un nuevo libro |
| `PUT` | `/libros/{id}` | Actualiza los datos de un libro existente |
| `DELETE` | `/libros/{id}` | Elimina un libro por su ID |
