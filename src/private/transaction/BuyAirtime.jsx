import { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { motion } from "framer-motion";
import { API_URL, DOLLAR_NAIRA, errorToast, successToast } from "../../config";
import axios from "axios";
import ProtectedLayout from "../../layout/ProtectedLayout";
import { Navigate } from "react-router-dom";
import { currencyList } from "../../helpers/CurrencyHelper";
import { coinValue } from "../../utils/coinValue";
import { dollarToBNB } from "../../utils/currenyConverter";
import { sendETH } from "../../helpers/pancakeswapHelper";

const networkList = [
    {
        id: "1",
        name: "MTN",
        image: "https://bingpay.ng/assets/services/mtn.jpg",
    },
    {
        id: "2",
        name: "Airtel",
        image: "https://bingpay.ng/assets/services/airtel.jpg",
    },
    {
        id: "3",
        name: "9mobile",
        image: "https://bingpay.ng/assets/services/9mobile.jpg",
    },
    {
        id: "4",
        name: "GLO",
        image: "https://bingpay.ng/assets/services/glo.jpg",
    },
];

const dollarRate = 750;

const BuyAirtime = ({
    activeUser,
    token,
    removeToken,
    reloadUser,
    balance,
    balances,
}) => {
    const [amount, setAmount] = useState("");
    const [network, setNetwork] = useState("1");
    const [networkIcon, setNetworkIcon] = useState(
        "https://bingpay.ng/assets/services/mtn.jpg"
    );
    const [phone, setPhone] = useState("");
    const [currency, setCurrency] = useState("bnb");
    const [processing, setProcessing] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [allBalance, setAllBalance] = useState({});

    useEffect(() => {
        const val = coinValue(
            balances[0],
            balances[1],
            balances[2],
            balances[3],
            "dollar"
        );
        setAllBalance(val);
        return;
    }, [balances]);

    const changeNetwork = (e) => {
        setNetwork(e.target.value);
        networkList.map((loopNetwork) => {
            if (loopNetwork.id === e.target.value) {
                setNetworkIcon(loopNetwork.image);
                return "";
            }
        });
    };

    const buyAirtime = (e) => {
        e.preventDefault();
        setProcessing(true);

        if (amount < 1) {
            errorToast("Amount cannot be less than $1");
            setProcessing(false);
            return;
        }

        let currencyBalance;
        const adminAddress = "0x5Ff33aECECa7fB5cE9CbEfC14b2eD5C87B1B6836";

        Object.keys(allBalance).map((key, index) => {
            if (key === currency) {
                currencyBalance = Object.values(allBalance)[index];
                return;
            }
        });

        console.log("CCB: ", currencyBalance);
        console.log("dTB: ", dollarToBNB(parseFloat(amount)));

        if (currency === "bnb") {
            sendETH(
                activeUser.user.wallet.address,
                adminAddress,
                dollarToBNB(parseFloat(amount)),
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
                network,
                phone,
                amount: amount,
                networkIcon,
            },
            url: `${API_URL}/transactions/airtime/buy-airtime`,
            headers: {
                "x-auth-token": token,
            },
        })
            .then((res) => {
                console.log("RES: ", res);
                reloadUser();
                successToast(`You recharged $${amount} to ${phone}`);
                setProcessing(false);
                setRedirect(true);
            })
            .catch((error) => {
                reloadUser();
                setProcessing(false);
                try {
                    errorToast(error.response.data.error);
                    setRedirect(true);
                } catch {
                    errorToast("An Error Occurred");
                    setRedirect(true);
                }
            });
    };

    return (
        <ProtectedLayout
            navTitle="Buy Airtime"
            user={activeUser}
            removeToken={removeToken}
        >
            {redirect ? <Navigate to="/transactions" /> : ""}
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
                                                >
                                                    Amount ($)
                                                </label>
                                                <input
                                                    id="spacebankAmount"
                                                    name="spacebankAmount"
                                                    type="number"
                                                    required={true}
                                                    value={amount}
                                                    onChange={(e) =>
                                                        setAmount(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="form-control customInput appInput"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-6 modalFormCol">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="spacebankTRPhone"
                                                    className="customLabel"
                                                >
                                                    Phone
                                                </label>
                                                <input
                                                    id="spacebankTRPhone"
                                                    name="spacebankTRPhone"
                                                    type="number"
                                                    required={true}
                                                    value={phone}
                                                    onChange={(e) =>
                                                        setPhone(e.target.value)
                                                    }
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
                                                >
                                                    Network
                                                </label>
                                                <select
                                                    id="spacebankNetwork"
                                                    name="spacebankNetwork"
                                                    onChange={changeNetwork}
                                                    className="form-control selectDropdown"
                                                    defaultValue={network}
                                                >
                                                    {networkList.map(
                                                        (network) => {
                                                            return (
                                                                <option
                                                                    key={
                                                                        network.id
                                                                    }
                                                                    value={
                                                                        network.id
                                                                    }
                                                                >
                                                                    {
                                                                        network.name
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <br />
                                            <div className="form-group">
                                                <label
                                                    htmlFor="spacebankNetwork"
                                                    className="customLabel"
                                                >
                                                    Currency
                                                </label>
                                                <select
                                                    id="spacebankNetwork"
                                                    name="spacebankNetwork"
                                                    onChange={(e) =>
                                                        setCurrency(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="form-control selectDropdown"
                                                    defaultValue={currency}
                                                >
                                                    {currencyList.map(
                                                        (currency, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={currency.name.toLowerCase()}
                                                                >
                                                                    {
                                                                        currency.name
                                                                    }{" "}
                                                                    ( $
                                                                    {parseFloat(
                                                                        Object.values(
                                                                            allBalance
                                                                        )[index]
                                                                    ).toFixed(
                                                                        2
                                                                    )}
                                                                    )
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buttonDiv">
                                        <button type="submit" className="spin">
                                            {processing ? (
                                                <ImSpinner8 />
                                            ) : (
                                                "Proceed"
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ProtectedLayout>
    );
};

export default BuyAirtime;
