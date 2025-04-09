import React from 'react'

const StatsComponent = () => {
    const dataofStats = [
        {count : "5k" , label : "Active Students"},
        {count : "10+" , label : "Mentors"},
        {count : "200+" , label : "Courses"},
        {count : "50+" , label : "Awards"},
    ]
  return (
    <section className="bg-richblack-600 h-48 flex items-center  justify-evenly">
        <div className="flex gap-x-56">
            {dataofStats.map((data, index) => (
            <div key={index} className="flex flex-col items-center text-white">
                <h1 className="text-[24px] font-bold">{data.count}</h1>
                <p>{data.label}</p>
            </div>
            ))}
        </div>
    </section>
  )
}

export default StatsComponent
