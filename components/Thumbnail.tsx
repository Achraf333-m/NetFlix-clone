import { Movie } from "@/typings"
import { useState, useEffect, useRef } from 'react'


interface props {
    movie: Movie
}



function Thumbnail({ movie }:props) {

const [thumbnail, setThumbnail] = useState<HTMLImageElement | null>(null)
const thumbnailMount = useRef(true)

useEffect(() => {
  const image = new Image()
  image.src = movie?.backdrop_path || movie?.poster_path
  setTimeout(() => {
    if (thumbnailMount) {
      setThumbnail(image)
    }
  }, 4000);
  return () => {
    thumbnailMount.current = false
  }
})
    
    
  return (
    <>
    {
      thumbnail ? (<>
        <div className="h-28 min-w-[180px] relative transition duration-200 cursor-pointer md:h-36 md:min-w-[260px] hover:scale-105 ">
            <img src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path || movie?.poster_path}`} className="object-cover rounded-sm md:rounded" alt="" />
        </div>
        </>) :(<>
        <div className="w-screen">
        <div className="skeletonLoading animate-pulse"></div>
        </div>
        </>)
    }
    </>
    
  )
}

export default Thumbnail