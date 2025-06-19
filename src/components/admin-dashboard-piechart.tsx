import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "#6366f1" },
  { browser: "safari", visitors: 200, fill: "#93c5fd" },
  { browser: "firefox", visitors: 187, fill: "#86efac" },
  { browser: "edge", visitors: 173, fill: "#4b5563" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

const CustomLabel = (props: any) => {
  const { cx, cy } = props.viewBox;
  
  // Adjust these values to fine-tune the position
  const labelX = cx + -75;
  const labelY = cy + 45;
  
  return (
    <g>
      <rect
        x={labelX - 15}
        y={labelY - 15}
        width="60"
        height="30"
        rx="6"
        ry="6"
        fill="#4b5563"
      />
      <text
        x={labelX + 15}
        y={labelY}
        textAnchor="middle"
        dominantBaseline="middle"
        className="font-montserrat font-semibold"
        fill="#ffffff"
      >
        50%
      </text>
    </g>
  );
};

export function AdminProfilePieChart() {
  return (
    <Card className="flex flex-col max-w-xs border-none shadow-none">
      <CardHeader className="items-center pb-0">
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-64"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              cornerRadius={40}
              startAngle={180}
              endAngle={-180}
              stroke="#FFFFFF"
              strokeWidth={6}
              paddingAngle={-15}
            >
              <Label
                className="text-xl font-montserrat font-semibold"
                fill="#000"
                value="Pending"
                position="center"
              />
              <Label
                content={(props) => <CustomLabel {...props} />}
                position="insideBottomLeft"
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-semibold font-montserrat text-lg leading-none">
          Profile Completed
        </div>
      </CardFooter>
    </Card>
  )
}