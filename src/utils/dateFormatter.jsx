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
    let hours = Math.floor(totalSeconds/3600)
    let minutes = Math.floor((totalSeconds%3600)/60)
    let seconds = Math.floor((totalSeconds%60)%60)

    hours = hours >= 0 && hours < 10 ? `0${hours}` : `${hours}`  
    minutes = minutes >= 0 && minutes < 10 ? `0${minutes}` : `${minutes}`  
    seconds = seconds >= 0 && seconds < 10 ? `0${seconds}` : `${seconds}`

    if(hours > 0) return `${hours}h ${minutes}m`
    else if(minutes > 0) return `${minutes}m ${seconds}s`
    else return `${seconds}s`
}

export function convertSecondsToDurationTime(totalSeconds){
    let hours = Math.floor(totalSeconds/3600)
    let minutes = Math.floor((totalSeconds%3600)/60)
    let seconds = Math.floor((totalSeconds%60)%60)

    hours = hours >= 0 && hours < 10 ? `0${hours}` : `${hours}`  
    minutes = minutes >= 0 && minutes < 10 ? `0${minutes}` : `${minutes}`  
    seconds = seconds >= 0 && seconds < 10 ? `0${seconds}` : `${seconds}`  

    if(hours > 0) return `${hours}:${minutes}`
    else if(minutes > 0) return `${minutes}:${seconds}`
    else return `00:${seconds}`
}