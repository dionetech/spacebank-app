import { AiOutlineCalendar } from "react-icons/ai";
import { Link } from "react-router-dom";

const TransactionNav = () => {
    return (
        <div className="transactionNavDiv">
            <div className="selectDiv">
                <select>
                    <option value="transactions">Transactions</option>
                    <option value="deposits">Open Deposits</option>
                    <option value="credits">Your Credits</option>
                    <option value="crypto_assets">Crypto Assets</option>
                </select>
            </div>
            <nav className="transactionSectionNav">
                <ul>
                    <li><Link to="/transactions" className="active">Transactions</Link></li>
                    <li><Link to="/transactions/deposits">Open Deposits</Link></li>
                    <li><Link to="/transactions/credits">Your Credits</Link></li>
                    <li><Link to="/transactions/assets">Crypto Assets</Link></li>
                </ul>
            </nav>
            <div>
                <button><AiOutlineCalendar /> Date: August 2022</button>
            </div>
        </div>
    )
}

export default TransactionNav;