import { AiOutlineTransaction } from "react-icons/ai";
import { Link } from "react-router-dom";

const TransactionHeader = () => {

    return (
        <div className="transactionSectionHeader">
            <div>
                <h4>$114.158,63</h4>
                <p>Total balance from all accounts <span>USD</span></p>
            </div>
            <div>
                {/* <button>
                    <AiOutlineTransaction /> New Transaction
                </button> */}
                <Link to="/transactions/new">
                    <AiOutlineTransaction /> New Transaction
                </Link>
            </div>
        </div>
    )
}

export default TransactionHeader;