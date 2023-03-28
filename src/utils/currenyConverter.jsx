import { BNB_DOLLAR, DOLLAR_BNB } from "../config";

export const dollarToBNB = (dollar) => {
    const rate = DOLLAR_BNB;
    return rate * dollar;
};

export const bnbToDollar = (bnb) => {
    const rate = BNB_DOLLAR;
    return rate * bnb;
};
