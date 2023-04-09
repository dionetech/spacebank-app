import { BNB_DOLLAR, DOLLAR_BNB, DOLLAR_NAIRA } from "../config";

export const dollarToBNB = (dollar) => {
    const rate = DOLLAR_BNB;
    return rate * dollar;
};

export const bnbToDollar = (bnb) => {
    const rate = BNB_DOLLAR;
    return rate * bnb;
};

export const dollarToNaira = (dollar) => {
    const rate = DOLLAR_NAIRA;
    return rate * dollar;
};

export const nairaToDollar = (naira) => {
    const rate = 1 / DOLLAR_NAIRA;
    return rate * naira;
};
