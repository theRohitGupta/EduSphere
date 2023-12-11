import React, { useEffect, useState } from 'react'
import { TiStarHalf, TiStar } from "react-icons/ti"

function RatingStars({ Review_Count, Star_Size }) {
    const [ starCount, setStarCount ] = useState({
        full : 0,
        half : 0,
        empty : 0
    })

    useEffect(() => {
        const wholeStars = Math.floor(Review_Count) || 2
        setStarCount({
            full : wholeStars,
            half : Number.isInteger(Review_Count) ? 0 : 1,
            empty : Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars
        })
    }, [Review_Count])
  return (
    <div className=' flex gap-1 text-yellow-50 items-center'>
        {[...new Array(starCount.full)].map((_,i) => {
            return <TiStar key={i} size={Star_Size || 20} className=' text-yellow-100'/>
        })}
        {[...new Array(starCount.half)].map((_,i) => {
            return <TiStarHalf key={i} size={Star_Size || 20} className=' text-yellow-100'/>
        })}
        {[...new Array(starCount.empty)].map((_,i) => {
            return <TiStar key={i} size={Star_Size || 20} className=' text-richblack-700'/>
        })}
    </div>
  )
}

export default RatingStars