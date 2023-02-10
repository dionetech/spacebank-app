import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { motion } from "framer-motion";
import { API_URL, BEARER_TOKEN } from "../../config";
import axios from "axios";
import ProtectedLayout from "../../layout/ProtectedLayout";

const BuyAirtime = ({ activeUser, token, removeToken }) => {

    const [amount, setAmount] = useState("");
    const [network, setNetwork] = useState("");
    const [phone, setPhone] = useState("");
    const [processing, setProcessing] = useState(false);

    const buyAirtime = (e) => {
        e.preventDefault();
        setProcessing(true);
        console.log(network, phone, amount);
        setProcessing(false)
    }

    return (
        <ProtectedLayout
            navTitle="Buy Airtime"
            user={activeUser}
            removeToken={removeToken}
        >
            <section className="transactionSection">
                <div className="newTransferDiv">
                    <div className="newTransferSubTab">
                        <div className="row justify-content-center">
                            <div className="col-xl-8">
                                <form onSubmit={buyAirtime}>
                                    <div className="row">
                                        <div className="col-6 modalFormCol">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="spacebankFName"
                                                    className="customLabel"
                                                >Amount (₦)</label>
                                                <input
                                                    id="spacebankAmount"
                                                    name="spacebankAmount"
                                                    type="number"
                                                    required={true}
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    className="form-control customInput appInput"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-6 modalFormCol">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="spacebankTRPhone"
                                                    className="customLabel"
                                                >Phone</label>
                                                <input
                                                    id="spacebankTRPhone"
                                                    name="spacebankTRPhone"
                                                    type="number"
                                                    required={true}
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="form-control customInput appInput"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-xl-6">
                                            <br />
                                            <div className="form-group">
                                                <label
                                                    htmlFor="spacebankNetwork"
                                                    className="customLabel"
                                                >Network</label>
                                                <input
                                                    id="spacebankNetwork"
                                                    name="spacebankNetwork"
                                                    type="text"
                                                    required={true}
                                                    value={network}
                                                    onChange={(e) => setNetwork(e.target.value)}
                                                    className="form-control customInput appInput"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buttonDiv">
                                        <button
                                            type="submit"
                                            className="spin"
                                        >
                                            {processing?<ImSpinner8 />:"Proceed"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ProtectedLayout>
    )
}

export default BuyAirtime;