import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { motion } from "framer-motion";
import { API_URL, BEARER_TOKEN, errorToast, successToast } from "../../config";
import axios from "axios";
import ProtectedLayout from "../../layout/ProtectedLayout";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const dataPlans = [
    {
      network_id: '1',
      name: '500MB (SME) - Monthly',
      price: '200',
      uniq_id: '500'
    },
    {
      network_id: '1',
      name: '1GB (SME) - Monthly',
      price: '300',
      uniq_id: 'M1024'
    },
    {
      network_id: '1',
      name: '2GB (SME) - Monthly',
      price: '600',
      uniq_id: 'M2024'
    },
    {
      network_id: '1',
      name: '2.5GB (Special) - 2 Days',
      price: '550',
      uniq_id: 'GIFT500'
    },
    {
      network_id: '1',
      name: '3GB (SME) - Monthly',
      price: '900',
      uniq_id: '3000'
    },
    {
      network_id: '1',
      name: '5GB (SME) - Monthly',
      price: '1,500',
      uniq_id: '5000'
    },
    {
      network_id: '1',
      name: '10GB (SME) - Monthly',
      price: '2,900',
      uniq_id: '10000'
    },
    {
      network_id: '1',
      name: '20GB (Special) - Monthly',
      price: '5,300',
      uniq_id: 'GIFT5000'
    },
    {
      network_id: '1',
      name: '40GB (Special) - Monthly',
      price: '9,500',
      uniq_id: 'GIFT10000'
    },
    {
      network_id: '1',
      name: '120GB (Special) - Monthly',
      price: '19,000',
      uniq_id: 'GIFT20000'
    },
    { network_id: '4', name: '1GB', price: '300', uniq_id: 'GCG1000' },
    { network_id: '4', name: '2GB', price: '600', uniq_id: 'GCG2000' },
    { network_id: '4', name: '3GB', price: '900', uniq_id: 'GCG3000' },
    { network_id: '4', name: '5GB', price: '1500', uniq_id: 'GCG5000' },
    {
      network_id: '2',
      name: '40MB - 1 day',
      price: '50',
      uniq_id: 'airt-50_40MB - 1 day'
    },
    {
      network_id: '2',
      name: '100MB - 1 day',
      price: '100',
      uniq_id: 'airt-100_100MB - 1 day'
    },
    {
      network_id: '2',
      name: '200MB - 3 days',
      price: '200',
      uniq_id: 'airt-200_200MB - 3 days'
    },
    {
      network_id: '2',
      name: '350MB - 7 days',
      price: '300',
      uniq_id: 'airt-300_350MB - 7 days'
    },
    {
      network_id: '2',
      name: '750MB - 14 days',
      price: '500',
      uniq_id: 'airt-500_750MB - 14 days'
    },
    {
      network_id: '2',
      name: '1.5GB - Monthly',
      price: '1,000',
      uniq_id: 'airt-1000_1.5GB - Monthly'
    },
    {
      network_id: '2',
      name: '3GB - Monthly',
      price: '1,500',
      uniq_id: 'airt-1500_3GB - Monthly'
    },
    {
      network_id: '2',
      name: '6GB - Monthly',
      price: '2,500',
      uniq_id: 'airt-2500_6GB - Monthly'
    },
    {
      network_id: '2',
      name: '10GB - Monthly',
      price: '3,000',
      uniq_id: 'airt-3000_10GB - Monthly'
    },
    {
      network_id: '2',
      name: '20GB - Monthly',
      price: '5,000',
      uniq_id: 'airt-5000_20GB - Monthly'
    },
    {
      network_id: '2',
      name: '40GB - Monthly',
      price: '10,000',
      uniq_id: 'airt-10000_40GB - Monthly'
    },
    {
      network_id: '2',
      name: '75GB - Monthly',
      price: '15,000',
      uniq_id: 'airt-15000_75GB - Monthly'
    },
    {
      network_id: '3',
      name: '650 MB - 1 day',
      price: '200',
      uniq_id: 'eti-200_650 MB - 1 day'
    },
    {
      network_id: '3',
      name: '1.5GB - Monthly',
      price: '1,000',
      uniq_id: 'eti-1000_1.5GB - Monthly'
    },
    {
      network_id: '3',
      name: '11GB - Monthly',
      price: '4,000',
      uniq_id: 'eti-4000_11GB - Monthly'
    },
    {
      network_id: '3',
      name: '15GB - Monthly',
      price: '5,000',
      uniq_id: 'eti-5000_15GB - Monthly'
    },
    {
      network_id: '3',
      name: '75GB - 90 days',
      price: '25,000',
      uniq_id: 'eti-25000_75GB - 90 days'
    },
    {
      network_id: '3',
      name: '165GB - 180 days',
      price: '50,000',
      uniq_id: 'eti-50000_165GB - 180 days'
    },
    {
      network_id: '3',
      name: '365GB - 365 days',
      price: '100,000',
      uniq_id: 'eti-100000_365GB - 365 days'
    }
]

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

const BuyData = ({ activeUser, token, removeToken, reloadUser }) => {

    const [amount, setAmount] = useState("");
    const [currentPackageList, setCurrentPackageList] = useState([]);
    const [network, setNetwork] = useState("1");
    const [dataPackage, setDataPackage] = useState("");
    const [networkIcon, setNetworkIcon] = useState("https://bingpay.ng/assets/services/mtn.jpg");
    const [phone, setPhone] = useState("");
    const [processing, setProcessing] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const tempPackage = [];
        dataPlans.map((plans) => {
            if (plans.network_id===network){
                tempPackage.push(plans);
            }
        })
        setCurrentPackageList(tempPackage);
        setAmount(tempPackage[0].price);
        setDataPackage(tempPackage[0].uniq_id);
    }, [])

    const changeDataPackage =  (e) => {
        e.preventDefault();
        dataPlans.map((plans) => {
            if (plans.uniq_id===e.target.value){
                setAmount(plans.price);
                setDataPackage(plans.uniq_id);
                return;
            }
        })
    }

    const changeNetwork = (e) => {
        setNetwork(e.target.value);
        const basicTempPackage = [];
        networkList.map((loopNetwork) => {
            if (loopNetwork.id===e.target.value){
                setNetworkIcon(loopNetwork.image);
                return '';
            }
        })
        dataPlans.map((plans) => {
            if (plans.network_id===e.target.value){
                basicTempPackage.push(plans);
            }
        })
        setCurrentPackageList(basicTempPackage);
        setAmount(basicTempPackage[0].price);
        setDataPackage(basicTempPackage[0].uniq_id);
    }

    const buyData = (e) => {
        e.preventDefault();
        console.log(networkIcon, network, amount, phone, dataPackage);
    }

    return (
        <ProtectedLayout
            navTitle="Data Subscription"
            user={activeUser}
            removeToken={removeToken}
        >
            {redirect?<Navigate to="/transactions" />:""}
            <section className="transactionSection">
                <div className="newTransferDiv">
                    <div className="newTransferSubTab">
                        <div className="row justify-content-center">
                            <div className="col-xl-8">
                                <form onSubmit={buyData}>
                                    <div className="row">
                                        <div className="col-sm-6 modalFormCol">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="spacebankNetwork"
                                                    className="customLabel"
                                                >Service Provider</label>
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
                                        <div className="col-sm-6 modalFormCol">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="spacebankPackage"
                                                    className="customLabel"
                                                >Package</label>
                                                <select
                                                    id="spacebankPackage"
                                                    name="spacebankPackage"
                                                    className="form-control selectDropdown"
                                                    onChange={changeDataPackage}
                                                >
                                                {
                                                    currentPackageList.map((singlePackage) => {
                                                        return (
                                                            <option key={singlePackage.uniq_id} value={singlePackage.uniq_id}>{singlePackage.name}</option>
                                                        )
                                                    })
                                                }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6 modalFormCol">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="spacebankAmount"
                                                    className="customLabel"
                                                >Amount</label>
                                                <input
                                                    id="spacebankAmount"
                                                    name="spacebankAmount"
                                                    type="text"
                                                    required={true}
                                                    value={amount}
                                                    disabled={true}
                                                    className="form-control customInput appInput"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 modalFormCol">
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

export default BuyData;