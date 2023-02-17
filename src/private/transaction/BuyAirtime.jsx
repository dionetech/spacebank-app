import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { motion } from "framer-motion";
import { API_URL, BEARER_TOKEN, errorToast, successToast } from "../../config";
import axios from "axios";
import ProtectedLayout from "../../layout/ProtectedLayout";
import { Navigate } from "react-router-dom";

const networkList = [
    {
        "id": "1",
        "name": "MTN",
        "image": "https://bingpay.ng/assets/services/mtn.jpg"
    },
    {
        "id": "2",
        "name": "Airtel",
        "image": "https://bingpay.ng/assets/services/airtel.jpg"
    },
    {
        "id": "3",
        "name": "9mobile",
        "image": "https://bingpay.ng/assets/services/9mobile.jpg"
    },
    {
        "id": "4",
        "name": "GLO",
        "image": "https://bingpay.ng/assets/services/glo.jpg"
    }
]

const BuyAirtime = ({ activeUser, token, removeToken, reloadUser }) => {

    const [amount, setAmount] = useState("");
    const [network, setNetwork] = useState("1");
    const [networkIcon, setNetworkIcon] = useState("https://bingpay.ng/assets/services/mtn.jpg");
    const [phone, setPhone] = useState("");
    const [processing, setProcessing] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const changeNetwork = (e) => {
        setNetwork(e.target.value);
        networkList.map((loopNetwork) => {
            if (loopNetwork.id===e.target.value){
                setNetworkIcon(loopNetwork.image);
                return '';
            }
        })
    }

    const buyAirtime = (e) => {
        e.preventDefault();
        setProcessing(true);

        console.log(network, amount, networkIcon, phone);

        axios({
			method: "POST",
			data: {
                network, phone, amount, networkIcon
			},
            url: `${API_URL}/transactions/airtime/buy-airtime`,
            headers: {
                'x-auth-token': token,
            },
		})
		.then((res) => {
            reloadUser();
			setProcessing(false);
            successToast(`You recharged ₦${amount} to ${phone}`);
            setRedirect(true);
		})
		.catch((error) => {
            reloadUser();
			setProcessing(false);
            try{
                errorToast(error.response.data.error);
                setRedirect(true);
            }catch{
                errorToast("An Error Occurred");
                setRedirect(true);
            }
		})
    }

    return (
        <ProtectedLayout
            navTitle="Buy Airtime"
            user={activeUser}
            removeToken={removeToken}
        >
            {redirect?<Navigate to="/transactions" />:""}
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

                                        <div className="col-md-6">
                                            <br />
                                            <div className="form-group">
                                                <label
                                                    htmlFor="spacebankNetwork"
                                                    className="customLabel"
                                                >Network</label>
                                                <select
                                                    id="spacebankNetwork"
                                                    name="spacebankNetwork"
                                                    onChange={changeNetwork}
                                                    className="form-control selectDropdown"
                                                    defaultValue={network}
                                                >
                                                {
                                                    networkList.map((network) => {
                                                        return (
                                                            <option key={network.id} value={network.id}>{network.name}</option>
                                                        )
                                                    })
                                                }
                                                </select>
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