import { baseUrl } from "@/constants/url";
import { modalState, movieState } from "@/states/State";
import { Movie } from "@/typings";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { useRecoilState } from 'recoil';

interface props {
  netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: props) {
  const [movies, setMovies] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  useEffect(() => {
    setTimeout(() => {
      setMovies(
        netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
      );
    }, 1000);
  }, [netflixOriginals]);

  return (
    <>
    {
      movies ? (<>
      <div className="flex flex-col py-16 space-y-2 mb-10 md:justify-end md:space-y-4 lg:h-[85vh] lg:pb-12 ">
      <figure className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
        <img
          src={`${baseUrl}${movies?.backdrop_path || movies?.poster_path}`}
          alt=""
          className="h-full -z-10 w-full object-cover"
        />
      </figure>

      <h1 className="font-bold cursor-default text-2xl md:text-4xl mb-4 lg:text-7xl">
        {movies?.title || movies?.name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-xl opacity-80 hover:opacity-100 transition duration-500 cursor-default md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movies?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="w-4 h-4 text-black md:h-7 md:w-7" />
          Play
        </button>
        <button className="bannerButton bg-[gray]/80" onClick={() => {setShowModal(true); setCurrentMovie(movies)}}>
          More Info
          <BsInfoCircle className="w-4 h-4 text-black md:h-7 md:w-7" />
        </button>
      </div>
    </div>
      </>) : <div className="h-20"></div>
    }
    
    </>
    
  );
}

export default Banner;
