import { modalState, movieState } from "@/states/State";
import { Genre, Element } from "@/typings";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { BsVolumeOff, BsVolumeUp } from "react-icons/bs";
import { FaPlay, FaPlus, FaThumbsUp, FaTimes } from "react-icons/fa";
import { MdOutlineThumbsUpDown, MdThumbUp } from "react-icons/md";
import ReactPlayer from "react-player";
import { useRecoilState } from "recoil";

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [genres, setGenres] = useState<Genre[]>();
  const [trailer, setTrailer] = useState("");
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);

  const handleModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!movie) return;

    async function getMovies() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((error) => console.log(error.message));
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setLoading(false);
        setTrailer(data.videos?.results[index]?.key);
      }

      if (data?.genres) {
        setLoading(false);
        setGenres(data.genres);
      }
    }
    getMovies();
  }, [movie]);

  if (loading) {
    return null;
  }

  return (
    <MuiModal
      open={showModal}
      onClose={handleModal}
      className=" !top-10 !left-0 !right-0 !mx-auto rounded-md !max-w-4xl w-full overflow-hidden overflow-y-scroll scrollbar-hide z-50 "
    >
      <>
        <button
          className="absolute buttonModal hover:bg-[#181818] top-5 right-5 bg-[#181818] !z-40 h-9 w-9 border-none"
          onClick={handleModal}
        >
          <FaTimes className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />

          <div className="absolute flex items-center w-full justify-between px-10 bottom-10">
            <div className=" flex space-x-2">
              <button className="bannerButton !px-4 !py-1 bg-white text-black">
                <FaPlay className="w-4 h-4 text-black md:h-5 md:w-5" />
                Play
              </button>
              <button className="buttonModal">
                <FaPlus className="h-5 w-5" />
              </button>
              <button onClick={() => setLiked(!liked)} className="buttonModal">
                {liked ? (
                  <FaThumbsUp className=" text-green-400 h-5 w-5" />
                ) : (
                  <FaThumbsUp className="h-5 w-5" />
                )}
              </button>
            </div>
            <button className="buttonModal" onClick={() => setMuted(!muted)}>
              {muted ? (
                <BsVolumeOff className="w-6 h-6" />
              ) : (
                <BsVolumeUp className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie!.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(', ')}
                </div>

                <div>
                  <span className="text-[gray]">Original language: </span>
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
}

export default Modal;
