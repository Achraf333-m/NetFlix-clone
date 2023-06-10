import { modalState, movieState } from "@/states/State";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useRecoilState } from "recoil";




function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState)
  const [db, setDb] = useState()
  
  


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
      .then((response) => response.json()).catch(error => console.log(error.message))

     setDb(data)
    }

    getMovies()

  }, [movie]);

  if (showModal) {

    console.log(db)
  }
  

  return (
    <MuiModal open={showModal} onClose={handleModal}>
      <>
        <button
          className="absolute buttonModal hover:bg-[#181818] top-5 right-5 bg-[#181818] !z-40 h-9 w-9 border-none"
          onClick={handleModal}
        >
          <FaTimes className="h-6 w-6" />
        </button>
      </>
    </MuiModal>
  );
}

export default Modal;
