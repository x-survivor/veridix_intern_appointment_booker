import { CalendarCheck2, CalendarX, Calendar, CalendarDays } from 'lucide-react';
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { cn } from '../lib/utils';


const StatisticsCard = ({ title, count }: { title: string, count: number }) => {

    return (
        <Card className={cn('w-full lg:w-1/3 rounded-md font-sans')}>
            <CardHeader className='w-full flex justify-between md:justify-between items-center'>
                <CardTitle className='flex items-center gap-2 text-lg'>
                    <span className={cn("text-foreground p-1 px-2 rounded-sm border border-foreground mr-2")}>
                        {title == "Total" && <Calendar className='w-5'/>}
                        {title == "Booked" && <CalendarDays className='w-5' />}
                        {title == "Cancelled" && <CalendarX className='w-5' />}
                        {title == "Completed" && <CalendarCheck2 className='w-5' />}
                    </span>
                    {title}
                </CardTitle>
                <CardTitle className='text-4xl'>
                    {count}
                </CardTitle>
            </CardHeader>
        </Card>
    )
}

export { StatisticsCard }