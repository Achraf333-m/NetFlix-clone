import { modalState } from "@/states/State";
import MuiModal from "@mui/material/Modal";
import { FaTimes } from "react-icons/fa";
import {useRecoilState } from 'recoil'

function Modal() {

    const [showModal, setShowModal] = useRecoilState(modalState)

    const handleModal = () => {
        setShowModal(false)
    }

  return (
    <MuiModal open={showModal} onClose={handleModal} >
      <>
        <button className="absolute buttonModal hover:bg-[#181818] top-5 right-5 bg-[#181818] !z-40 h-9 w-9 border-none" onClick={handleModal}>
            <FaTimes className="h-6 w-6" />
        </button>
      </>
    </MuiModal>
  );
}

export default Modal;
