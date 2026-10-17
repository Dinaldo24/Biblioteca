
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, type ChartConfig  ,  ChartTooltip, ChartTooltipContent  } from "../components/ui/chart" 


export const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "Jule", desktop: 214, mobile: 140 },
  { month: "August", desktop: 214, mobile: 140 },
] 


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function ChartExample() {
  return (
    <div className="flex items-center justify-center  min-h-[90vh]">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-3xl mx-auto border p-2">
        <BarChart accessibilityLayer data={chartData}>
          <XAxis
            dataKey={'month'}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          >
          </XAxis> 
          <ChartTooltip content={<ChartTooltipContent></ChartTooltipContent>} ></ChartTooltip>
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>


    </div>

  )
}
