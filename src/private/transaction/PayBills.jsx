import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { motion } from "framer-motion";
import { API_URL, BEARER_TOKEN, errorToast, successToast } from "../../config";
import axios from "axios";
import ProtectedLayout from "../../layout/ProtectedLayout";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { billData } from "../../data/billData";

// const billList = [
//     {
//       "id": "dstv",
//       "name": "Dstv",
//       "image_url": "https://bingpay.ng/assets/services/0a966271f6.jpg",
//       "description": "Pay Dstv Bill"
//     },
//     {
//       "id": "gotv",
//       "name": "GoTV",
//       "image_url": "https://bingpay.ng/assets/services/671b3b6386.jpg",
//       "description": "Pay Gotv Subscription"
//     },
//     {
//       "id": "startimes",
//       "name": "Startimes",
//       "image_url": "https://bingpay.ng/assets/services/3010fb1bc9.png",
//       "description": "Pay Startimes Subscription"
//     },
//     {
//       "id": "showmax",
//       "name": "Showmax",
//       "image_url": "https://bingpay.ng/assets/services/sd954eb8d0.jpg",
//       "description": "Pay Showmax Subscription"
//     },
//     {
//       "id": "abuja-electric",
//       "name": "Abuja Electricity",
//       "image_url": "https://bingpay.ng/assets/services/ab1bb52e5b7.jpg",
//       "description": "Pay Abuja PHCN bills"
//     },
//     {
//       "id": "eko-electric",
//       "name": "Eko Electricity",
//       "image_url": "https://bingpay.ng/assets/services/3844712121.png",
//       "description": "Pay Eko PHCN bills"
//     },
//     {
//       "id": "ibadan-electric",
//       "name": "Ibadan Electricity",
//       "image_url": "https://bingpay.ng/assets/services/1001608cbf.png",
//       "description": "Pay Ibadan Electric bills"
//     },
//     {
//       "id": "ikeja-electric",
//       "name": "Ikeja Electricity",
//       "image_url": "https://bingpay.ng/assets/services/ed954eb8d0.png",
//       "description": "Pay Ikeja Electric bills"
//     },
//     {
//       "id": "jos-electric",
//       "name": "Jos Electricity",
//       "image_url": "https://bingpay.ng/assets/services/jobb52e5b7.jpg",
//       "description": "Pay Jos Electric bills"
//     },
//     {
//       "id": "kaduna-electric",
//       "name": "Kaduna Electricity",
//       "image_url": "https://bingpay.ng/assets/services/kabb52e5b7.jpg",
//       "description": "Pay Kaduna Electric bills"
//     },
//     {
//       "id": "kano-electric",
//       "name": "Kano Electricity",
//       "image_url": "https://bingpay.ng/assets/services/k0bb52e5b7.jpg",
//       "description": "Pay Kaduna Electric bills"
//     },
//     {
//       "id": "portharcourt-electric",
//       "name": "Portharcout Electricity",
//       "image_url": "https://bingpay.ng/assets/services/d0bb52e5b7.png",
//       "description": "Pay Port Harcout Electricity bills"
//     },
//     {
//       "id": "smile-direct",
//       "name": "Smile Bundles",
//       "image_url": "https://bingpay.ng/assets/services/a140f67ba4.png",
//       "description": "Purchase smile data bundles"
//     },
//     {
//       "id": "spectranet",
//       "name": "Spectranet",
//       "image_url": "https://bingpay.ng/assets/services/1d56bcb07a.png",
//       "description": "Buy spectranet bundles"
//     },
//     {
//       "id": "waec",
//       "name": "Waec Registration",
//       "image_url": "https://bingpay.ng/assets/services/w01bb52e5b7.jpg",
//       "description": "WAEC Registration PIN"
//     }
// ]

const PayBills = ({ activeUser, token, removeToken, reloadUser }) => {
    const [amount, setAmount] = useState("");
    const [service, setService] = useState("dstv");
    const [packageList, setPackageList] = useState([]);
    const [packageData, setPackageData] = useState({});
    const [networkIcon, setNetworkIcon] = useState(
        "https://bingpay.ng/assets/services/0a966271f6.jpg"
    );
    const [processing, setProcessing] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        billData.map((bill) => {
            if (bill.serviceID === service) {
                setPackageList(bill.variations);
                setPackageData(bill.variations[0]);
                setAmount(bill.variations[0].variation_amount);
                return "";
            }
        });
    }, []);

    const changeService = (e) => {
        setService(e.target.value);
        billData.map((bill) => {
            if (bill.serviceID === e.target.value) {
                setPackageList(bill.variations);
                setAmount(bill.variations[0].variation_amount);
                return "";
            }
        });
    };

    const changePackage = (e) => {
        billData.map((bill) => {
            if (bill.serviceID === service) {
                bill.variations.map((variation) => {
                    if (variation.variation_code === e.target.value) {
                        setPackageData(variation);
                        setAmount(variation.variation_amount);
                    }
                });

                return "";
            }
        });
    };

    const payBill = (e) => {
        e.preventDefault();
        setProcessing(true);
        console.log(
            service,
            "27100098246",
            packageData.variation_code,
            String(parseInt(amount))
        );

        axios({
            method: "POST",
            data: {
                service_id: service,
                customer_id: "27100098246",
                variation_code: packageData.variation_code,
                amount: String(parseInt(amount)),
                networkIcon: networkIcon,
            },
            url: `${API_URL}/transactions/bill/pay-bill`,
            headers: {
                "x-auth-token": token,
            },
        })
            .then((res) => {
                reloadUser();
                setProcessing(false);
                successToast(`You paid a bill of ${amount}`);
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
            navTitle="Bill Payment"
            user={activeUser}
            removeToken={removeToken}
        >
            {redirect ? <Navigate to="/transactions" /> : ""}
            <section className="transactionSection">
                <div className="newTransferDiv">
                    <div className="newTransferSubTab">
                        <div className="row justify-content-center">
                            <div className="col-xl-8">
                                <form onSubmit={payBill}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="spacebankNetwork"
                                                    className="customLabel"
                                                >
                                                    Services
                                                </label>
                                                <select
                                                    id="spacebankNetwork"
                                                    name="spacebankNetwork"
                                                    onChange={changeService}
                                                    className="form-control selectDropdown"
                                                    defaultValue={service}
                                                >
                                                    {billData.map((service) => {
                                                        return (
                                                            <option
                                                                key={
                                                                    service.serviceID
                                                                }
                                                                value={
                                                                    service.serviceID
                                                                }
                                                            >
                                                                {
                                                                    service.ServiceName
                                                                }
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="spacebankNetwork"
                                                    className="customLabel"
                                                >
                                                    Package
                                                </label>
                                                <select
                                                    id="spacebankNetwork"
                                                    name="spacebankNetwork"
                                                    className="form-control selectDropdown"
                                                    defaultValue={packageData}
                                                    onChange={changePackage}
                                                >
                                                    {packageList.map(
                                                        (singlePackage) => {
                                                            return (
                                                                <option
                                                                    key={
                                                                        singlePackage.variation_code
                                                                    }
                                                                    value={
                                                                        singlePackage.variation_code
                                                                    }
                                                                >
                                                                    {
                                                                        singlePackage.name
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-6 modalFormCol">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="spacebankFName"
                                                    className="customLabel"
                                                >
                                                    Amount (₦)
                                                </label>
                                                <input
                                                    id="spacebankAmount"
                                                    name="spacebankAmount"
                                                    type="number"
                                                    disabled
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

export default PayBills;
