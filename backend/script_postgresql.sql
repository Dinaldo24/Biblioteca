-- ==============================================================
-- Script de Creacion de Base de Datos y Tablas para PostgreSQL
-- Ejecutar este script en Neon.tech (SQL Editor) o Supabase
-- ==============================================================

-- 1. Tabla de libros con campo portada
CREATE TABLE IF NOT EXISTS libros (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(250) NOT NULL,
    autor VARCHAR(200) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    anio INT NOT NULL,
    paginas INT NOT NULL,
    portada TEXT
);

-- Si la tabla ya existía sin portada, agregar la columna:
ALTER TABLE libros ADD COLUMN IF NOT EXISTS portada TEXT;

-- 2. Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    nombre VARCHAR(150)
);

-- 3. Usuario administrador por defecto
INSERT INTO usuarios (username, password, rol, nombre)
VALUES ('admin', '123', 'ADMIN', 'Administrador General')
ON CONFLICT (username) DO NOTHING;

-- 4. Libros iniciales con sus portadas reales
INSERT INTO libros (titulo, autor, genero, anio, paginas, portada) VALUES
('Cien años de soledad', 'Gabriel García Márquez', 'Realismo mágico', 1967, 417, 'https://m.media-amazon.com/images/I/71W4hV0d8pL._AC_UF1000,1000_QL80_.jpg'),
('1984', 'George Orwell', 'Distopía', 1949, 328, 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg'),
('Don Quijote de la Mancha', 'Miguel de Cervantes', 'Novela', 1605, 863, 'https://m.media-amazon.com/images/I/91R8f8hX2TL._AC_UF1000,1000_QL80_.jpg'),
('El principito', 'Antoine de Saint-Exupéry', 'Fantasía', 1943, 96, 'https://cdn.culturagenial.com/es/imagenes/el-principito-portada-cke.jpg?class=article'),
('Harry Potter y la piedra filosofal', 'J. K. Rowling', 'Fantasía', 1997, 309, 'https://m.media-amazon.com/images/I/81ibfYk4qmL._AC_UF1000,1000_QL80_.jpg'),
('El Hobbit', 'J. R. R. Tolkien', 'Fantasía', 1937, 310, 'https://m.media-amazon.com/images/I/81k7U0u5+ML._AC_UF1000,1000_QL80_.jpg'),
('Orgullo y prejuicio', 'Jane Austen', 'Romance', 1813, 432, 'https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg'),
('Crimen y castigo', 'Fiódor Dostoyevski', 'Drama', 1866, 671, 'https://m.media-amazon.com/images/I/71wdbKi4DSL._AC_UF1000,1000_QL80_.jpg'),
('La metamorfosis', 'Franz Kafka', 'Ficción', 1915, 96, 'https://m.media-amazon.com/images/I/71R2c3R8fLL._AC_UF1000,1000_QL80_.jpg'),
('El nombre del viento', 'Patrick Rothfuss', 'Fantasía', 2007, 662, 'https://m.media-amazon.com/images/I/91b8fS+hNUL._AC_UF1000,1000_QL80_.jpg'),
('La sombra del viento', 'Carlos Ruiz Zafón', 'Misterio', 2001, 576, 'https://m.media-amazon.com/images/I/71KkI3yUj4L._AC_UF1000,1000_QL80_.jpg'),
('Sapiens', 'Yuval Noah Harari', 'Historia', 2011, 496, 'https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF1000,1000_QL80_.jpg'),
('El código Da Vinci', 'Dan Brown', 'Misterio', 2003, 689, 'https://m.media-amazon.com/images/I/815WERNsdtL._AC_UF1000,1000_QL80_.jpg'),
('Los juegos del hambre', 'Suzanne Collins', 'Distopía', 2008, 374, 'https://m.media-amazon.com/images/I/61I24wOsn8L._AC_UF1000,1000_QL80_.jpg'),
('El alquimista', 'Paulo Coelho', 'Ficción', 1988, 208, 'https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg'),
('It', 'Stephen King', 'Terror', 1986, 1138, 'https://m.media-amazon.com/images/I/71d5F0g1aEL._AC_UF1000,1000_QL80_.jpg'),
('Drácula', 'Bram Stoker', 'Terror', 1897, 418, 'https://m.media-amazon.com/images/I/81zN5aV+uTL._AC_UF1000,1000_QL80_.jpg'),
('El retrato de Dorian Gray', 'Oscar Wilde', 'Ficción', 1890, 254, 'https://m.media-amazon.com/images/I/71L2tI792bL._AC_UF1000,1000_QL80_.jpg'),
('Viaje al centro de la Tierra', 'Julio Verne', 'Aventura', 1864, 384, 'https://m.media-amazon.com/images/I/81M6bLgYQ0L._AC_UF1000,1000_QL80_.jpg'),
('Fahrenheit 451', 'Ray Bradbury', 'Distopía', 1953, 256, 'https://m.media-amazon.com/images/I/61N8q7Qn0ZL._AC_UF1000,1000_QL80_.jpg')
ON CONFLICT DO NOTHING;

SELECT * FROM usuarios;
SELECT * FROM libros;
