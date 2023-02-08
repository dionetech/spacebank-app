import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";
import { errorToast, successToast } from "../../config";

const ProfileSettingsModal = ({ openModal, cycleOpenModal }) => {

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState();
    const [dob, setDob] = useState();
    const [address, setAddress] = useState();
    const [processing, setProcessing] = useState(false);

    const updateProfileSettings = (e) => {
        e.preventDefault();
        setProcessing(true);
        console.log(firstName, lastName, email, phone, gender, dob, address);
        setProcessing(false);
    }

    return (
        <AnimatePresence>
            { openModal && (
                <motion.div
                    className="fixed-top customBackdrop logoutBackdrop"
                    onClick={cycleOpenModal}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0 }}
                >
                    <motion.div onClick={(e) => {e.stopPropagation();}} className="customModal settingsModal">
                        <div className="modalContent">
                            <form onSubmit={updateProfileSettings}>
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="form-group">
                                            <label
                                                htmlFor="spacebankFName"
                                                className="customLabel"
                                            >First name</label>
                                            <input
                                                id="spacebankFName"
                                                name="spacebankFName"
                                                type="text"
                                                required={true}
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="form-control customInput appInput"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-xl-6">
                                        <div className="form-group">
                                            <label
                                                htmlFor="spacebankLName"
                                                className="customLabel"
                                            >Last name</label>
                                            <input
                                                id="spacebankLName"
                                                name="spacebankLName"
                                                type="text"
                                                required={true}
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="form-control customInput appInput"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-xl-6">
                                        <div className="form-group">
                                            <label
                                                htmlFor="spacebankEmail"
                                                className="customLabel"
                                            >Email address</label>
                                            <input
                                                id="spacebankEmail"
                                                name="spacebankEmail"
                                                type="text"
                                                required={true}
                                                value={email}
                                                disabled={true}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="form-control customInput appInput"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-xl-6">
                                        <div className="form-group">
                                            <label
                                                htmlFor="spacebankNumber"
                                                className="customLabel"
                                            >Phone number</label>
                                            <input
                                                id="spacebankNumber"
                                                name="spacebankNumber"
                                                type="number"
                                                required={true}
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="form-control customInput appInput"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-xl-6">
                                        <div className="customSelectField">
                                            <label
                                                htmlFor="spacebankGender"
                                                className="customLabel"
                                            >Gender</label>
                                            <div
                                                className="customSelectFieldContent"
                                                id="spacebankGender"
                                            >
                                                <button
                                                    onClick={() => setGender("male")}
                                                    className={gender==="male"?"active":""}
                                                    type="button"
                                                >Male</button>
                                                <button
                                                    onClick={() => setGender("female")}
                                                    className={gender==="female"?"active":""}
                                                    type="button"
                                                >Female</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-6">
                                        <div className="form-group">
                                            <label
                                                htmlFor="spacebankDob"
                                                className="customLabel"
                                            >Date of birth</label>
                                            <input
                                                id="spacebankDob"
                                                name="spacebankDob"
                                                type="date"
                                                value={dob}
                                                onChange={(e) => setDob(e.target.value)}
                                                className="form-control customInput appInput"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <br />
                                        <div className="form-group">
                                            <label
                                                htmlFor="spacebankAddress"
                                                className="customLabel"
                                            >Residential address</label>
                                            <input
                                                id="spacebankAddress"
                                                name="spacebankAddress"
                                                type="text"
                                                required={true}
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                className="form-control customInput appInput"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="buttonDiv">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: "0.8" }}
                                        type="submit"
                                        className="spin"
                                    >
                                        {processing?<ImSpinner8 />:"Update Profile"}
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ProfileSettingsModal;