-- ==============================================================
-- Script de Creacion de Base de Datos y Tablas para PostgreSQL
-- Ejecutar este script en Neon.tech (SQL Editor) o Supabase
-- ==============================================================

-- 1. Tabla de libros
CREATE TABLE IF NOT EXISTS libros (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(250) NOT NULL,
    autor VARCHAR(200) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    anio INT NOT NULL,
    paginas INT NOT NULL
);

-- 2. Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    rol VARCHAR(50) NOT NULL, -- 'ADMIN' o 'USER'
    nombre VARCHAR(150)
);

-- 3. Usuario administrador por defecto
INSERT INTO usuarios (username, password, rol, nombre)
VALUES ('admin', '123', 'ADMIN', 'Administrador General')
ON CONFLICT (username) DO NOTHING;

-- 4. Libros iniciales
INSERT INTO libros (titulo, autor, genero, anio, paginas) VALUES
('Cien años de soledad', 'Gabriel García Márquez', 'Realismo mágico', 1967, 417),
('1984', 'George Orwell', 'Distopía', 1949, 328),
('Don Quijote de la Mancha', 'Miguel de Cervantes', 'Novela', 1605, 863),
('El principito', 'Antoine de Saint-Exupéry', 'Fantasía', 1943, 96),
('Harry Potter y la piedra filosofal', 'J. K. Rowling', 'Fantasía', 1997, 309),
('El Hobbit', 'J. R. R. Tolkien', 'Fantasía', 1937, 310),
('Orgullo y prejuicio', 'Jane Austen', 'Romance', 1813, 432),
('Crimen y castigo', 'Fiódor Dostoyevski', 'Drama', 1866, 671),
('La metamorfosis', 'Franz Kafka', 'Ficción', 1915, 96),
('El nombre del viento', 'Patrick Rothfuss', 'Fantasía', 2007, 662),
('La sombra del viento', 'Carlos Ruiz Zafón', 'Misterio', 2001, 576),
('Sapiens', 'Yuval Noah Harari', 'Historia', 2011, 496),
('El código Da Vinci', 'Dan Brown', 'Misterio', 2003, 689),
('Los juegos del hambre', 'Suzanne Collins', 'Distopía', 2008, 374),
('El alquimista', 'Paulo Coelho', 'Ficción', 1988, 208),
('It', 'Stephen King', 'Terror', 1986, 1138),
('Drácula', 'Bram Stoker', 'Terror', 1897, 418),
('El retrato de Dorian Gray', 'Oscar Wilde', 'Ficción', 1890, 254),
('Viaje al centro de la Tierra', 'Julio Verne', 'Aventura', 1864, 384),
('Fahrenheit 451', 'Ray Bradbury', 'Distopía', 1953, 256)
ON CONFLICT DO NOTHING;

SELECT * FROM usuarios;
SELECT * FROM libros;
