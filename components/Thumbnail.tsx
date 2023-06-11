import { modalState, movieState } from "@/states/State";
import { Movie } from "@/typings";
import { DocumentData } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

interface props {
  movie: Movie | DocumentData;
}

function Thumbnail({ movie }: props) {
  const [thumbnail, setThumbnail] = useState(false);
  const thumbnailMount = useRef(true);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  useEffect(() => {
    setTimeout(() => {
      if (thumbnailMount) {
        setThumbnail(true);
      }
    }, 2000);
    return () => {
      thumbnailMount.current = false;
    };
  }, []);

  return (
    <>
      {thumbnail ? (
        <>
          <div onClick={() => {setCurrentMovie(movie) ; setShowModal(true)}} className="h-28 min-w-[180px] relative transition duration-200 cursor-pointer md:h-36 md:min-w-[260px] hover:scale-105 ">
            <img
              src={`https://image.tmdb.org/t/p/w500/${
                movie.backdrop_path || movie.poster_path
              }`}
              className="object-cover rounded-sm md:rounded"
              alt=""
            />
          </div>
        </>
      ) : (
        <>
          <div className="w-screen">
            <div className="skeletonLoading animate-pulse"></div>
          </div>
        </>
      )}
    </>
  );
}

export default Thumbnail;
