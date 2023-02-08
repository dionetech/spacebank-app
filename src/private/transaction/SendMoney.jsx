import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { motion } from "framer-motion";
import { API_URL, BEARER_TOKEN } from "../../config";
import axios from "axios";
import ProtectedLayout from "../../layout/ProtectedLayout";

const SendMoney = ({ activeUser, token }) => {

    const [currentTab, setCurrentTab] = useState("p2p");

    return (
        <ProtectedLayout
            navTitle="Send Money"
            user={activeUser}
        >
            <section className="transactionSection">
                <div className="newTransferDiv">
                    <TransferNav
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                    />
                    {
                        currentTab==="p2p"&&(
                            <P2pTab
                                token={token}
                            />
                        )
                    }
                    {
                        currentTab==="bank"&&(
                            <BankTab
                                token={token}
                            />
                        )
                    }
                    {
                        currentTab==="crypto"&&(
                            <CryptoTab
                                token={token}
                            />
                        )
                    }
                </div>
            </section>
        </ProtectedLayout>
    )
}

const P2pTab = ({ token }) => {

    const [activeTab, setActiveTab] = useState("initial");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [username, setUsername] = useState("");
    const [processing, setProcessing] = useState(false);

    const processTransaction = (e) => {
        e.preventDefault();
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setActiveTab("pin");
        }, 2000);
    }

    return (
        <div className="newTransferSubTab">
            <div className="row justify-content-center">
                <div className="col-xl-8">
                {
                    activeTab==="initial"?
                    <form onSubmit={processTransaction}>
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
                                        htmlFor="spacebankTRUsername"
                                        className="customLabel"
                                    >Username</label>
                                    <input
                                        id="spacebankTRUsername"
                                        name="spacebankTRUsername"
                                        type="text"
                                        required={true}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="form-control customInput appInput"
                                    />
                                </div>
                            </div>

                            <div className="col-xl-12">
                                <br />
                                <div className="form-group">
                                    <label
                                        htmlFor="spacebankDescription"
                                        className="customLabel"
                                    >Description</label>
                                    <input
                                        id="spacebankDescription"
                                        name="spacebankDescription"
                                        type="text"
                                        required={true}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
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
                                {processing?<ImSpinner8 />:"Proceed"}
                            </motion.button>
                        </div>
                    </form>:
                    <P2pPinTab
                        username={username}
                        amount={amount}
                        description={description}
                        token={token}
                    />
                }
                </div>
            </div>
        </div>
    )
}

const P2pPinTab = ({ amount, description, username, token }) => {

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

const BankTab = ({ token }) => {

    const [activeTab, setActiveTab] = useState("initial");
    const [amount, setAmount] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [bank, setBank] = useState("");
    const [description, setDescription] = useState("");
    const [processing, setProcessing] = useState(false);

    return (
        <div className="newTransferSubTab">
            <div className="row justify-content-center">
                <div className="col-xl-8">
                    <h5 className="notAvailable">This feature is not yet still</h5>
                </div>
            </div>
        </div>
    )
}

const CryptoTab = ({ token }) => {

    const [activeTab, setActiveTab] = useState("initial");
    const [amount, setAmount] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [coin, setCoin] = useState("");
    const [description, setDescription] = useState("");
    const [processing, setProcessing] = useState(false);

    return (
        <div className="newTransferSubTab">
            <div className="row justify-content-center">
                <div className="col-xl-8">
                    <h5 className="notAvailable">This feature is not yet still</h5>
                </div>
            </div>
        </div>
    )
}

const TransferNav = ({ currentTab, setCurrentTab }) => {
    return(
        <nav className="newTransferNav">
            <select onChange={(e) => setCurrentTab(e.target.value)}>
                <option value="p2p">P2P Transaction</option>
                <option value="bank">Bank Account</option>
                <option value="crypto">Crypto Wallet</option>
            </select>
            <ul>
                <li>
                    <span
                        className={currentTab==="p2p"?"active":""}
                        onClick={() => setCurrentTab("p2p")}
                    >P2P Transaction</span>
                </li>
                <li>
                    <span
                        className={currentTab==="bank"?"active":""}
                        onClick={() => setCurrentTab("bank")}
                    >Bank Account</span>
                </li>
                <li>
                    <span
                        className={currentTab==="crypto"?"active":""}
                        onClick={() => setCurrentTab("crypto")}
                    >Crypto Wallet</span>
                </li>
            </ul>
        </nav>
    )
}

export default SendMoney;