
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../components/ui/combobox"

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const
import   {libros } from "../assets/Data"
interface ChangueEvent {

  changue: () => void

}

export function ComboboxBasic({ changue }: ChangueEvent) {    
   const reducerMiData = libros.reduce((acum , item)  =>{
          if ( !acum.includes(item.genero))  {
                  acum.push(item.genero)
          }        
          return acum 
   },  [] as string []) 
   const datosAdd =  [...reducerMiData, 'todos']


  return (
    <Combobox   onValueChange={ changue} items={datosAdd}>
      <ComboboxInput placeholder="filtro por Genero" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
