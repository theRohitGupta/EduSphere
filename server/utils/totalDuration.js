function convertSecondsToDuration(totalSeconds){
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

function totalDuration(courseDetails){
    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((section) => {
        section.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
        })
    })

    return convertSecondsToDuration(totalDurationInSeconds)
}

module.exports = { totalDuration , convertSecondsToDuration}