-- ==============================================================
-- Script de Creacion de Base de Datos y Tablas para SQL Server 2022
-- Ejecutar este script en SQL Server Management Studio (SSMS)
-- ==============================================================

-- 1. Crear la base de datos si no existe
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'biblioteca_db')
BEGIN
    CREATE DATABASE biblioteca_db;
END
GO

-- 2. Usar la base de datos
USE biblioteca_db;
GO

-- 3. Crear la tabla libros si no existe
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'libros')
BEGIN
    CREATE TABLE libros (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        titulo NVARCHAR(250) NOT NULL,
        autor NVARCHAR(200) NOT NULL,
        genero NVARCHAR(100) NOT NULL,
        anio INT NOT NULL,
        paginas INT NOT NULL
    );
END
GO

-- 4. Crear la tabla usuarios si no existe
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'usuarios')
BEGIN
    CREATE TABLE usuarios (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        username NVARCHAR(100) NOT NULL UNIQUE,
        password NVARCHAR(100) NOT NULL,
        rol NVARCHAR(50) NOT NULL, -- 'ADMIN' o 'USER'
        nombre NVARCHAR(150) NULL
    );
END
GO

-- 5. Insertar usuario admin inicial si no existe
IF NOT EXISTS (SELECT 1 FROM usuarios WHERE username = 'admin')
BEGIN
    INSERT INTO usuarios (username, password, rol, nombre)
    VALUES ('admin', '123', 'ADMIN', 'Administrador General');
END
GO

-- 6. Insertar libros iniciales de prueba
IF NOT EXISTS (SELECT 1 FROM libros)
BEGIN
    SET IDENTITY_INSERT libros ON;

    INSERT INTO libros (id, titulo, autor, genero, anio, paginas) VALUES
    (1, N'Cien años de soledad', N'Gabriel García Márquez', N'Realismo mágico', 1967, 417),
    (2, N'1984', N'George Orwell', N'Distopía', 1949, 328),
    (3, N'Don Quijote de la Mancha', N'Miguel de Cervantes', N'Novela', 1605, 863),
    (4, N'El principito', N'Antoine de Saint-Exupéry', N'Fantasía', 1943, 96),
    (5, N'Harry Potter y la piedra filosofal', N'J. K. Rowling', N'Fantasía', 1997, 309),
    (6, N'El Hobbit', N'J. R. R. Tolkien', N'Fantasía', 1937, 310),
    (7, N'Orgullo y prejuicio', N'Jane Austen', N'Romance', 1813, 432),
    (8, N'Crimen y castigo', N'Fiódor Dostoyevski', N'Drama', 1866, 671),
    (9, N'La metamorfosis', N'Franz Kafka', N'Ficción', 1915, 96),
    (10, N'El nombre del viento', N'Patrick Rothfuss', N'Fantasía', 2007, 662),
    (11, N'La sombra del viento', N'Carlos Ruiz Zafón', N'Misterio', 2001, 576),
    (12, N'Sapiens', N'Yuval Noah Harari', N'Historia', 2011, 496),
    (13, N'El código Da Vinci', N'Dan Brown', N'Misterio', 2003, 689),
    (14, N'Los juegos del hambre', N'Suzanne Collins', N'Distopía', 2008, 374),
    (15, N'El alquimista', N'Paulo Coelho', N'Ficción', 1988, 208),
    (16, N'It', N'Stephen King', N'Terror', 1986, 1138),
    (17, N'Drácula', N'Bram Stoker', N'Terror', 1897, 418),
    (18, N'El retrato de Dorian Gray', N'Oscar Wilde', N'Ficción', 1890, 254),
    (19, N'Viaje al centro de la Tierra', N'Julio Verne', N'Aventura', 1864, 384),
    (20, N'Fahrenheit 451', N'Ray Bradbury', N'Distopía', 1953, 256);

    SET IDENTITY_INSERT libros OFF;
END
GO

-- 7. Consultar datos
SELECT * FROM usuarios;
SELECT * FROM libros;
GO
