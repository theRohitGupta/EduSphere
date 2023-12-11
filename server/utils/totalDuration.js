function convertSecondsToDuration(totalSeconds){
    const hours = Math.floor(totalSeconds/3600)
    const minutes = Math.floor((totalSeconds%3600)/60)
    const seconds = Math.floor((totalSeconds%60)%60)

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