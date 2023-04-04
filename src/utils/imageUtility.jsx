export const transactionIcon = (transaction) => {
    if (transaction.icon === "bnb") {
        return "https://crypto-icons-plus.netlify.app/img/binance-coin.1f249bb3.png";
    }
    if (transaction.icon === "wbnb") {
        return "https://crypto-icons-plus.netlify.app/img/wbnb.6ad20d06.png";
    }
    if (transaction.icon === "usdt") {
        return "https://crypto-icons-plus.netlify.app/img/tether.b5a07ae1.png";
    }
    if (transaction.icon === "busd") {
        return "https://crypto-icons-plus.netlify.app/img/binance-usd.be95c500.png";
    }
    if (transaction.icon === "usdc") {
        return "https://crypto-icons-plus.netlify.app/img/usd-coin.1019df29.png";
    }
    return transaction.icon;
};

export const imageError = (e) => {
    console.log("Image Error");
    e.target.currentSrc = "hello";
    console.log(e.target.currentSrc);
};
