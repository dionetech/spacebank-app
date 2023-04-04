import CryptoIcons from "../../utils/cryptoIcons";

const SingleCoinList = ({ curr, bal }) => {
    return (
        <li>
            <div className="initialDiv">
                <CryptoIcons coin={curr.name} />
                <p>
                    <span className="titleSpan">{curr.name}</span>
                    <span className="subtitleSpan">Wallet account</span>
                </p>
            </div>
            <div>
                <p>
                    <span className="titleSpan text-right">
                        {bal ? bal : 0} {curr.name}
                    </span>
                    <span className="subtitleSpan">Wallet balance</span>
                </p>
            </div>
        </li>
    );
};

export default SingleCoinList;
