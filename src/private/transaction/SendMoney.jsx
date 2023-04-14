import { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { motion, useCycle } from "framer-motion";
import { API_URL, errorToast, successToast } from "../../config";
import axios from "axios";
import ProtectedLayout from "../../layout/ProtectedLayout";
import { sendETH, sendTOKEN } from "../../helpers/pancakeswapHelper";
import { currencyList } from "../../helpers/CurrencyHelper";
import VerifyPinModal from "../../components/modal/VerifyPinModal";
import { Navigate } from "react-router-dom";

const SendMoney = ({
    activeUser,
    token,
    removeToken,
    reloadUser,
    balances,
}) => {
    const [currentTab, setCurrentTab] = useState("p2p");

    return (
        <ProtectedLayout
            navTitle="Send Money"
            user={activeUser}
            removeToken={removeToken}
        >
            <section className="transactionSection">
                <div className="newTransferDiv">
                    <TransferNav
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                    />
                    {currentTab === "p2p" && (
                        <P2pTab
                            token={token}
                            reloadUser={reloadUser}
                            activeUser={activeUser}
                            balances={balances}
                        />
                    )}
                    {currentTab === "bank" && <BankTab token={token} />}
                    {currentTab === "crypto" && (
                        <CryptoTab
                            token={token}
                            reloadUser={reloadUser}
                            activeUser={activeUser}
                            balances={balances}
                        />
                    )}
                </div>
            </section>
        </ProtectedLayout>
    );
};

const P2pTab = ({ token, balances, activeUser, reloadUser }) => {
    const [pinModal, cyclePinModal] = useCycle(false, true);
    const [asset, setAsset] = useState("bnb");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [username, setUsername] = useState("");
    const [processing, setProcessing] = useState(false);

    const [sendTokenBal, setSendTokenBal] = useState(0);
    const [sendToken, setSendToken] = useState("");
    const [recWalletAddress, setRecWalletAddress] = useState("");
    const [redirectToTr, setRedirectToTr] = useState(false);

    useEffect(() => {
        if (balances) {
            currencyList.map((curr, index) => {
                if (curr.name.toLowerCase() === asset) {
                    let bal = balances[index];
                    setSendTokenBal(bal);
                }
            });
        }
    }, [asset, balances, sendTokenBal]);

    const changeTokenOnSelect = (e) => {
        const val = e.target.value;
        setAsset(val);
        currencyList.map((curr) => {
            if (curr.name.toLowerCase() === val) {
                setSendToken(curr.contract);
            }
        });
    };

    const processTransaction = (e) => {
        e.preventDefault();
        setProcessing(true);

        if (username === activeUser.user.username) {
            setProcessing(false);
            errorToast("Can't send funds to yourself");
            return;
        }

        axios({
            method: "GET",
            url: `${API_URL}/users/username/${username}`,
            headers: {
                "x-auth-token": token,
            },
        })
            .then(async (res) => {
                if (res.data.success) {
                    setRecWalletAddress(res.data.data.user.wallet.address);
                    cyclePinModal();
                }
            })
            .catch((error) => {
                console.log("SECOND ERROR: ", error);
                setProcessing(false);
                try {
                    errorToast(error.response.data.error);
                } catch {
                    errorToast(`An error occured: ${error.message}`);
                }
            });
    };

    const actionToTake = () => {
        console.log("STK: ", sendToken);
        console.log(recWalletAddress, amount);
        if (sendToken === "") {
            sendETH(
                activeUser.user.wallet.address,
                recWalletAddress,
                amount,
                activeUser.user.wallet.privateKey
            );
        } else {
            sendTOKEN(
                activeUser.user.wallet.address,
                recWalletAddress,
                amount,
                sendToken,
                activeUser.user.wallet.privateKey
            );
        }
        axios({
            method: "POST",
            data: {
                fromAddress: activeUser.user.wallet.address,
                toAddress: recWalletAddress,
                amount: amount,
                privateKey: activeUser.user.wallet.privateKey,
                networkIcon: asset,
                username: username,
                extraInfo: {
                    currency: asset,
                    amountIn: "bnb",
                },
            },
            url: `${API_URL}/transactions/send-money/p2p`,
            headers: {
                "x-auth-token": token,
            },
        })
            .then((res) => {
                if (res.data.success) {
                    reloadUser();
                    setTimeout(() => {
                        setProcessing(false);
                        successToast(
                            `You sent ${amount}${asset} to ${username}`
                        );
                        setRedirectToTr(true);
                    }, 1000);
                }
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                setProcessing(false);
                try {
                    errorToast(error.response.data.error);
                } catch {
                    errorToast("An error occured, try again");
                }
            });
    };

    return (
        <div className="newTransferSubTab">
            {redirectToTr ? <Navigate to="/transactions" /> : ""}
            <VerifyPinModal
                pinModal={pinModal}
                cyclePinModal={cyclePinModal}
                actionToTake={actionToTake}
                activeUser={activeUser}
                disableProcessing={() => setProcessing(false)}
                description={description}
                username={username}
                amount={amount}
            />
            <div className="row justify-content-center">
                <div className="col-xl-8">
                    <form onSubmit={processTransaction}>
                        <div className="row">
                            <div className="col-6 modalFormCol">
                                <div className="form-group">
                                    <label
                                        htmlFor="spacebankFName"
                                        className="customLabel"
                                    >
                                        Amount ({asset.toUpperCase()})
                                    </label>
                                    <input
                                        id="spacebankAmount"
                                        name="spacebankAmount"
                                        type="number"
                                        required={true}
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(e.target.value)
                                        }
                                        className="form-control customInput appInput"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6 modalFormCol">
                                <div className="form-group">
                                    <label
                                        htmlFor="spacebankAsset"
                                        className="customLabel"
                                    >
                                        Asset ({asset.toUpperCase()})
                                    </label>
                                    <select
                                        id="spacebankAsset"
                                        name="spacebankAsset"
                                        onChange={changeTokenOnSelect}
                                        className="form-control selectDropdown"
                                        defaultValue={asset}
                                    >
                                        {currencyList.map((curr, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={curr.name.toLowerCase()}
                                                >
                                                    {curr.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="col-xl-6">
                                <div className="form-group">
                                    <label
                                        htmlFor="spacebankTRUsername"
                                        className="customLabel"
                                    >
                                        Username
                                    </label>
                                    <input
                                        id="spacebankTRUsername"
                                        name="spacebankTRUsername"
                                        type="text"
                                        required={true}
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        className="form-control customInput appInput"
                                    />
                                </div>
                            </div>

                            <div className="col-xl-6">
                                <div className="form-group">
                                    <label
                                        htmlFor="spacebankDescription"
                                        className="customLabel"
                                    >
                                        Description
                                    </label>
                                    <input
                                        id="spacebankDescription"
                                        name="spacebankDescription"
                                        type="text"
                                        required={true}
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
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
                                {processing ? <ImSpinner8 /> : "Proceed"}
                            </motion.button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const CryptoTab = ({ token, balances, activeUser, reloadUser }) => {
    const [pinModal, cyclePinModal] = useCycle(false, true);
    const [asset, setAsset] = useState("bnb");
    const [amount, setAmount] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [processing, setProcessing] = useState(false);

    const [sendTokenBal, setSendTokenBal] = useState(0);
    const [sendToken, setSendToken] = useState("");
    const [redirectToTr, setRedirectToTr] = useState(false);

    useEffect(() => {
        if (balances) {
            currencyList.map((curr, index) => {
                if (curr.name.toLowerCase() === asset) {
                    let bal = balances[index];
                    setSendTokenBal(bal);
                }
            });
        }
    }, [asset, balances, sendTokenBal]);

    const changeTokenOnSelect = (e) => {
        const val = e.target.value;
        setAsset(val);
        currencyList.map((curr) => {
            if (curr.name.toLowerCase() === val) {
                setSendToken(curr.contract);
            }
        });
    };

    const processTransaction = (e) => {
        e.preventDefault();
        setProcessing(true);
        cyclePinModal();
    };

    const actionToTake = () => {
        if (sendToken === "") {
            sendETH(
                activeUser.user.wallet.address,
                walletAddress,
                amount,
                activeUser.user.wallet.privateKey
            );
        } else {
            sendTOKEN(
                activeUser.user.wallet.address,
                walletAddress,
                amount,
                sendToken,
                activeUser.user.wallet.privateKey
            );
        }
        axios({
            method: "POST",
            data: {
                fromAddress: activeUser.user.wallet.address,
                toAddress: walletAddress,
                amount: amount,
                privateKey: activeUser.user.wallet.privateKey,
                networkIcon: asset,
                extraInfo: {
                    currency: asset,
                    amountIn: asset,
                },
            },
            url: `${API_URL}/transactions/crypto/send`,
            headers: {
                "x-auth-token": token,
            },
        })
            .then((res) => {
                if (res.data.success) {
                    reloadUser();
                    setTimeout(() => {
                        setProcessing(false);
                        successToast(
                            `You sent ${amount}${asset} to ${String(
                                walletAddress
                            ).slice(0, 10)}...`
                        );
                        setRedirectToTr(true);
                    }, 1000);
                }
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                setProcessing(false);
                try {
                    errorToast(error.response.data.error);
                } catch {
                    errorToast("An error occured, try again");
                }
            });
    };

    return (
        <div className="newTransferSubTab">
            {redirectToTr ? <Navigate to="/transactions" /> : ""}
            <VerifyPinModal
                pinModal={pinModal}
                cyclePinModal={cyclePinModal}
                actionToTake={actionToTake}
                activeUser={activeUser}
                disableProcessing={() => setProcessing(false)}
                username={`${walletAddress.slice(0, 10)}...`}
                amount={amount}
                description={`You are sending ${amount}${asset.toUpperCase()} to ${walletAddress.slice(
                    0,
                    10
                )}...`}
            />
            <div className="row justify-content-center">
                <div className="col-xl-8">
                    <form onSubmit={processTransaction}>
                        <div className="row">
                            <div className="col-md-6 modalFormCol">
                                <div className="form-group">
                                    <label
                                        htmlFor="spacebankAmount"
                                        className="customLabel"
                                    >
                                        Amount ({asset.toUpperCase()})
                                    </label>
                                    <input
                                        id="spacebankAmount"
                                        name="spacebankAmount"
                                        type="number"
                                        required={true}
                                        placeholder="0.05"
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(e.target.value)
                                        }
                                        className="form-control customInput appInput"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6 modalFormCol">
                                <div className="form-group">
                                    <label
                                        htmlFor="spacebankAsset"
                                        className="customLabel"
                                    >
                                        Asset ({asset.toUpperCase()})
                                    </label>
                                    <select
                                        id="spacebankAsset"
                                        name="spacebankAsset"
                                        onChange={changeTokenOnSelect}
                                        className="form-control selectDropdown"
                                        defaultValue={asset}
                                    >
                                        {currencyList.map((curr, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={curr.name.toLowerCase()}
                                                >
                                                    {curr.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="form-group">
                                    <label
                                        htmlFor="spacebankWalletAddress"
                                        className="customLabel"
                                    >
                                        Address
                                    </label>
                                    <input
                                        id="spacebankWalletAddress"
                                        name="spacebankWalletAddress"
                                        type="text"
                                        placeholder="0xC5208D632e3D6F5a527F9cE18e212fe2CD8719Cb"
                                        required={true}
                                        value={walletAddress}
                                        onChange={(e) =>
                                            setWalletAddress(e.target.value)
                                        }
                                        className="form-control customInput appInput"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="buttonDiv">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.8 }}
                                type="submit"
                                className="spin"
                            >
                                {processing ? <ImSpinner8 /> : "Proceed"}
                            </motion.button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

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
                    <h5 className="notAvailable">
                        This feature is not yet still
                    </h5>
                </div>
            </div>
        </div>
    );
};

const TransferNav = ({ currentTab, setCurrentTab }) => {
    return (
        <nav className="newTransferNav">
            <select onChange={(e) => setCurrentTab(e.target.value)}>
                <option value="p2p">P2P Transaction</option>
                {/* <option value="bank">Bank Account</option> */}
                <option value="crypto">Crypto Wallet</option>
            </select>
            <ul>
                <li>
                    <span
                        className={currentTab === "p2p" ? "active" : ""}
                        onClick={() => setCurrentTab("p2p")}
                    >
                        P2P Transaction
                    </span>
                </li>
                {/* <li>
                    <span
                        className={currentTab === "bank" ? "active" : ""}
                        onClick={() => setCurrentTab("bank")}
                    >
                        Bank Account
                    </span>
                </li> */}
                <li>
                    <span
                        className={currentTab === "crypto" ? "active" : ""}
                        onClick={() => setCurrentTab("crypto")}
                    >
                        Crypto Wallet
                    </span>
                </li>
            </ul>
        </nav>
    );
};

export default SendMoney;
