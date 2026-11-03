import React from 'react'

interface SelectProps {
  valor: string
  onChange: (value: string) => void
  categorias: string[]
}

export function ComboboxBasic({ valor, onChange, categorias }: SelectProps) {
  return (
    <select
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer hover:border-slate-400 transition"
      aria-label="Filtrar por género o colección"
    >
      <option value="">Todos los Géneros y Colecciones</option>
      {categorias.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  )
}
