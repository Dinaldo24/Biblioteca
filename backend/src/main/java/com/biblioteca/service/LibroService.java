package com.biblioteca.service;

import com.biblioteca.model.Libro;
import com.biblioteca.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LibroService {

    private final LibroRepository libroRepository;

    @Autowired
    public LibroService(LibroRepository libroRepository) {
        this.libroRepository = libroRepository;
    }

    public List<Libro> obtenerTodos() {
        return libroRepository.findAll();
    }

    public Optional<Libro> obtenerPorId(Long id) {
        return libroRepository.findById(id);
    }

    public Libro guardar(Libro libro) {
        return libroRepository.save(libro);
    }

    public Optional<Libro> actualizar(Long id, Libro datosActualizados) {
        return libroRepository.findById(id).map(libroExistente -> {
            libroExistente.setTitulo(datosActualizados.getTitulo());
            libroExistente.setAutor(datosActualizados.getAutor());
            libroExistente.setGenero(datosActualizados.getGenero());
            libroExistente.setAnio(datosActualizados.getAnio());
            libroExistente.setPaginas(datosActualizados.getPaginas());
            if (datosActualizados.getPortada() != null && !datosActualizados.getPortada().isBlank()) {
                libroExistente.setPortada(datosActualizados.getPortada());
            }
            return libroRepository.save(libroExistente);
        });
    }

    public boolean eliminar(Long id) {
        if (libroRepository.existsById(id)) {
            libroRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Libro> buscarPorTitulo(String titulo) {
        return libroRepository.findByTituloContainingIgnoreCase(titulo);
    }

    public List<Libro> buscarPorGenero(String genero) {
        return libroRepository.findByGeneroIgnoreCase(genero);
    }
}
