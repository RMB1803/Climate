import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface GeolocationData {
    coordinates: Coordinates | null
    error: string | null
    isLoading: boolean
}

export function useGeolocation() {
    const [locationData, setLocationData] = useState<GeolocationData>({
        coordinates: null,
        error: null,
        isLoading: true
    })

    const getLocation = () => {
        setLocationData((prev) => ({...prev, isLoading: true, error: null}))

        if(!navigator.geolocation) {
            setLocationData({
                coordinates: null,
                error: 'Geolocation is not supported by your browser',
                isLoading: false
            })
            return
        }

        navigator.geolocation.getCurrentPosition((position) => {
            setLocationData({
                coordinates: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                },
                error: null,
                isLoading: false
            })
        }, (error) => {
            let errormsg: string

            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errormsg = "Location Permission denied, please enable location access"
                    break
                case error.POSITION_UNAVAILABLE:
                    errormsg = "Location information is unavailable"
                    break
                case error.TIMEOUT:
                    errormsg = "Request timed out"
                    break
                default: 
                    errormsg = "An error occurred while retrieving your location"
            }

            setLocationData({
                coordinates: null,
                error: errormsg,
                isLoading: false
            })
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        })
    }

    useEffect(() => {
        getLocation()
    }, [])

    return {
        ...locationData,
        getLocation
    }
}

