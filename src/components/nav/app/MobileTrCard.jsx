import { convertDate } from "../../../utils/convertDate"

const MobileTrCard = ({ tr }) => {

    const getTransactionType = (type) => {
        if (type==="buy-airtime"){
            return "Airtime Recharge"
        }
        if (type==="buy-data"){
            return "Data Subscription"
        }
        if (type==="pay-bill"){
            return "Bill Payment"
        }
        if (type==="purchased-giftcard"){
            return "Purchased Giftcard"
        }
    }
    
    return (
        <li className="mobileTrCard">
            <div className="initialDiv">
                <img
                    src={tr.icon}
                    style={{ width: "30px", height: "30px" }}
                    alt="Transaction Card Icon"
                />
                <p>
                    <span className="titleSpan">{tr.description}</span>
                    <span className="subtitleSpan">{convertDate(tr.createdAt, "time")}</span>
                </p>
            </div>
            <div>
                <p className="amount">
                    <span className="text-right">₦{tr.amount}.00</span>
                </p>
            </div>
        </li>
    )
}

export default MobileTrCard;