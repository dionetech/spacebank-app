import SingleTrList from "../card/SingleTrList";

const TransactionList = ({ transactions }) => {
    return (
        <div className="transactionList">
            {transactions.length !== 0 ? (
                <ul>
                    {transactions.map((transaction, index) => {
                        return (
                            <SingleTrList
                                key={index}
                                transaction={transaction}
                                trPage={true}
                            />
                        );
                    })}
                </ul>
            ) : (
                <div className="transactionStatsContent">
                    <div className="emptyContent">
                        <img
                            src="https://res.cloudinary.com/ruthless-labs/image/upload/v1672159101/spacebank/kyoagcmvrxjxwztyfdw0.png"
                            style={{ width: "430px", height: "200px" }}
                        />
                        <h5>No Transaction</h5>
                    </div>
                </div>
            )}
            <br />
            <br />
        </div>
    );
};

export default TransactionList;
