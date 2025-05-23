import { CurrentWeather } from '@/components/component/CurrentWeather'
import FavoriteCities from '@/components/component/FavoriteCities'
import HourlyTemp from '@/components/component/HourlyTemp'
import LoadingSkeleton from '@/components/component/LoadingSkeleton'
import WeatherDetails from '@/components/component/WeatherDetails'
import WeatherForecast from '@/components/component/WeatherForecast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useForecast, useReverseGeoCode, useWeather } from '@/hooks/useWeather'
import { AlertTriangle, MapPin, RefreshCw } from 'lucide-react'

const WeatherDashboard = () => {

  const {coordinates, error, isLoading, getLocation} = useGeolocation()
  
  const weatherQuery = useWeather(coordinates)
  const forecastQuery = useForecast(coordinates)
  const locationQuery = useReverseGeoCode(coordinates)

  console.log(locationQuery);
  

  const handleRefresh = () => {
    getLocation()

    if(coordinates) {
      weatherQuery.refetch()
      forecastQuery.refetch()
      locationQuery.refetch()
    }
  }

  if(isLoading) {
    return <LoadingSkeleton />
  }

  if(error) {
    return(
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>{error}</p>

          <Button onClick={getLocation} variant={'outline'} className='w-fit '>
            <MapPin className='mr-2 h-4 w-4'/>
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if(!coordinates) {
    return(
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>Please enable location access to see your Local Weather.</p>

          <Button onClick={getLocation} variant={'outline'} className='w-fit '>
            <MapPin className='mr-2 h-4 w-4'/>
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  const locationName = locationQuery.data?.[0]

  if(weatherQuery.error || forecastQuery.error) {
    return(
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>Failed to fetch weather data, please try again.</p>

          <Button onClick={getLocation} variant={'outline'} className='w-fit '>
            <RefreshCw className='mr-2 h-4 w-4'/>
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if(!weatherQuery.data || !forecastQuery.data) {
    return <LoadingSkeleton />
  }

  return (
    <div className='space-y-4'>
      <FavoriteCities />

      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>
          My Location
        </h1>

        <Button variant={'outline'} size={'icon'} onClick={handleRefresh} disabled={weatherQuery.isFetching || forecastQuery.isFetching}>
          <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : " "}`}/>
        </Button>
      </div>

      <div className='grid gap-6'>
        <div className='flex flex-col lg:flex-row gap-4'>

          <CurrentWeather data={weatherQuery.data} locationName={locationName}/>
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

export default WeatherDashboard
