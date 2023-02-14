import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";
import { API_URL, BEARER_TOKEN, errorToast, successToast } from "../../config";
import { useEffect } from "react";

const SendAssetModal = ({ activeUser, assetModal, cycleAssetModal, walletBalance,
    token, getBalanceOfToken, currencyList, sendETH, sendTOKEN }) => {

    const [asset, setAsset] = useState("bnb");
    const [amount, setAmount] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [processing, setProcessing] = useState(false);

    const [sendTokenBal, setSendTokenBal] = useState(0);
    const [sendToken, setSendToken] = useState("");
    const [sendTokenName, setSendTokenName] = useState("BNB");

    useEffect(() => {
        currencyList.map((curr) => {
            if (curr.name.toLowerCase()===asset){
                setSendToken(curr.contract);
                setSendTokenName(curr.name.toUpperCase());
                if(curr.contract != ""){
                    getBalanceOfToken(curr.contract, activeUser.user.wallet.address).then(( bal ) => { 
                        console.log("SAM BAL: ", bal);
                        setSendTokenBal(bal);
                    })
                }else{
                    console.log(walletBalance)
                    setSendTokenBal(walletBalance);
                }
            }
        })
    }, [asset])

    const processTransaction = (e) => {
        e.preventDefault();
        setProcessing(true);

        if (sendToken===""){
            sendETH(activeUser.user.wallet.address, walletAddress, amount, activeUser.user.wallet.privateKey);
        }else{
            sendTOKEN(activeUser.user.wallet.address, walletAddress, amount, sendToken, activeUser.user.wallet.privateKey);
        }
        setProcessing(false);
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
                            <h5 className="walletBalance">Balance: {sendTokenBal}<strong>({asset.toUpperCase()})</strong></h5>
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
                                            {
                                                currencyList.map((curr, index) => {
                                                    return (
                                                        <option key={index} value={curr.name.toLowerCase()}>{curr.name}</option>
                                                    )
                                                })
                                            }
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
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default SendAssetModal;