import { AiOutlineCalendar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { currencyList } from "../../helpers/CurrencyHelper";

const TransactionNav = ({ activeTab, setActiveTab }) => {
    const changeTab = (e, tab) => {
        setActiveTab(tab);
    };
    return (
        <div className="transactionNavDiv">
            <div className="selectDiv">
                <select onChange={(e) => setActiveTab(e.target.value)}>
                    <option value="all">All Transactions</option>
                    <option value="wallet">Wallet Transactions</option>
                </select>
            </div>
            <nav className="transactionSectionNav">
                <ul>
                    <li>
                        <Link
                            to="/transactions"
                            onClick={(e) => changeTab(e, "all")}
                            className={activeTab === "all" ? "active" : ""}
                        >
                            All Transactions
                        </Link>
                    </li>
                    {currencyList.map((curr, index) => {
                        return (
                            <li key={index}>
                                <Link
                                    to={`/transactions?wallet=${curr.name.toLowerCase()}`}
                                    onClick={(e) =>
                                        changeTab(
                                            e,
                                            `wallet-${curr.name.toLowerCase()}`
                                        )
                                    }
                                    className={
                                        activeTab ===
                                        `wallet-${curr.name.toLowerCase()}`
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <span>{curr.name.toUpperCase()}-</span>{" "}
                                    Wallet
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            {/* <div>
                <button>
                    <AiOutlineCalendar /> Date: August 2022
                </button>
            </div> */}
        </div>
    );
};

export default TransactionNav;
