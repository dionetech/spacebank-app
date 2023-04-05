export const getOutFlowTransactions = (transactions, type) => {
    const outgoing = [];

    transactions.map((tr) => {
        if (tr.mode === "outgoing") {
            outgoing.push(tr);
        }
    });

    if (type === "length") {
        return outgoing.length;
    }
};
