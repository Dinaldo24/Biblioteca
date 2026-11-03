export interface PropsDetalle { 
    id?: number
    titulo: string
    autor: string
    genero: string
    anio: number
    paginas: number
    portada?: string
}

export const portadasPorDefecto: Record<string, string> = {
  "Cien años de soledad": "https://m.media-amazon.com/images/I/71W4hV0d8pL._AC_UF1000,1000_QL80_.jpg",
  "1984": "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
  "Don Quijote de la Mancha": "https://m.media-amazon.com/images/I/91R8f8hX2TL._AC_UF1000,1000_QL80_.jpg",
  "El principito": "https://cdn.culturagenial.com/es/imagenes/el-principito-portada-cke.jpg?class=article",
  "Harry Potter y la piedra filosofal": "https://m.media-amazon.com/images/I/81ibfYk4qmL._AC_UF1000,1000_QL80_.jpg",
  "El Hobbit": "https://m.media-amazon.com/images/I/81k7U0u5+ML._AC_UF1000,1000_QL80_.jpg",
  "Orgullo y prejuicio": "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg",
  "Crimen y castigo": "https://m.media-amazon.com/images/I/71wdbKi4DSL._AC_UF1000,1000_QL80_.jpg",
  "La metamorfosis": "https://m.media-amazon.com/images/I/71R2c3R8fLL._AC_UF1000,1000_QL80_.jpg",
  "El nombre del viento": "https://m.media-amazon.com/images/I/91b8fS+hNUL._AC_UF1000,1000_QL80_.jpg",
  "La sombra del viento": "https://m.media-amazon.com/images/I/71KkI3yUj4L._AC_UF1000,1000_QL80_.jpg",
  "Sapiens": "https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF1000,1000_QL80_.jpg",
  "El código Da Vinci": "https://m.media-amazon.com/images/I/815WERNsdtL._AC_UF1000,1000_QL80_.jpg",
  "Los juegos del hambre": "https://m.media-amazon.com/images/I/61I24wOsn8L._AC_UF1000,1000_QL80_.jpg",
  "El alquimista": "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg",
  "It": "https://m.media-amazon.com/images/I/71d5F0g1aEL._AC_UF1000,1000_QL80_.jpg",
  "Drácula": "https://m.media-amazon.com/images/I/81zN5aV+uTL._AC_UF1000,1000_QL80_.jpg",
  "El retrato de Dorian Gray": "https://m.media-amazon.com/images/I/71L2tI792bL._AC_UF1000,1000_QL80_.jpg",
  "Viaje al centro de la Tierra": "https://m.media-amazon.com/images/I/81M6bLgYQ0L._AC_UF1000,1000_QL80_.jpg",
  "Fahrenheit 451": "https://m.media-amazon.com/images/I/61N8q7Qn0ZL._AC_UF1000,1000_QL80_.jpg"
}

export const portadasPorGenero: Record<string, string> = {
  "Novela": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
  "Fantasía": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
  "Romance": "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop",
  "Drama": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop",
  "Ficción": "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=600&auto=format&fit=crop",
  "Misterio": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=600&auto=format&fit=crop",
  "Historia": "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=600&auto=format&fit=crop",
  "Distopía": "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
  "Terror": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
  "Aventura": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop",
  "Realismo mágico": "https://images.unsplash.com/photo-1532012164546-f432f2e3777f?q=80&w=600&auto=format&fit=crop"
}

export function obtenerPortada(item: PropsDetalle): string {
  if (item.portada && item.portada.trim().startsWith('http')) {
    return item.portada
  }
  if (portadasPorDefecto[item.titulo]) {
    return portadasPorDefecto[item.titulo]
  }
  if (portadasPorGenero[item.genero]) {
    return portadasPorGenero[item.genero]
  }
  return "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop"
}

export const libros: PropsDetalle[] = [
  {
    id: 1,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    genero: "Realismo mágico",
    anio: 1967,
    paginas: 417,
    portada: "https://m.media-amazon.com/images/I/71W4hV0d8pL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    genero: "Distopía",
    anio: 1949,
    paginas: 328,
    portada: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 3,
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    genero: "Novela",
    anio: 1605,
    paginas: 863,
    portada: "https://m.media-amazon.com/images/I/91R8f8hX2TL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 4,
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    genero: "Fantasía",
    anio: 1943,
    paginas: 96,
    portada: "https://cdn.culturagenial.com/es/imagenes/el-principito-portada-cke.jpg?class=article"
  },
  {
    id: 5,
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J. K. Rowling",
    genero: "Fantasía",
    anio: 1997,
    paginas: 309,
    portada: "https://m.media-amazon.com/images/I/81ibfYk4qmL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 6,
    titulo: "El Hobbit",
    autor: "J. R. R. Tolkien",
    genero: "Fantasía",
    anio: 1937,
    paginas: 310,
    portada: "https://m.media-amazon.com/images/I/81k7U0u5+ML._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 7,
    titulo: "Orgullo y prejuicio",
    autor: "Jane Austen",
    genero: "Romance",
    anio: 1813,
    paginas: 432,
    portada: "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 8,
    titulo: "Crimen y castigo",
    autor: "Fiódor Dostoyevski",
    genero: "Drama",
    anio: 1866,
    paginas: 671,
    portada: "https://m.media-amazon.com/images/I/71wdbKi4DSL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 9,
    titulo: "La metamorfosis",
    autor: "Franz Kafka",
    genero: "Ficción",
    anio: 1915,
    paginas: 96,
    portada: "https://m.media-amazon.com/images/I/71R2c3R8fLL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 10,
    titulo: "El nombre del viento",
    autor: "Patrick Rothfuss",
    genero: "Fantasía",
    anio: 2007,
    paginas: 662,
    portada: "https://m.media-amazon.com/images/I/91b8fS+hNUL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 11,
    titulo: "La sombra del viento",
    autor: "Carlos Ruiz Zafón",
    genero: "Misterio",
    anio: 2001,
    paginas: 576,
    portada: "https://m.media-amazon.com/images/I/71KkI3yUj4L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 12,
    titulo: "Sapiens",
    autor: "Yuval Noah Harari",
    genero: "Historia",
    anio: 2011,
    paginas: 496,
    portada: "https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 13,
    titulo: "El código Da Vinci",
    autor: "Dan Brown",
    genero: "Misterio",
    anio: 2003,
    paginas: 689,
    portada: "https://m.media-amazon.com/images/I/815WERNsdtL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 14,
    titulo: "Los juegos del hambre",
    autor: "Suzanne Collins",
    genero: "Distopía",
    anio: 2008,
    paginas: 374,
    portada: "https://m.media-amazon.com/images/I/61I24wOsn8L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 15,
    titulo: "El alquimista",
    autor: "Paulo Coelho",
    genero: "Ficción",
    anio: 1988,
    paginas: 208,
    portada: "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 16,
    titulo: "It",
    autor: "Stephen King",
    genero: "Terror",
    anio: 1986,
    paginas: 1138,
    portada: "https://m.media-amazon.com/images/I/71d5F0g1aEL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 17,
    titulo: "Drácula",
    autor: "Bram Stoker",
    genero: "Terror",
    anio: 1897,
    paginas: 418,
    portada: "https://m.media-amazon.com/images/I/81zN5aV+uTL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 18,
    titulo: "El retrato de Dorian Gray",
    autor: "Oscar Wilde",
    genero: "Ficción",
    anio: 1890,
    paginas: 254,
    portada: "https://m.media-amazon.com/images/I/71L2tI792bL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 19,
    titulo: "Viaje al centro de la Tierra",
    autor: "Julio Verne",
    genero: "Aventura",
    anio: 1864,
    paginas: 384,
    portada: "https://m.media-amazon.com/images/I/81M6bLgYQ0L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 20,
    titulo: "Fahrenheit 451",
    autor: "Ray Bradbury",
    genero: "Distopía",
    anio: 1953,
    paginas: 256,
    portada: "https://m.media-amazon.com/images/I/61N8q7Qn0ZL._AC_UF1000,1000_QL80_.jpg"
  }
]
