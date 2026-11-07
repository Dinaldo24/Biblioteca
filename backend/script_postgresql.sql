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

-- Si la tabla ya existia sin portada, agregar la columna:
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

-- 4. Coleccion completa de libros (1 a 69)
INSERT INTO libros (id, titulo, autor, genero, anio, paginas, portada) VALUES
(1, 'Atlas Regional del Perú - Cuzco (Tomo 1)', 'Ediciones El Popular', 'Atlas y Geografía del Perú', 2004, 96, 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80'),
(2, 'Atlas Regional del Perú - Piura (Tomo 2)', 'Ediciones El Popular', 'Atlas y Geografía del Perú', 2004, 96, 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80'),
(3, 'Atlas Regional del Perú - Arequipa (Tomo 3)', 'Ediciones El Popular', 'Atlas y Geografía del Perú', 2004, 96, 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80'),
(4, 'Atlas Regional del Perú - Huánuco (Tomo 6)', 'Ediciones El Popular', 'Atlas y Geografía del Perú', 2004, 96, 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80'),
(5, 'Atlas Regional del Perú - Puno (Tomo 7)', 'Ediciones El Popular', 'Atlas y Geografía del Perú', 2004, 96, 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80'),
(6, 'Atlas Regional del Perú - Lambayeque (Tomo 8)', 'Ediciones El Popular', 'Atlas y Geografía del Perú', 2004, 96, 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80'),
(7, 'Atlas Regional del Perú - Tacna (Tomo 9)', 'Ediciones El Popular', 'Atlas y Geografía del Perú', 2004, 96, 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80'),
(8, 'Atlas Regional del Perú - La Libertad (Tomo 10)', 'Ediciones El Popular', 'Atlas y Geografía del Perú', 2004, 96, 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80'),
(9, 'Atlas Regional del Perú - Madre de Dios (Tomo 12)', 'Ediciones El Popular', 'Atlas y Geografía del Perú', 2004, 96, 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80'),
(10, 'Atlas Regional del Perú - Cajamarca (Tomo 13)', 'Ediciones El Popular', 'Atlas y Geografía del Perú', 2004, 96, 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80'),
(11, 'Atlas Regional del Perú - Ucayali (Tomo 16)', 'Ediciones El Popular', 'Atlas y Geografía del Perú', 2004, 96, 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80'),
(12, 'Atlas Regional del Perú - Tumbes (Tomo 17)', 'Ediciones El Popular', 'Atlas y Geografía del Perú', 2004, 96, 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80'),
(13, 'Atlas Regional del Perú - Loreto (Tomo 18)', 'Ediciones El Popular', 'Atlas y Geografía del Perú', 2004, 96, 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80'),
(14, 'Atlas Regional del Perú - Moquegua (Tomo 20)', 'Ediciones El Popular', 'Atlas y Geografía del Perú', 2004, 96, 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80'),
(15, 'Atlas Regional del Perú - Ica (Tomo 21)', 'Ediciones El Popular', 'Atlas y Geografía del Perú', 2004, 96, 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80'),
(16, 'Ciencia, Tecnología y Ambiente 2do secundaria', 'Ministerio de Educación del Perú', 'Ciencia, Tecnología y Ambiente', 2016, 280, 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&q=80'),
(17, 'Ciencia, Tecnología y Ambiente 3ro secundaria - Santillana', 'Editorial Santillana / MINEDU', 'Ciencia, Tecnología y Ambiente', 2016, 288, 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&q=80'),
(18, 'Ciencia, Tecnología y Ambiente 4to secundaria', 'Ministerio de Educación del Perú', 'Ciencia, Tecnología y Ambiente', 2016, 288, 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&q=80'),
(19, 'Ciencia, Tecnología y Ambiente 4 (Texto escolar)', 'Ministerio de Educación del Perú', 'Ciencia, Tecnología y Ambiente', 2018, 272, 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&q=80'),
(20, 'Ciencia, Tecnología y Ambiente 5to secundaria', 'Ministerio de Educación del Perú', 'Ciencia, Tecnología y Ambiente', 2016, 288, 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&q=80'),
(21, 'Matemática 1 - Texto para el estudiante (1ro secundaria)', 'Ministerio de Educación del Perú', 'Matemática', 2018, 240, 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80'),
(22, 'Matemática 1 - Tomo 2 (Santillana)', 'Editorial Santillana', 'Matemática', 2017, 160, 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80'),
(23, 'Matemática 2 - secundaria', 'Ministerio de Educación del Perú', 'Matemática', 2018, 240, 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80'),
(24, 'Matemática 2 - Tomo 5 (Santillana)', 'Editorial Santillana', 'Matemática', 2017, 160, 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80'),
(25, 'Matemática 5to secundaria', 'Ministerio de Educación del Perú', 'Matemática', 2018, 240, 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80'),
(26, 'Aritmética 1 - Dominando las Matemáticas (Tomo 1)', 'Ediciones El Popular', 'Matemática', 2012, 128, 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80'),
(27, 'Álgebra 1 - Dominando las Matemáticas', 'Ediciones El Popular', 'Matemática', 2012, 128, 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80'),
(28, 'Aritmética 3 - Dominando las Matemáticas', 'Ediciones El Popular', 'Matemática', 2012, 128, 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80'),
(29, 'Comunicación 2 - Texto para el estudiante (Secundaria)', 'Ministerio de Educación del Perú', 'Comunicación y Literatura', 2018, 224, 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80'),
(30, 'Comunicación 4to secundaria', 'Ministerio de Educación del Perú', 'Comunicación y Literatura', 2018, 224, 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80'),
(31, 'Lenguaje y Comunicación 1 - Tomo 1 (Santillana)', 'Editorial Santillana', 'Comunicación y Literatura', 2017, 160, 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80'),
(32, 'Antología Literaria 1 - (1ro secundaria)', 'Ministerio de Educación del Perú', 'Comunicación y Literatura', 2015, 192, 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80'),
(33, 'Antología Literaria 3 - (3ro secundaria)', 'Ministerio de Educación del Perú', 'Comunicación y Literatura', 2015, 192, 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80'),
(34, 'Cuaderno de Trabajo de Comunicación / Comprensión Lectora 5', 'Ministerio de Educación del Perú', 'Comunicación y Literatura', 2019, 160, 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80'),
(35, 'Texto para el Estudiante - 2do Secundaria', 'Ministerio de Educación del Perú', 'Comunicación y Literatura', 2018, 200, 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80'),
(36, 'Historia, Geografía y Economía 1ro secundaria - Santillana', 'Editorial Santillana / MINEDU', 'Historia, Geografía y Economía', 2016, 256, 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&q=80'),
(37, 'Historia, Geografía y Economía 2do secundaria - Santillana', 'Editorial Santillana / MINEDU', 'Historia, Geografía y Economía', 2016, 256, 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&q=80'),
(38, 'Historia, Geografía y Economía 1 (Texto escolar)', 'Ministerio de Educación del Perú', 'Historia, Geografía y Economía', 2017, 240, 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&q=80'),
(39, 'Fuentes Históricas 3 - Secundaria', 'Ministerio de Educación del Perú', 'Historia, Geografía y Economía', 2017, 120, 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&q=80'),
(40, 'Fuentes Históricas 4 - Cuaderno de fichas', 'Ministerio de Educación del Perú', 'Historia, Geografía y Economía', 2017, 128, 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&q=80'),
(41, 'Historia del Mundo Contemporáneo - 1er Curso', 'Editorial Vicens Vives', 'Historia, Geografía y Economía', 2015, 360, 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&q=80'),
(42, 'Desarrollo Personal, Ciudadanía y Cívica - Texto escolar', 'Ministerio de Educación del Perú', 'Desarrollo Personal y Cívica', 2018, 220, 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80'),
(43, 'Desarrollo Personal, Ciudadanía y Cívica 2do secundaria', 'Ministerio de Educación del Perú', 'Desarrollo Personal y Cívica', 2018, 216, 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80'),
(44, 'Desarrollo Personal, Ciudadanía y Cívica 3ro secundaria', 'Ministerio de Educación del Perú', 'Desarrollo Personal y Cívica', 2018, 216, 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80'),
(45, 'Desarrollo Personal, Ciudadanía y Cívica 5to secundaria', 'Ministerio de Educación del Perú', 'Desarrollo Personal y Cívica', 2018, 224, 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80'),
(46, 'English Discoveries Student Workbook A2', 'Edusoft / MINEDU', 'Inglés', 2018, 140, 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&q=80'),
(47, 'English Discoveries Student Workbook B2', 'Edusoft / MINEDU', 'Inglés', 2018, 140, 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&q=80'),
(48, 'English Discoveries Student Workbook C1', 'Edusoft / MINEDU', 'Inglés', 2018, 140, 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&q=80'),
(49, '¿Es amor lo que siento? Guía de prevención de la violencia de género', 'Ministerio de Educación del Perú', 'Orientación y Tutoría', 2019, 84, 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&q=80'),
(50, 'Cien años de soledad', 'Gabriel García Márquez', 'Realismo mágico', 1967, 417, 'https://m.media-amazon.com/images/I/71W4hV0d8pL._AC_UF1000,1000_QL80_.jpg'),
(51, '1984', 'George Orwell', 'Distopía', 1949, 328, 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg'),
(52, 'Don Quijote de la Mancha', 'Miguel de Cervantes', 'Novela', 1605, 863, 'https://m.media-amazon.com/images/I/91R8f8hX2TL._AC_UF1000,1000_QL80_.jpg'),
(53, 'El principito', 'Antoine de Saint-Exupéry', 'Fantasía', 1943, 96, 'https://cdn.culturagenial.com/es/imagenes/el-principito-portada-cke.jpg?class=article'),
(54, 'Harry Potter y la piedra filosofal', 'J. K. Rowling', 'Fantasía', 1997, 309, 'https://m.media-amazon.com/images/I/81ibfYk4qmL._AC_UF1000,1000_QL80_.jpg'),
(55, 'El Hobbit', 'J. R. R. Tolkien', 'Fantasía', 1937, 310, 'https://m.media-amazon.com/images/I/81k7U0u5+ML._AC_UF1000,1000_QL80_.jpg'),
(56, 'Orgullo y prejuicio', 'Jane Austen', 'Romance', 1813, 432, 'https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg'),
(57, 'Crimen y castigo', 'Fiódor Dostoyevski', 'Drama', 1866, 671, 'https://m.media-amazon.com/images/I/71wdbKi4DSL._AC_UF1000,1000_QL80_.jpg'),
(58, 'La metamorfosis', 'Franz Kafka', 'Ficción', 1915, 96, 'https://m.media-amazon.com/images/I/71R2c3R8fLL._AC_UF1000,1000_QL80_.jpg'),
(59, 'El nombre del viento', 'Patrick Rothfuss', 'Fantasía', 2007, 662, 'https://m.media-amazon.com/images/I/91b8fS+hNUL._AC_UF1000,1000_QL80_.jpg'),
(60, 'La sombra del viento', 'Carlos Ruiz Zafón', 'Misterio', 2001, 576, 'https://m.media-amazon.com/images/I/71KkI3yUj4L._AC_UF1000,1000_QL80_.jpg'),
(61, 'Sapiens', 'Yuval Noah Harari', 'Historia', 2011, 496, 'https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF1000,1000_QL80_.jpg'),
(62, 'El código Da Vinci', 'Dan Brown', 'Misterio', 2003, 689, 'https://m.media-amazon.com/images/I/815WERNsdtL._AC_UF1000,1000_QL80_.jpg'),
(63, 'Los juegos del hambre', 'Suzanne Collins', 'Distopía', 2008, 374, 'https://m.media-amazon.com/images/I/61I24wOsn8L._AC_UF1000,1000_QL80_.jpg'),
(64, 'El alquimista', 'Paulo Coelho', 'Ficción', 1988, 208, 'https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg'),
(65, 'It', 'Stephen King', 'Terror', 1986, 1138, 'https://m.media-amazon.com/images/I/71d5F0g1aEL._AC_UF1000,1000_QL80_.jpg'),
(66, 'Drácula', 'Bram Stoker', 'Terror', 1897, 418, 'https://m.media-amazon.com/images/I/81zN5aV+uTL._AC_UF1000,1000_QL80_.jpg'),
(67, 'El retrato de Dorian Gray', 'Oscar Wilde', 'Ficción', 1890, 254, 'https://m.media-amazon.com/images/I/71L2tI792bL._AC_UF1000,1000_QL80_.jpg'),
(68, 'Viaje al centro de la Tierra', 'Julio Verne', 'Aventura', 1864, 384, 'https://m.media-amazon.com/images/I/81M6bLgYQ0L._AC_UF1000,1000_QL80_.jpg'),
(69, 'Fahrenheit 451', 'Ray Bradbury', 'Distopía', 1953, 256, 'https://m.media-amazon.com/images/I/61N8q7Qn0ZL._AC_UF1000,1000_QL80_.jpg')
ON CONFLICT (id) DO UPDATE SET
    titulo = EXCLUDED.titulo,
    autor = EXCLUDED.autor,
    genero = EXCLUDED.genero,
    anio = EXCLUDED.anio,
    paginas = EXCLUDED.paginas,
    portada = EXCLUDED.portada;

SELECT setval(pg_get_serial_sequence('libros', 'id'), (SELECT MAX(id) FROM libros));

SELECT COUNT(*) AS total_libros FROM libros;
SELECT * FROM usuarios;
