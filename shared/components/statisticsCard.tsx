import { CalendarCheck2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { cn } from '../lib/utils';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from './ui/chart';
import { LineChart, CartesianGrid, XAxis, Line } from 'recharts';


const StatisticsCard = ({ title, count }: { title: string, count: number }) => {
    const chartData = [
        { month: "January", appointments: 0 },
        { month: "February", appointments: 0 },
        { month: "March", appointments: 0 },
        { month: "April", appointments: 0 },
        { month: "May", appointments: 0 },
        { month: "June", appointments: 9 },
    ]
    const chartConfig = {
        appointments: {
            label: "appointments",
            color: "var(--chart-1)",
        },
    } satisfies ChartConfig
    return (
        <Card className={cn('mb-10 w-50 md:w-1/3 rounded-md ')}>
            <CardHeader className='max-w-full flex justify-center md:justify-start items-center'>
                <CardTitle className='flex items-center gap-2 text-sm'>
                    <CalendarCheck2 className='w-4' />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col md:flex-row gap-2 justify-start items-end'>
                <h1 className='text-8xl font-extrabold'>{count}</h1>
                <ChartContainer className='w-full h-30 hidden lg:flex' config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}

                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="appointments"
                            type="natural"
                            stroke="currentColor"
                            strokeWidth={2}
                            dot={false}
                            className={cn(
                                title.toLowerCase() == "total" && 'text-blue-500',
                                title.toLowerCase() == "cancelled" && 'text-red-500',
                                title.toLowerCase() == "completed" && 'text-green-500'
                            )}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export { StatisticsCard }