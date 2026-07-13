import { useState, useEffect } from "react"

export const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const hour = currentTime.toLocaleTimeString("id-ID", {
        hour12:false
    }).replace(/\./g, ":");

    const date = currentTime.toLocaleDateString("id-ID", {
        weekday : "short",
        day : "numeric",
        month : "short",
        year : "numeric"
    })

    return (
        <div className="font-semibold flex flex-col items-end">
            <h1 className="text-[#1F2430] text-2xl">
                {hour}
            </h1>

            <p className="text-[#8A93A6] text-xl">
                {date}
            </p>
        </div>
    )
}
