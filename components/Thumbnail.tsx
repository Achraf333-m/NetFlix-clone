import { Movie } from "@/typings"
import { useState, useEffect } from 'react'


interface props {
    movie: Movie
}

function Thumbnail({ movie }:props) {


    
    
  return (
    <div className="h-28 min-w-[180px] relative transition duration-200 cursor-pointer md:h-36 md:min-w-[260px] hover:scale-105 ">
        <img src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path || movie?.poster_path}`} className="object-cover rounded-sm md:rounded" alt="" />
    </div>
  )
}

export default Thumbnail