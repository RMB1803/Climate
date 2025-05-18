import type { ForecastData } from "@/api/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import {Line, LineChart, ResponsiveContainer, XAxis} from 'recharts'
import {format} from 'date-fns'

interface HourlyTempProps {
    data: ForecastData
}

const HourlyTemp = ({data}: HourlyTempProps) => {

  const chartData = data.list.slice(0,8).map((item) => ({
    time: format(new Date(item.dt*1000), 'ha'),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like)
  }))

  return (
    <Card className="flex-1">
        <CardHeader>
            <CardTitle>Today's Temperature</CardTitle>
        </CardHeader>

        <CardContent>
            <div className="h-[200px] w-full">
                <ResponsiveContainer width={"100%"} height={"100%"}>
                    <LineChart data={chartData}>
                        <XAxis 
                        dataKey="time"
                        
                        
                        />                        
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
  )
}

export default HourlyTemp
