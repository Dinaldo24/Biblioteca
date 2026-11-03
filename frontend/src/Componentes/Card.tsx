import { Button } from "../components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import type { PropsDetalle } from "../assets/Data"
import { obtenerPortada } from "../assets/Data"
import { useNavigate } from "react-router-dom"

interface ItemProps {
  item: PropsDetalle
  NumeroTodoAstro: (item: PropsDetalle) => void
}

export function CardDemo({ item, NumeroTodoAstro }: ItemProps) {
  const navigate = useNavigate()

  const verDetalle = () => {
    NumeroTodoAstro(item)
    navigate(`/user/${encodeURIComponent(item.titulo)}`)
  }

  const portadaUrl = obtenerPortada(item)

  return (
    <Card 
      onClick={verDetalle} 
      className="w-full max-w-sm overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200 bg-white flex flex-col justify-between group">
      
      {/* Portada del libro */}
      <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
        <img 
          src={portadaUrl} 
          alt={item.titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop"
          }}
        />
        <span className="absolute top-3 right-3 bg-indigo-900/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
          {item.genero}
        </span>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <div>
            <CardTitle className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {item.titulo}
            </CardTitle>
            <CardDescription className="text-sm font-medium text-slate-600 mt-1">
              Por {item.autor}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-2 text-xs text-slate-500 flex justify-between items-center border-t border-slate-100 mt-2">
        <span>📅 Año: {item.anio}</span>
        <span>📖 {item.paginas} páginas</span>
      </CardContent>

      <CardFooter className="pt-2 pb-4">
        <Button 
          onClick={(e) => {
            e.stopPropagation()
            verDetalle()
          }} 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer font-medium">
          Ver Detalles
        </Button>
      </CardFooter>
    </Card>
  )
}
