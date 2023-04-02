import { useEffect, useState } from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import { Link } from "react-router-dom";
import { coinValue } from "../../utils/coinValue";

const TransactionHeader = ({ balances }) => {
    const [allBalance, setAllBalance] = useState(0);
    useEffect(() => {
        const val = coinValue(
            balances[0],
            balances[1],
            balances[2],
            balances[3],
            "dollar",
            true
        );

        setAllBalance(val);
        return;
    }, [balances, setAllBalance]);

    return (
        <div className="transactionSectionHeader">
            <div>
                <h4>${parseFloat(allBalance).toFixed(2)}</h4>
                <p>
                    Total balance from all accounts <span>USD</span>
                </p>
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
    );
};

export default TransactionHeader;
