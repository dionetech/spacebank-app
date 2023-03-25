export const coinValue = (bnb, wbnb, usdt, busd, currency, all) => {
    if (all) {
        if (currency === "dollar") {
            let bnbToDollar = parseFloat(bnb) * 322.88;
            let wbnbToDollar = parseFloat(wbnb) * 326.11;
            let usdtToDollar = parseFloat(usdt) * 1;
            let busdToDollar = parseFloat(busd) * 1.01;

            return bnbToDollar + wbnbToDollar + usdtToDollar + busdToDollar;
        }
        if (currency === "pound") {
            let bnbToPound = parseFloat(bnb) * 263.84;
            let wbnbToPound = parseFloat(wbnb) * 274.8;
            let usdtToPound = parseFloat(usdt) * 0.81;
            let busdToPound = parseFloat(busd) * 0.82;

            return bnbToPound + wbnbToPound + usdtToPound + busdToPound;
        }
    } else {
        if (currency === "dollar") {
            let bnbToDollar = parseFloat(bnb) * 322.88;
            let wbnbToDollar = parseFloat(wbnb) * 326.11;
            let usdtToDollar = parseFloat(usdt) * 1;
            let busdToDollar = parseFloat(busd) * 1.01;

            return { bnbToDollar, wbnbToDollar, usdtToDollar, busdToDollar };
        }
        if (currency === "pound") {
            let bnbToPound = parseFloat(bnb) * 263.84;
            let wbnbToPound = parseFloat(wbnb) * 274.8;
            let usdtToPound = parseFloat(usdt) * 0.81;
            let busdToPound = parseFloat(busd) * 0.82;

            return { bnbToPound, wbnbToPound, usdtToPound, busdToPound };
        }
    }
};
