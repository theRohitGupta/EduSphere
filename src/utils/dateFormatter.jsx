export const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"        
    })
}

export const formattedDateNumeric = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        year: "2-digit"        
    })
}

export const formattedDateTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute : "numeric"
    })
}

export function convertSecondsToDuration(totalSeconds){
    const hours = Math.floor(totalSeconds/3600)
    const minutes = Math.floor((totalSeconds%3600)/60)
    const seconds = Math.floor((totalSeconds%60)%60)

    if(hours > 0) return `${hours}h ${minutes}m`
    else if(minutes > 0) return `${minutes}m ${seconds}s`
    else return `${seconds}s`
}

export function convertSecondsToDurationTime(totalSeconds){
    const hours = Math.floor(totalSeconds/3600)
    const minutes = Math.floor((totalSeconds%3600)/60)
    const seconds = Math.floor((totalSeconds%60)%60)

    if(hours > 0) return `${hours}:${minutes}`
    else if(minutes > 0) return `${minutes}:${seconds}`
    else return `00:${seconds}`
}