import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";
import { API_URL, BEARER_TOKEN, errorToast, successToast, warningToast } from "../../config";

const TrPinModal = ({ pinModal, cyclePinModal, token }) => {

    const [trPin, setTrPin] = useState();
    const [confirmTrPin, setConfirmTrPin] = useState();
    const [activeTab, setActiveTab] = useState("first");

    const confirmDoublePin = (e) => {
        e.preventDefault();
        if (confirmTrPin!==trPin){
            warningToast("Passwords does not match");
            return '';
        }
        setActiveTab("second");
    }

    return (
        <AnimatePresence>
            { pinModal && (
                <motion.div
                    className="fixed-top customBackdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0 }}
                >
                    <motion.div className="customModal trPinModal">
                        <div className="modalContent">
                        {
                            activeTab==="first"?
                            <form onSubmit={confirmDoublePin}>
                                <div className="firstFormDiv">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="spacebankTrPin"
                                                    className="customLabel"
                                                >Transaction pin</label>
                                                <input
                                                    id="spacebankTrPin"
                                                    name="spacebankTrPin"
                                                    type="number"
                                                    required={true}
                                                    value={trPin}
                                                    onChange={(e) => setTrPin(e.target.value)}
                                                    className="form-control customInput appInput"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="spacebankCTrPin"
                                                    className="customLabel"
                                                >Re-Enter Transaction pin</label>
                                                <input
                                                    id="spacebankCTrPin"
                                                    name="spacebankCTrPin"
                                                    type="number"
                                                    required={true}
                                                    value={confirmTrPin}
                                                    onChange={(e) => setConfirmTrPin(e.target.value)}
                                                    className="form-control customInput appInput"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buttonDiv">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: "0.8" }}
                                            type="submit"
                                            className="spin"
                                        >
                                            Proceed
                                            {/* {processing?<ImSpinner8 />:"Save transaction pin"} */}
                                        </motion.button>
                                    </div>
                                </div>
                            </form>:
                            <SecondTab
                                trPin={trPin}
                                token={token}
                                cyclePinModal={cyclePinModal}
                            />
                        }
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const SecondTab = ({ token, trPin, cyclePinModal }) => {

    const [password, setPassword] = useState("");
    const [processing, setProcessing] = useState(false);

    const saveTrPin = (e) => {
        e.preventDefault();
        setProcessing(true);

        console.log(token, trPin, password);
        
        axios({
            method: "POST",
            url: `${API_URL}/user/change-pin`,
            data: {
                token, password, pin: trPin
            },
            headers: {
                'Authorization': BEARER_TOKEN,
            },
        })
        .then((res) => {
            setProcessing(false);
            if (res.data.error){
                errorToast(res.data.message);
                return '';
            }
            successToast("Transaction pin successfully changed");
            cyclePinModal();
        })
        .catch((error) => {
            setProcessing(false);
            errorToast("An error occured, try again");
        })
    }

    return (
        <form onSubmit={saveTrPin}>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <label
                            htmlFor="spacebankPassword"
                            className="customLabel"
                        >Enter Password</label>
                        <input
                            id="spacebankPassword"
                            name="spacebankPassword"
                            type="text"
                            required={true}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control customInput appInput"
                        />
                    </div>
                </div>
            </div>
            <div className="buttonDiv">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: "0.8" }}
                    type="submit"
                    className="spin"
                    disabled={processing}
                >
                    {processing?<ImSpinner8 />:"Save Transaction pin"}
                </motion.button>
            </div>
        </form>
    )
}

export default TrPinModal;