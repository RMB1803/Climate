import type { WeatherData } from "@/api/types"
import { useFavorites } from "@/hooks/useFavorites"
import { Button } from "../ui/button"
import { Star } from "lucide-react"
import { toast } from "sonner"

interface FavoriteButtonProps {
    data: WeatherData
}

const FavoriteButton = ({data}: FavoriteButtonProps) => {

    const {addToFavorite, isFavorite, removeFavorite} = useFavorites()

    const isCurrentlyFav = isFavorite(data.coord.lat, data.coord.lon)

    const handleToggleFav = () => {
        if (isCurrentlyFav) {
            removeFavorite.mutate(`${data.coord.lat} - ${data.coord.lon}`)

            toast.error(`Removed ${data.name} from Favorites`)
        } else {
            addToFavorite.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country
            })
            toast.success(`Added ${data.name} to Favorites`)
        }
    }

    return(
        <Button variant={isCurrentlyFav ? "default" : "outline"} size={"icon"} 
        className={isCurrentlyFav ? "bg-yellow-500 hover:bg-yellow-600" : ""}
        onClick={handleToggleFav}
        >
            <Star 
            className={`h-4 w-4 ${isCurrentlyFav ? "fill-current" : ""}`}
            />
        </Button>
    )
}

export default FavoriteButton
