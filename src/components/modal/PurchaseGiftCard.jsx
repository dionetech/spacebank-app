import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";
import { API_URL, errorToast, successToast } from "../../config";

const PurchaseGiftCard = ({
    gcard,
    gCardModal,
    cycleGCardModal,
    token,
    reloadUser,
    international,
}) => {
    const [amount, setAmount] = useState("");
    const [pin, setPin] = useState("");
    const [processing, setProcessing] = useState(false);

    const purchase = (e) => {
        e.preventDefault();
        setProcessing(true);

        axios({
            method: "POST",
            data: {
                amount,
                pin,
                product_id: gcard.id,
                networkIcon: gcard.image_url,
                name: gcard.name,
            },
            url: `${API_URL}/transactions/giftcard/purchase`,
            headers: {
                "x-auth-token": token,
            },
        })
            .then((res) => {
                console.log("RES: ", res);
                reloadUser();
                setTimeout(function () {
                    successToast(
                        `You purchased a ${gcard.name} gift card of ₦${amount}`
                    );
                    setProcessing(false);
                    cycleGCardModal();
                }, 4000);
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                reloadUser();
                try {
                    errorToast(error.response.data.error);
                } catch {
                    errorToast("An Error Occurred");
                }
                setProcessing(false);
                cycleGCardModal();
            });
    };

    return (
        <AnimatePresence>
            {gCardModal && (
                <motion.div
                    className="fixed-top customBackdrop p2pBackdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div className="customModal transactionModal">
                        {!international ? (
                            <div className="modalContent">
                                <h5 className="walletBalance">
                                    {gcard.name} Gift Card
                                </h5>
                                <div className="alert info">
                                    <span>₦100 service fee applies.</span>
                                </div>
                                <p className="subInfo">
                                    <strong>Gift card Description: </strong>
                                    {gcard.description}.
                                </p>
                                <form onSubmit={purchase}>
                                    <div className="row">
                                        <div className="col-12 modalFormCol">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="spacebankAmount"
                                                    className="customLabel"
                                                >
                                                    Amount{" "}
                                                </label>
                                                <input
                                                    id="spacebankAmount"
                                                    name="spacebankAmount"
                                                    type="number"
                                                    required={true}
                                                    placeholder={`Min: ₦${gcard.min_range} - Max: ₦${gcard.max_range}`}
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

                                        <div className="col-12 modalFormCol">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="spacebankTrPin"
                                                    className="customLabel"
                                                >
                                                    Transaction Pin
                                                </label>
                                                <input
                                                    id="spacebankTrPin"
                                                    name="spacebankTrPin"
                                                    type="number"
                                                    required={true}
                                                    placeholder="Transaction Pin"
                                                    value={pin}
                                                    onChange={(e) =>
                                                        setPin(e.target.value)
                                                    }
                                                    className="form-control customInput appInput"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buttonDiv">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            onClick={cycleGCardModal}
                                            type="button"
                                        >
                                            Cancel
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: "0.8" }}
                                            type="submit"
                                            className="spin"
                                        >
                                            {processing ? (
                                                <ImSpinner8 />
                                            ) : (
                                                "Proceed"
                                            )}
                                        </motion.button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <InternationalGCModal
                                gcard={gcard}
                                cycleGCardModal={cycleGCardModal}
                            />
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const InternationalGCModal = ({ cycleGCardModal, gcard }) => {
    const [amount, setAmount] = useState(gcard.fixedRecipientDenominations[0]);
    const [pin, setPin] = useState("");
    const [processing, setProcessing] = useState(false);

    const purchase = (e) => {
        e.preventDefault();
        setProcessing(true);

        const data = {
            pin: pin,
            product_id: gcard.productId,
            networkIcon: gcard.logoUrls[0],
            name: gcard.productName,
            amount: parseInt(amount),
            country: gcard.country.isoName,
            sender: "Spacebank Technologies",
        };

        axios({
            method: "POST",
            data: data,
            url: `${API_URL}/transactions/giftcard/international/purchase`,
            headers: {
                "x-auth-token": token,
            },
        })
            .then((res) => {
                console.log("RES: ", res);
                reloadUser();
                setTimeout(function () {
                    successToast(
                        `You purchased a ${gcard.productName} gift card of $${amount}`
                    );
                    setProcessing(false);
                    cycleGCardModal();
                }, 4000);
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                reloadUser();
                try {
                    errorToast(error.response.data.error);
                } catch {
                    errorToast("An Error Occurred");
                }
                setProcessing(false);
                cycleGCardModal();
            });
    };

    return (
        <div className="modalContent">
            <div className="internationalGCHeader">
                <img src={gcard.country.flagUrl} alt={gcard.country.name} />
                <span>{gcard.productName}</span>
            </div>
            <p className="subInfo">
                <strong>Redeem Instruction: </strong>
                {gcard.redeemInstruction.concise}.
            </p>
            <form onSubmit={purchase}>
                <div className="row">
                    <div className="col-12 modalFormCol">
                        <div className="form-group">
                            <label
                                htmlFor="spacebankAmount"
                                className="customLabel"
                            >
                                Amount{" "}
                            </label>
                            <select
                                id="spacebankAmount"
                                name="spacebankAmount"
                                className="form-control selectDropdown"
                                defaultValue={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            >
                                {gcard.fixedRecipientDenominations.map(
                                    (curr, index) => {
                                        return (
                                            <option value={curr} key={index}>
                                                ${curr}
                                            </option>
                                        );
                                    }
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="col-12 modalFormCol">
                        <div className="form-group">
                            <label
                                htmlFor="spacebankTrPin"
                                className="customLabel"
                            >
                                Transaction Pin
                            </label>
                            <input
                                id="spacebankTrPin"
                                name="spacebankTrPin"
                                type="number"
                                required={true}
                                placeholder="Transaction Pin"
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
                        onClick={cycleGCardModal}
                        type="button"
                    >
                        Cancel
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.5 }}
                        type="submit"
                        className="spin"
                    >
                        {processing ? <ImSpinner8 /> : "Proceed"}
                    </motion.button>
                </div>
            </form>
        </div>
    );
};

export default PurchaseGiftCard;
