import React, { useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { Pie } from 'react-chartjs-2'

Chart.register(...registerables)

function VisualizeStats({courses}) {
    const [currChart, setCurrChart] = useState("students")
    // GENERATE RANDOM COLORS
    const randomColors = (numColors) => {
        const colors = []
        for(let i=0; i < numColors; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
            colors.push(color)
        }
        return colors
    }

    // CREATED DATA FOR CHART STUDENT
    const chartDataForStudents = {
        labels : courses.map((course) => course.courseName),
        datasets : [
            {
                data : courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor : randomColors(courses.length),
            }
        ]
    }

    // CREATED DATA FOR CHART INCOME
    const chartDataForIncome = {
        labels : courses.map((course) => course.courseName),
        datasets : [
            {
                data : courses.map((course) => course.totalAmountGenerated),
                backgroundColor : randomColors(courses.length),
            }
        ]
    }

    // OPTIONS
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 0,
            right: 0,
          },
        },
        plugins: {
          legend: {
            position: 'left',
          },
        },
    }


  return (
    <div className=' flex flex-col gap-3'>
        <p className='text-richblack-5 text-xl font-semibold leading-10'>Visualize</p>
        <div className=' flex gap-4'>
            <button className={` rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "students" ? "bg-richblack-700 text-yellow-50" : "text-yellow-400"}`} onClick={() => setCurrChart("students")}>Students</button>
            <button className={` rounded-sm p-1 px-3 transition-all duration-200 ${currChart === "income" ? "bg-richblack-700 text-yellow-50" : "text-yellow-400"}`} onClick={() => setCurrChart("income")}>Income</button>
        </div>
        <div className=' relative aspect-video mx-auto w-full h-full'>
            <Pie
                data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
                options={options}
            />
        </div>
    </div>
  )
}

export default VisualizeStats