import { AiOutlineTransaction } from "react-icons/ai";
import { Link } from "react-router-dom";

const TransactionHeader = ({ activeUser }) => {

    return (
        <div className="transactionSectionHeader">
            <div>
                <h4>${activeUser.balances.balance.$numberDecimal}.00</h4>
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