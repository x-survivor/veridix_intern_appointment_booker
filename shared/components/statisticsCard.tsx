import { CalendarCheck2 } from 'lucide-react';
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { cn } from '../lib/utils';


const StatisticsCard = ({ title, count }: { title: string, count: number }) => {

    return (
        <Card className={cn('lg:mb-10 w-full lg:w-1/3 rounded-md')}>
            <CardHeader className='w-full flex justify-between md:justify-between items-center'>
                <CardTitle className='flex items-center gap-2 text-lg'>
                    <span className={cn("text-gray-800 p-1 px-2 rounded-sm border border-gray-800 mr-2")}>
                        <CalendarCheck2 className='w-4' />
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