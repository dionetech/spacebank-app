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
    if (type === "total-amount") {
        let totalAmount = 0;
        outgoing.map((outgoingTr) => {
            totalAmount = totalAmount + outgoingTr.amount;
        });

        return totalAmount;
    }
};
