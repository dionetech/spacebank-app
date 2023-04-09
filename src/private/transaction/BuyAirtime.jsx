import { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { motion, useCycle } from "framer-motion";
import {
    ADMIN_ADDRESS,
    API_URL,
    DOLLAR_NAIRA,
    errorToast,
    successToast,
} from "../../config";
import axios from "axios";
import ProtectedLayout from "../../layout/ProtectedLayout";
import { Navigate } from "react-router-dom";
import { currencyList } from "../../helpers/CurrencyHelper";
import { coinValue } from "../../utils/coinValue";
import { dollarToBNB, dollarToNaira } from "../../utils/currenyConverter";
import { sendETH, sendTOKEN } from "../../helpers/pancakeswapHelper";
import VerifyPinModal from "../../components/modal/VerifyPinModal";

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

const BuyAirtime = ({
    activeUser,
    token,
    removeToken,
    reloadUser,
    balance,
    balances,
}) => {
    const [pinModal, cyclePinModal] = useCycle(false, true);
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
    const [sendToken, setSendToken] = useState("");
    const [trResponse, setTrResponse] = useState("");

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

    const changeTokenOnSelect = (e) => {
        const val = e.target.value;
        setCurrency(val);
        currencyList.map((curr) => {
            if (curr.name.toLowerCase() === val) {
                setSendToken(curr.contract);
            }
        });
    };

    const processTransaction = (e) => {
        e.preventDefault();
        setProcessing(true);
        if (amount < 1) {
            errorToast("Airtime mount cannot be less than $1");
            setProcessing(false);
            return;
        }
        cyclePinModal();
    };

    const buyAirtime = () => {
        // let currencyBalance;
        const adminAddress = ADMIN_ADDRESS;

        // Object.keys(allBalance).map((key, index) => {
        //     if (key === currency) {
        //         currencyBalance = Object.values(allBalance)[index];
        //         return;
        //     }
        // });

        if (sendToken === "") {
            sendETH(
                activeUser.user.wallet.address,
                adminAddress,
                dollarToBNB(parseFloat(amount)),
                activeUser.user.wallet.privateKey
            );
        } else {
            sendTOKEN(
                activeUser.user.wallet.address,
                adminAddress,
                dollarToBNB(parseFloat(amount)),
                sendToken,
                activeUser.user.wallet.privateKey
            );
        }

        axios({
            method: "POST",
            data: {
                network,
                phone,
                amount: dollarToNaira(parseFloat(amount)),
                networkIcon,
                fromAddress: activeUser.user.wallet.address,
                toAddress: adminAddress,
                privateKey: activeUser.user.wallet.privateKey,
                extraInfo: {
                    currency: currency,
                    amountIn: "naira",
                },
            },
            url: `${API_URL}/transactions/airtime/buy-airtime`,
            headers: {
                "x-auth-token": token,
            },
        })
            .then((res) => {
                setProcessing(false);
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
                    errorToast(`An Error Occurred: ${error.message}`);
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
            <VerifyPinModal
                pinModal={pinModal}
                cyclePinModal={cyclePinModal}
                actionToTake={buyAirtime}
                activeUser={activeUser}
                disableProcessing={() => setProcessing(false)}
                username={phone}
                amount={dollarToBNB(parseFloat(amount))}
                description={`You are purchasing airtime of $${parseFloat(
                    amount
                ).toFixed(2)}`}
            />
            <section className="transactionSection">
                <div className="newTransferDiv">
                    <div className="newTransferSubTab">
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
                                                    onChange={
                                                        changeTokenOnSelect
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
