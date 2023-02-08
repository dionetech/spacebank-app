import { RiAddCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const NoTransactionTab = () => {

    return (
        <div className="noTransactionTab">
            <div className="noTransactionTabContent">
                <div className="imageDiv">
                    <img
                        src="https://res.cloudinary.com/ruthless-labs/image/upload/v1668045267/spacebank/lzrvfvkns46ugwbzmnlv.svg"
                        alt="No Transaction Image"
                        style={{ width: "200px", height: "170px" }}
                    />
                </div>

                <h4>Make a Payment</h4>
                <p>Start spending your funds and get detailed list of transactions for each account</p>

                <div className="buttonDiv">
                    <Link to="/transactions/new"><RiAddCircleLine />Start Transacting</Link>
                </div>
            </div>
        </div>
    )
}

export default NoTransactionTab;