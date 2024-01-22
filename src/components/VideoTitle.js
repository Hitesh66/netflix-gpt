import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='pt-[20%] px-12 absolute text-white'>
        <h1 className='text-6xl font-bold'>{title}</h1>
        <p className='py-6 text-lg w-1/2'>{overview}</p>
        <div className=''>
            <button className='text-black bg-white p-4 px-12 text-xl rounded-lg hover:bg-opacity-85'>▶️ Play</button>
            <button className='text-white mx-2 bg-gray-500 p-4 px-12 text-xl bg-opacity-75 rounded-lg'> More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle