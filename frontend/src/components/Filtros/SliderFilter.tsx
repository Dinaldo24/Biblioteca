import { Slider } from "../ui/slider"

export function FiltroPaginas({ onChange }) {
  return (
    <div className="w-64 mx-4">
      <label className="text-center"> Rango de páginas</label>
      <Slider
        defaultValue={[100, 500]}
        min={50}
        max={1000}
        step={10}
        onValueChange={(value) => onChange(value)} 
      />
    </div>
  )
}
