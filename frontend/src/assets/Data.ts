export interface PropsDetalle {
    id: number
    titulo: string
    autor: string
    genero: string
    anio: number
    paginas: number
    portada?: string
}

export const obtenerPortada = (item?: PropsDetalle): string => {
    return item?.portada || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80"
}

export const libros: PropsDetalle[] = [
    // --- COLECCIÓN: ATLAS REGIONAL DEL PERÚ ---
    {
        id: 1,
        titulo: "Atlas Regional del Perú - Cuzco (Tomo 1)",
        autor: "Ediciones El Popular",
        genero: "Atlas y Geografía del Perú",
        anio: 2004,
        paginas: 96,
        portada: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80"
    },
    {
        id: 2,
        titulo: "Atlas Regional del Perú - Piura (Tomo 2)",
        autor: "Ediciones El Popular",
        genero: "Atlas y Geografía del Perú",
        anio: 2004,
        paginas: 96,
        portada: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80"
    },
    {
        id: 3,
        titulo: "Atlas Regional del Perú - Arequipa (Tomo 3)",
        autor: "Ediciones El Popular",
        genero: "Atlas y Geografía del Perú",
        anio: 2004,
        paginas: 96,
        portada: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80"
    },
    {
        id: 4,
        titulo: "Atlas Regional del Perú - Huánuco (Tomo 6)",
        autor: "Ediciones El Popular",
        genero: "Atlas y Geografía del Perú",
        anio: 2004,
        paginas: 96,
        portada: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80"
    },
    {
        id: 5,
        titulo: "Atlas Regional del Perú - Puno (Tomo 7)",
        autor: "Ediciones El Popular",
        genero: "Atlas y Geografía del Perú",
        anio: 2004,
        paginas: 96,
        portada: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80"
    },
    {
        id: 6,
        titulo: "Atlas Regional del Perú - Lambayeque (Tomo 8)",
        autor: "Ediciones El Popular",
        genero: "Atlas y Geografía del Perú",
        anio: 2004,
        paginas: 96,
        portada: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80"
    },
    {
        id: 7,
        titulo: "Atlas Regional del Perú - Tacna (Tomo 9)",
        autor: "Ediciones El Popular",
        genero: "Atlas y Geografía del Perú",
        anio: 2004,
        paginas: 96,
        portada: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80"
    },
    {
        id: 8,
        titulo: "Atlas Regional del Perú - La Libertad (Tomo 10)",
        autor: "Ediciones El Popular",
        genero: "Atlas y Geografía del Perú",
        anio: 2004,
        paginas: 96,
        portada: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80"
    },
    {
        id: 9,
        titulo: "Atlas Regional del Perú - Madre de Dios (Tomo 12)",
        autor: "Ediciones El Popular",
        genero: "Atlas y Geografía del Perú",
        anio: 2004,
        paginas: 96,
        portada: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80"
    },
    {
        id: 10,
        titulo: "Atlas Regional del Perú - Cajamarca (Tomo 13)",
        autor: "Ediciones El Popular",
        genero: "Atlas y Geografía del Perú",
        anio: 2004,
        paginas: 96,
        portada: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80"
    },
    {
        id: 11,
        titulo: "Atlas Regional del Perú - Ucayali (Tomo 16)",
        autor: "Ediciones El Popular",
        genero: "Atlas y Geografía del Perú",
        anio: 2004,
        paginas: 96,
        portada: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80"
    },
    {
        id: 12,
        titulo: "Atlas Regional del Perú - Tumbes (Tomo 17)",
        autor: "Ediciones El Popular",
        genero: "Atlas y Geografía del Perú",
        anio: 2004,
        paginas: 96,
        portada: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80"
    },
    {
        id: 13,
        titulo: "Atlas Regional del Perú - Loreto (Tomo 18)",
        autor: "Ediciones El Popular",
        genero: "Atlas y Geografía del Perú",
        anio: 2004,
        paginas: 96,
        portada: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80"
    },
    {
        id: 14,
        titulo: "Atlas Regional del Perú - Moquegua (Tomo 20)",
        autor: "Ediciones El Popular",
        genero: "Atlas y Geografía del Perú",
        anio: 2004,
        paginas: 96,
        portada: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80"
    },
    {
        id: 15,
        titulo: "Atlas Regional del Perú - Ica (Tomo 21)",
        autor: "Ediciones El Popular",
        genero: "Atlas y Geografía del Perú",
        anio: 2004,
        paginas: 96,
        portada: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=500&q=80"
    },

    // --- COLECCIÓN: CIENCIA, TECNOLOGÍA Y AMBIENTE (CTA) ---
    {
        id: 16,
        titulo: "Ciencia, Tecnología y Ambiente 2do secundaria",
        autor: "Ministerio de Educación del Perú",
        genero: "Ciencia, Tecnología y Ambiente",
        anio: 2016,
        paginas: 280,
        portada: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&q=80"
    },
    {
        id: 17,
        titulo: "Ciencia, Tecnología y Ambiente 3ro secundaria - Santillana",
        autor: "Editorial Santillana / MINEDU",
        genero: "Ciencia, Tecnología y Ambiente",
        anio: 2016,
        paginas: 288,
        portada: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&q=80"
    },
    {
        id: 18,
        titulo: "Ciencia, Tecnología y Ambiente 4to secundaria",
        autor: "Ministerio de Educación del Perú",
        genero: "Ciencia, Tecnología y Ambiente",
        anio: 2016,
        paginas: 288,
        portada: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&q=80"
    },
    {
        id: 19,
        titulo: "Ciencia, Tecnología y Ambiente 4 (Texto escolar)",
        autor: "Ministerio de Educación del Perú",
        genero: "Ciencia, Tecnología y Ambiente",
        anio: 2018,
        paginas: 272,
        portada: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&q=80"
    },
    {
        id: 20,
        titulo: "Ciencia, Tecnología y Ambiente 5to secundaria",
        autor: "Ministerio de Educación del Perú",
        genero: "Ciencia, Tecnología y Ambiente",
        anio: 2016,
        paginas: 288,
        portada: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&q=80"
    },

    // --- COLECCIÓN: MATEMÁTICAS ---
    {
        id: 21,
        titulo: "Matemática 1 - Texto para el estudiante (1ro secundaria)",
        autor: "Ministerio de Educación del Perú",
        genero: "Matemática",
        anio: 2018,
        paginas: 240,
        portada: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80"
    },
    {
        id: 22,
        titulo: "Matemática 1 - Tomo 2 (Santillana)",
        autor: "Editorial Santillana",
        genero: "Matemática",
        anio: 2017,
        paginas: 160,
        portada: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80"
    },
    {
        id: 23,
        titulo: "Matemática 2 - secundaria",
        autor: "Ministerio de Educación del Perú",
        genero: "Matemática",
        anio: 2018,
        paginas: 240,
        portada: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80"
    },
    {
        id: 24,
        titulo: "Matemática 2 - Tomo 5 (Santillana)",
        autor: "Editorial Santillana",
        genero: "Matemática",
        anio: 2017,
        paginas: 160,
        portada: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80"
    },
    {
        id: 25,
        titulo: "Matemática 5to secundaria",
        autor: "Ministerio de Educación del Perú",
        genero: "Matemática",
        anio: 2018,
        paginas: 240,
        portada: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80"
    },
    {
        id: 26,
        titulo: "Aritmética 1 - Dominando las Matemáticas (Tomo 1)",
        autor: "Ediciones El Popular",
        genero: "Matemática",
        anio: 2012,
        paginas: 128,
        portada: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80"
    },
    {
        id: 27,
        titulo: "Álgebra 1 - Dominando las Matemáticas",
        autor: "Ediciones El Popular",
        genero: "Matemática",
        anio: 2012,
        paginas: 128,
        portada: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80"
    },
    {
        id: 28,
        titulo: "Aritmética 3 - Dominando las Matemáticas",
        autor: "Ediciones El Popular",
        genero: "Matemática",
        anio: 2012,
        paginas: 128,
        portada: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80"
    },

    // --- COLECCIÓN: COMUNICACIÓN Y LITERATURA ---
    {
        id: 29,
        titulo: "Comunicación 2 - Texto para el estudiante (Secundaria)",
        autor: "Ministerio de Educación del Perú",
        genero: "Comunicación y Literatura",
        anio: 2018,
        paginas: 224,
        portada: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80"
    },
    {
        id: 30,
        titulo: "Comunicación 4to secundaria",
        autor: "Ministerio de Educación del Perú",
        genero: "Comunicación y Literatura",
        anio: 2018,
        paginas: 224,
        portada: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80"
    },
    {
        id: 31,
        titulo: "Lenguaje y Comunicación 1 - Tomo 1 (Santillana)",
        autor: "Editorial Santillana",
        genero: "Comunicación y Literatura",
        anio: 2017,
        paginas: 160,
        portada: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80"
    },
    {
        id: 32,
        titulo: "Antología Literaria 1 - (1ro secundaria)",
        autor: "Ministerio de Educación del Perú",
        genero: "Comunicación y Literatura",
        anio: 2015,
        paginas: 192,
        portada: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80"
    },
    {
        id: 33,
        titulo: "Antología Literaria 3 - (3ro secundaria)",
        autor: "Ministerio de Educación del Perú",
        genero: "Comunicación y Literatura",
        anio: 2015,
        paginas: 192,
        portada: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80"
    },
    {
        id: 34,
        titulo: "Cuaderno de Trabajo de Comunicación / Comprensión Lectora 5",
        autor: "Ministerio de Educación del Perú",
        genero: "Comunicación y Literatura",
        anio: 2019,
        paginas: 160,
        portada: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80"
    },
    {
        id: 35,
        titulo: "Texto para el Estudiante - 2do Secundaria",
        autor: "Ministerio de Educación del Perú",
        genero: "Comunicación y Literatura",
        anio: 2018,
        paginas: 200,
        portada: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&q=80"
    },

    // --- COLECCIÓN: HISTORIA, GEOGRAFÍA Y ECONOMÍA ---
    {
        id: 36,
        titulo: "Historia, Geografía y Economía 1ro secundaria - Santillana",
        autor: "Editorial Santillana / MINEDU",
        genero: "Historia, Geografía y Economía",
        anio: 2016,
        paginas: 256,
        portada: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&q=80"
    },
    {
        id: 37,
        titulo: "Historia, Geografía y Economía 2do secundaria - Santillana",
        autor: "Editorial Santillana / MINEDU",
        genero: "Historia, Geografía y Economía",
        anio: 2016,
        paginas: 256,
        portada: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&q=80"
    },
    {
        id: 38,
        titulo: "Historia, Geografía y Economía 1 (Texto escolar)",
        autor: "Ministerio de Educación del Perú",
        genero: "Historia, Geografía y Economía",
        anio: 2017,
        paginas: 240,
        portada: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&q=80"
    },
    {
        id: 39,
        titulo: "Fuentes Históricas 3 - Secundaria",
        autor: "Ministerio de Educación del Perú",
        genero: "Historia, Geografía y Economía",
        anio: 2017,
        paginas: 120,
        portada: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&q=80"
    },
    {
        id: 40,
        titulo: "Fuentes Históricas 4 - Cuaderno de fichas",
        autor: "Ministerio de Educación del Perú",
        genero: "Historia, Geografía y Economía",
        anio: 2017,
        paginas: 128,
        portada: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&q=80"
    },
    {
        id: 41,
        titulo: "Historia del Mundo Contemporáneo - 1er Curso",
        autor: "Editorial Vicens Vives",
        genero: "Historia, Geografía y Economía",
        anio: 2015,
        paginas: 360,
        portada: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&q=80"
    },

    // --- COLECCIÓN: DESARROLLO PERSONAL, CIUDADANÍA Y CÍVICA ---
    {
        id: 42,
        titulo: "Desarrollo Personal, Ciudadanía y Cívica - Texto escolar",
        autor: "Ministerio de Educación del Perú",
        genero: "Desarrollo Personal y Cívica",
        anio: 2018,
        paginas: 220,
        portada: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80"
    },
    {
        id: 43,
        titulo: "Desarrollo Personal, Ciudadanía y Cívica 2do secundaria",
        autor: "Ministerio de Educación del Perú",
        genero: "Desarrollo Personal y Cívica",
        anio: 2018,
        paginas: 216,
        portada: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80"
    },
    {
        id: 44,
        titulo: "Desarrollo Personal, Ciudadanía y Cívica 3ro secundaria",
        autor: "Ministerio de Educación del Perú",
        genero: "Desarrollo Personal y Cívica",
        anio: 2018,
        paginas: 216,
        portada: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80"
    },
    {
        id: 45,
        titulo: "Desarrollo Personal, Ciudadanía y Cívica 5to secundaria",
        autor: "Ministerio de Educación del Perú",
        genero: "Desarrollo Personal y Cívica",
        anio: 2018,
        paginas: 224,
        portada: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80"
    },

    // --- COLECCIÓN: INGLÉS (ENGLISH DISCOVERIES) ---
    {
        id: 46,
        titulo: "English Discoveries Student Workbook A2",
        autor: "Edusoft / MINEDU",
        genero: "Inglés",
        anio: 2018,
        paginas: 140,
        portada: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&q=80"
    },
    {
        id: 47,
        titulo: "English Discoveries Student Workbook B2",
        autor: "Edusoft / MINEDU",
        genero: "Inglés",
        anio: 2018,
        paginas: 140,
        portada: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&q=80"
    },
    {
        id: 48,
        titulo: "English Discoveries Student Workbook C1",
        autor: "Edusoft / MINEDU",
        genero: "Inglés",
        anio: 2018,
        paginas: 140,
        portada: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&q=80"
    },

    // --- COLECCIÓN: ORIENTACIÓN Y TUTORÍA ---
    {
        id: 49,
        titulo: "¿Es amor lo que siento? Guía de prevención de la violencia de género",
        autor: "Ministerio de Educación del Perú",
        genero: "Orientación y Tutoría",
        anio: 2019,
        paginas: 84,
        portada: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&q=80"
    },

    // --- COLECCIÓN: LITERATURA CLÁSICA Y UNIVERSAL ---
    {
        id: 50,
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        genero: "Realismo mágico",
        anio: 1967,
        paginas: 417,
        portada: "https://m.media-amazon.com/images/I/71W4hV0d8pL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 51,
        titulo: "1984",
        autor: "George Orwell",
        genero: "Distopía",
        anio: 1949,
        paginas: 328,
        portada: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 52,
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        genero: "Novela",
        anio: 1605,
        paginas: 863,
        portada: "https://m.media-amazon.com/images/I/91R8f8hX2TL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 53,
        titulo: "El principito",
        autor: "Antoine de Saint-Exupéry",
        genero: "Fantasía",
        anio: 1943,
        paginas: 96,
        portada: "https://cdn.culturagenial.com/es/imagenes/el-principito-portada-cke.jpg?class=article"
    },
    {
        id: 54,
        titulo: "Harry Potter y la piedra filosofal",
        autor: "J. K. Rowling",
        genero: "Fantasía",
        anio: 1997,
        paginas: 309,
        portada: "https://m.media-amazon.com/images/I/81ibfYk4qmL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 55,
        titulo: "El Hobbit",
        autor: "J. R. R. Tolkien",
        genero: "Fantasía",
        anio: 1937,
        paginas: 310,
        portada: "https://m.media-amazon.com/images/I/81k7U0u5+ML._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 56,
        titulo: "Orgullo y prejuicio",
        autor: "Jane Austen",
        genero: "Romance",
        anio: 1813,
        paginas: 432,
        portada: "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 57,
        titulo: "Crimen y castigo",
        autor: "Fiódor Dostoyevski",
        genero: "Drama",
        anio: 1866,
        paginas: 671,
        portada: "https://m.media-amazon.com/images/I/71wdbKi4DSL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 58,
        titulo: "La metamorfosis",
        autor: "Franz Kafka",
        genero: "Ficción",
        anio: 1915,
        paginas: 96,
        portada: "https://m.media-amazon.com/images/I/71R2c3R8fLL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 59,
        titulo: "El nombre del viento",
        autor: "Patrick Rothfuss",
        genero: "Fantasía",
        anio: 2007,
        paginas: 662,
        portada: "https://m.media-amazon.com/images/I/91b8fS+hNUL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 60,
        titulo: "La sombra del viento",
        autor: "Carlos Ruiz Zafón",
        genero: "Misterio",
        anio: 2001,
        paginas: 576,
        portada: "https://m.media-amazon.com/images/I/71KkI3yUj4L._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 61,
        titulo: "Sapiens",
        autor: "Yuval Noah Harari",
        genero: "Historia",
        anio: 2011,
        paginas: 496,
        portada: "https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 62,
        titulo: "El código Da Vinci",
        autor: "Dan Brown",
        genero: "Misterio",
        anio: 2003,
        paginas: 689,
        portada: "https://m.media-amazon.com/images/I/815WERNsdtL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 63,
        titulo: "Los juegos del hambre",
        autor: "Suzanne Collins",
        genero: "Distopía",
        anio: 2008,
        paginas: 374,
        portada: "https://m.media-amazon.com/images/I/61I24wOsn8L._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 64,
        titulo: "El alquimista",
        autor: "Paulo Coelho",
        genero: "Ficción",
        anio: 1988,
        paginas: 208,
        portada: "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 65,
        titulo: "It",
        autor: "Stephen King",
        genero: "Terror",
        anio: 1986,
        paginas: 1138,
        portada: "https://m.media-amazon.com/images/I/71d5F0g1aEL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 66,
        titulo: "Drácula",
        autor: "Bram Stoker",
        genero: "Terror",
        anio: 1897,
        paginas: 418,
        portada: "https://m.media-amazon.com/images/I/81zN5aV+uTL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 67,
        titulo: "El retrato de Dorian Gray",
        autor: "Oscar Wilde",
        genero: "Ficción",
        anio: 1890,
        paginas: 254,
        portada: "https://m.media-amazon.com/images/I/71L2tI792bL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 68,
        titulo: "Viaje al centro de la Tierra",
        autor: "Julio Verne",
        genero: "Aventura",
        anio: 1864,
        paginas: 384,
        portada: "https://m.media-amazon.com/images/I/81M6bLgYQ0L._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 69,
        titulo: "Fahrenheit 451",
        autor: "Ray Bradbury",
        genero: "Distopía",
        anio: 1953,
        paginas: 256,
        portada: "https://m.media-amazon.com/images/I/61N8q7Qn0ZL._AC_UF1000,1000_QL80_.jpg"
    }
]
