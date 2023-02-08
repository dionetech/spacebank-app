import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";
import { errorToast, successToast } from "../../config";

const LogoutModal = ({ openModal, cycleOpenModal }) => {
    
    const [processingLogout, setProcessingLogout] = useState(false);

    const logoutUser = (e) => {
        e.preventDefault();
        setProcessingLogout(true);
        axios({
            method: "GET",
            url: "/api/auth/logout",
        })
        .then(() => {
            setProcessingLogout(false);
            successToast("Successfully logged out");
            cycleOpenModal();
        })
        .catch(() => {
            setProcessingLogout(false);
            errorToast("Couldn't logout, an error occured");
            cycleOpenModal();
        })
    }

    return (
        <AnimatePresence>
            { openModal && (
                <motion.div
                    className="fixed-top customBackdrop"
                    onClick={cycleOpenModal}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0 }}
                >
                    <motion.div onClick={(e) => {e.stopPropagation();}} className="customModal logoutModal">
                        <div className="modalContent">
                            <h5>Are you sure you want to log out?</h5>
                            <div className="buttonDiv">
                                <button onClick={cycleOpenModal}>No</button>
                                <button
                                    onClick={logoutUser}
                                    disabled={processingLogout}
                                    className="spin"
                                >{processingLogout?<ImSpinner8 />:"Yes"}</button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default LogoutModal;