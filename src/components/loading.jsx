import { LoaderCircle } from "lucide-react"

export const Loading = () => {
    return(
        <div className="flex gap-2.5 justify-center items-center">
            <LoaderCircle className="animate-spin"/>
            <p>Loading</p>
        </div>
    )
}