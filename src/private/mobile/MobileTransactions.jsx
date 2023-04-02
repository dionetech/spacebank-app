import { useState } from "react";
import { useEffect } from "react";
import TrByDate from "../../components/nav/app/TrByDate";
import { convertDate } from "../../utils/convertDate";
import { createFilter } from "react-search-input";
// import { Link } from "react-router-dom";
// import { AiOutlineTransaction } from "react-icons/ai";

const KEYS_TO_FILTERS = ["description"];

const MobileTransactions = ({ transactions }) => {
    const [dateList, setDateList] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const filteredTransactions = transactions.filter(
        createFilter(searchInput, KEYS_TO_FILTERS)
    );

    useEffect(() => {
        const dates = [];

        transactions.map((tr) => {
            const trDate = String(convertDate(tr.createdAt, "ddmmyy"));
            if (!dates.includes(trDate)) {
                dates.push(trDate);
            }
        });

        setDateList(dates);
    }, [transactions]);

    return (
        <section className="mobileTransactionSection">
            <div className="mobileTrHeader">
                <div className="formDiv">
                    <div className="form-group">
                        <input
                            type="search"
                            className="form-control customInput appInput"
                            placeholder="🔍 Search"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                </div>
                {/* <Link to="/transactions/new">
                    <AiOutlineTransaction /> New Transaction
                </Link> */}
            </div>
            {dateList.map((date, index) => {
                return (
                    <TrByDate
                        key={index}
                        date={date}
                        transactions={filteredTransactions}
                    />
                );
            })}
        </section>
    );
};

export default MobileTransactions;
