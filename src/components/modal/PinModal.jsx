import { AnimatePresence, motion } from "framer-motion";
import { useReducer, useState, useRef } from "react";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";
import { API_URL, BEARER_TOKEN, errorToast, successToast } from "../../config";

const PinModal = ({ pinModal, cyclePinModal, token, username, amount, description }) => {

    const [processing, setProcessing] = useState(false);
    const [pin, setPin] = useState("");

    const sendFunds = (e) => {
        e.preventDefault();
        setProcessing(true);
        console.log("TTK: ", token);
		axios({
			method: "POST",
			data: {
                token: token,
				pin: parseInt(pin),
                amount: parseInt(amount),
                username: username,
                reason: description,
			},
            url: `${API_URL}/user/p2p-transfer`,
            headers: {
                'Authorization': BEARER_TOKEN,
            },
		})
		.then((res) => {
			setProcessing(false);
            console.log("RES: ", res);
            if (res.data.error){
                errorToast(res.data.message);
                return '';
            }
            successToast(`You just sent ${amount} to ${username}`);
		})
		.catch((error) => {
			setProcessing(false);
            console.log("ERROR: ", error);
			errorToast("An Error Occurred");
		})
    }

    return (
        <AnimatePresence>
            { pinModal && (
                <motion.div
                    className="fixed-top customBackdrop p2pBackdrop"
                    onClick={cyclePinModal}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0 }}
                >
                    <motion.div onClick={(e) => {e.stopPropagation();}} className="customModal transactionModal">
                        <div className="modalContent">
                            <div className="p2pPinTab">
                                <h5>Confirm</h5>
                                <div className="pinEnteredInfo">
                                    <p>
                                        <i>From</i>
                                        <span>NGN Balance</span>
                                    </p>
                                    <p>
                                        <i className="lastChild">Transaction Fee</i>
                                        <span>₦0.00</span>
                                    </p>
                                </div>
                                <div className="pinEnteredInfo">
                                    <p>
                                        <i>To</i>
                                        <span>{username}</span>
                                    </p>
                                    <p>
                                        <i className="lastChild">Amount</i>
                                        <span>₦{amount}.00</span>
                                    </p>
                                </div>
                                <div className="pinEnteredInfo">
                                    <p>
                                        <i>Message</i>
                                        <span>{description}</span>
                                    </p>
                                </div>
                                <div className="enterPinDiv">
                                    <p className="text-center">Please, type in your transaction PIN.</p>
                                    <form onSubmit={sendFunds}>
                                        <div className="row justify-content-center">
                                            <div className="col-xl-10">
                                                <div className="inputFlexGroup">
                                                    <CodeInput
                                                        pin={pin}
                                                        setPin={setPin}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="buttonDiv">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                onClick={cyclePinModal}
                                                type="button"
                                            >Cancel</motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                type="submit"
                                                className="spin"
                                            >{processing?<ImSpinner8 />:"Confirm"}</motion.button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const CodeInput = ({ setPin }) => {
    const itemsRef = useRef([]);
  
    const codeChangeHandler = (event) => {
        const [, codeFieldIndex] = event.target.name.split("-");
        let fieldIntIndex = parseInt(codeFieldIndex, 10);
        setPin((prevState) => prevState + event.target.value);
  
        if (fieldIntIndex < 3) {
            itemsRef.current[fieldIntIndex + 1].focus();
        } else {
            const field = document.querySelector(`Input[name=code-${fieldIntIndex}]`);
            field.blur();
        }
    };
  
    const codeInputFields = new Array(4)
        .fill(0)
        .map((item, index) => (
            <input
                type="text"
                className="form-control customInput appInput"
                ref={(ref) => itemsRef.current.push(ref)}
                name={`code-${index}`}
                key={index}
                onChange={(event) => codeChangeHandler(event)}
                maxLength={1}
                required
            />
        ));
  
    return <>{codeInputFields}</>;
};

export default PinModal;