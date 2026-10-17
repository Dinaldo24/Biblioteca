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
import { Input } from "../components/ui/input"
import type { PropsDetalle } from "../assets/Data"
import { useNavigate } from "react-router-dom"
interface ItemProps {
  item: PropsDetalle
  NumeroTodoAstro: (item: PropsDetalle) => void
}
export function CardDemo({ item, NumeroTodoAstro }: ItemProps) {
  const navigate = useNavigate()
  const ClickMeolvide = () => {

    navigate(`/user/${item.titulo}`)
    // ClickMeolvide()
  }
  return (
    <Card onClick={ClickMeolvide} className="w-full max-w-sm relative  hover:bg-gray-50 duration-200 cursor-pointer">
      <div className="bg-gray-800 h-full w-2  absolute top-0">s</div>
      <CardHeader>
        <CardTitle> {item.titulo}</CardTitle>
        <CardDescription>
          {
            item.paginas
          }
        </CardDescription>
        <CardAction>
          <Button className="bg-black text-white rounded-full h10 w-10 font-bold cursor-pointer">+</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ducimus libero explicabo, tempora velit iure minima perspiciatis sint dolorum enim repellendus alias eveniet commodi ipsum nobis in laborum impedit assumenda?</p>

      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={() => NumeroTodoAstro(item)} className="w-full">
          informacion
        </Button>
      </CardFooter>
    </Card>
  )
}
