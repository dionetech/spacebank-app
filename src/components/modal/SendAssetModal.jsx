import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";
import { API_URL, BEARER_TOKEN, errorToast, successToast } from "../../config";

const SendAssetModal = ({ assetModal, cycleAssetModal, token }) => {

    const [activeTab, setActiveTab] = useState("initial");
    const [asset, setAsset] = useState("bnb");
    const [amount, setAmount] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [processing, setProcessing] = useState(false);

    const processTransaction = (e) => {
        e.preventDefault();
        setProcessing(true);

        console.log(amount, asset, walletAddress);

        setProcessing(false);

        // setTimeout(() => {
        //     setProcessing(false);
        //     setActiveTab("pin");
        // }, 2000);
    }

    const closeModal = () => {
        setActiveTab("initial");
        setAmount("");
        setWalletAddress("");
        setProcessing(false);
        cycleAssetModal();
    }

    return (
        <AnimatePresence>
            { assetModal && (
                <motion.div
                    className="fixed-top customBackdrop p2pBackdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0 }}
                >
                    <motion.div className="customModal transactionModal">
                        <div className="modalContent">
                        {
                            activeTab==="initial"?
                            <>
                            <h5 className="walletBalance">Balance: 10000000000<strong>({asset.toUpperCase()})</strong></h5>
                            <form onSubmit={processTransaction}>
                                <div className="row">
                                    <div className="col-md-6 modalFormCol">
                                        <div className="form-group">
                                            <label
                                                htmlFor="spacebankAmount"
                                                className="customLabel"
                                            >Amount ({asset.toUpperCase()})</label>
                                            <input
                                                id="spacebankAmount"
                                                name="spacebankAmount"
                                                type="number"
                                                required={true}
                                                placeholder="0.05"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className="form-control customInput appInput"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6 modalFormCol">
                                        <div className="form-group">
                                            <label
                                                htmlFor="spacebankAsset"
                                                className="customLabel"
                                            >Asset ({asset.toUpperCase()})</label>
                                            <select
                                                id="spacebankAsset"
                                                name="spacebankAsset"
                                                onChange={(e) => setAsset(e.target.value)}
                                                className="form-control selectDropdown"
                                                defaultValue={asset}
                                            >
                                                <option value="bnb">BNB</option>
                                                <option value="wbnb">WBNB</option>
                                                <option value="usdt">USDT</option>
                                                <option value="busd">BUSD</option>
                                                <option value="usdc">USDC</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <label
                                                htmlFor="spacebankWalletAddress"
                                                className="customLabel"
                                            >Address</label>
                                            <input
                                                id="spacebankWalletAddress"
                                                name="spacebankWalletAddress"
                                                type="text"
                                                placeholder="0xC5208D632e3D6F5a527F9cE18e212fe2CD8719Cb"
                                                required={true}
                                                value={walletAddress}
                                                onChange={(e) => setWalletAddress(e.target.value)}
                                                className="form-control customInput appInput"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="buttonDiv">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        onClick={cycleAssetModal}
                                        type="button"
                                    >Cancel</motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: "0.8" }}
                                        type="submit"
                                        className="spin"
                                    >
                                        {processing?<ImSpinner8 />:"Proceed"}
                                    </motion.button>
                                </div>
                            </form>
                            </>:
                            <EnterPinTab
                                username={username}
                                amount={amount}
                                description={description}
                                cycleOpenP2pModal={cycleOpenP2pModal}
                                token={token}
                            />
                        }
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}


const EnterPinTab = ({ amount, description, username, cycleOpenP2pModal, token }) => {

    const [pin, setPin] = useState("");
    const [processing, setProcessing] = useState(false);

    const sendFunds = (e) => {
        e.preventDefault();
        setProcessing(true);
        console.log(username, amount, description, pin);
		axios({
			method: "POST",
			data: {
                token: token,
				pin: pin,
                amount: amount,
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
		})
		.catch((error) => {
			setProcessing(false);
            console.log("ERROR: ", error);
			errorToast("An Error Occurred");
		})
    }

    return (
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
                        <div className="col-xl-7">
                            <div className="form-group">
                                <input
                                    id="spacebankTrPin"
                                    name="spacebankTrPin"
                                    type="text"
                                    required={true}
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    className="form-control customInput appInput"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="buttonDiv">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={cycleOpenP2pModal}
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
    )
}


export default SendAssetModal;