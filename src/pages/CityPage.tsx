import { CurrentWeather } from '@/components/component/CurrentWeather'
import FavoriteButton from '@/components/component/FavoriteButton'
import HourlyTemp from '@/components/component/HourlyTemp'
import LoadingSkeleton from '@/components/component/LoadingSkeleton'
import WeatherDetails from '@/components/component/WeatherDetails'
import WeatherForecast from '@/components/component/WeatherForecast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useForecast, useWeather } from '@/hooks/useWeather'
import { AlertTriangle } from 'lucide-react'
import { useParams, useSearchParams } from 'react-router-dom'

const CityPage = () => {

  const [searchParams] = useSearchParams()

  const params = useParams()

  const lat = parseFloat(searchParams.get("lat") || "0")
  const lon = parseFloat(searchParams.get("lon") || "0")

  const coordinates = {lat, lon}

  const weatherQuery = useWeather(coordinates)
  const forecastQuery = useForecast(coordinates)

  if(weatherQuery.error || forecastQuery.error) {
    return(
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          Failed to fetch weather data, please try again.
        </AlertDescription>
      </Alert>
    )
  }

  if(!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <LoadingSkeleton />
  }

  return (
    <div className='space-y-4'>
      {/* Favouritie cities */}

      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>
          {params.cityName}, {weatherQuery.data.sys.country}
        </h1>

        <FavoriteButton data={{...weatherQuery.data, name: params.cityName}}/>
      </div>

      <div className='grid gap-6'>
        <div className='flex flex-col lg:flex-row gap-4'>

          <CurrentWeather data={weatherQuery.data}/>
          <HourlyTemp data={forecastQuery.data}/>

        </div>

        <div className='grid gap-4 md:grid-cols-2 items-start'>
          <div>
          <WeatherDetails data={weatherQuery.data}/>
          </div>
          {/*forecast */}
          <WeatherForecast data={forecastQuery.data} />

        </div>
      </div>
    </div>
  )
}

export default CityPage
