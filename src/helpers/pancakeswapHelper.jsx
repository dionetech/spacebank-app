import Web3 from "web3";
// import { user } from "../auth/authToken";
import { pancakeABI, tokenABI } from "./abiHelper";

const user = JSON.parse(window.localStorage.getItem("spacebank_user"));

let web3;

try {
    web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
} catch {
    console.log("Failed");
}

let pancakeSwapContract = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
let adminWallet = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
let fees = 5; // %
let pancakeSwap = new web3.eth.Contract(pancakeABI, pancakeSwapContract);

export const getAmountsOut = async (fromToken, toToken) => {
    if (fromToken.toLowerCase() == toToken.toLowerCase()) {
        console.log("ok");
        return [web3.utils.toWei("1"), web3.utils.toWei("1")];
    }

    let amount = await pancakeSwap.methods
        .getAmountsOut(web3.utils.toWei("1"), [fromToken, toToken])
        .call()
        .catch((error) => {
            return "false";
        });

    return amount ? amount : "false";
};

export const getToken = async (tokenContract) => {
    web3.eth.accounts.wallet.add(user.user.wallet.privateKey);
    let token = await new web3.eth.Contract(
        tokenABI,
        tokenContract.toLowerCase()
    );
    let tokenDecimals = await token.methods.decimals().call();
    let name = await token.methods.name().call();
    let symbol = await token.methods.symbol().call();

    return {
        name: await name,
        symbol: await symbol,
        contract: await tokenContract,
        decimals: await tokenDecimals,
    };
};

export const getDecimals = async (tokenContract) => {
    web3.eth.accounts.wallet.add(user.user.wallet.privateKey);
    let token = await new web3.eth.Contract(
        tokenABI,
        tokenContract.toLowerCase()
    );
    let tokenDecimals = await token.methods.decimals().call();
    return tokenDecimals;
};

export const getBalanceOfToken = async (tokenContract, address) => {
    web3.eth.accounts.wallet.add(user.user.wallet.privateKey);
    let token = new web3.eth.Contract(tokenABI, tokenContract.toLowerCase());
    let balance = await token.methods.balanceOf(address).call();
    return await balance;
};

export const swap = async (
    fromContract,
    toContract,
    amount,
    address,
    privateKey
) => {
    amount = web3.utils.toWei(amount + "");
    console.log(amount);
    web3.eth.accounts.wallet.add(privateKey);
    if (amount == 0) {
        console.log("Value must be greater than 0");
        return;
    }
    if (fromContract == "") {
        try {
            toContract = web3.utils.toChecksumAddress(toContract);
            var spend = web3.utils.toChecksumAddress(
                "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"
            );
            var tx_builder = pancakeSwap.methods.swapExactETHForTokens(
                0,
                [spend],
                address,
                Date.now() + 3600 * 1000
            );
            var excoded_tx = tx_builder.encodeABI();
            let transObj = {
                gas: 300000,
                data: excoded_tx,
                from: address,
                to: pancakeSwapContract,
                value: amount - amount * (fees / 100),
            };
            let feesObj = {
                gas: 300000,
                from: address,
                to: adminWallet,
                value: amount * (fees / 100),
            };
            web3.eth.accounts.signTransaction(
                transObj,
                privateKey,
                (error, signedTx) => {
                    if (error) {
                        console.log("ERROR: ", error.message);
                    } else {
                        web3.eth
                            .sendSignedTransaction(signedTx.rawTransaction)
                            .on("receipt", (receipt) => {
                                web3.eth.accounts
                                    .signTransaction(
                                        feesObj,
                                        privateKey,
                                        (error, signedTx) => {
                                            if (error) {
                                                console.log(
                                                    "ERROR: ",
                                                    error.message
                                                );
                                            } else {
                                                web3.eth
                                                    .sendSignedTransaction(
                                                        signedTx.rawTransaction
                                                    )
                                                    .on(
                                                        "receipt",
                                                        (receipt) => {
                                                            console.log(
                                                                "Swap success !!!"
                                                            );
                                                        }
                                                    );
                                            }
                                        }
                                    )
                                    .on("error", (error) => {
                                        console.log(error);
                                    });
                            })
                            .on("error", (error) => {
                                console.log(error);
                            });
                    }
                }
            );
        } catch (err) {
            console.log("ERROR: ", err.message);
        }
    } else if (toContract == "") {
        try {
            fromContract = web3.utils.toChecksumAddress(fromContract);
            toContract = web3.utils.toChecksumAddress(
                "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"
            );
            var tx_builder =
                pancakeSwap.methods.swapExactTokensForETHSupportingFeeOnTransferTokens(
                    amount,
                    0,
                    [fromContract],
                    address,
                    Date.now() + 3600 * 1000
                );
            var excoded_tx = tx_builder.encodeABI();
            let transObj = {
                gas: 300000,
                data: excoded_tx,
                from: address,
                to: pancakeSwapContract,
            };
            web3.eth.accounts.signTransaction(
                transObj,
                privateKey,
                (error, signedTx) => {
                    if (error) {
                        console.log(error.message);
                    } else {
                        web3.eth
                            .sendSignedTransaction(signedTx.rawTransaction)
                            .on("receipt", (receipt) => {
                                console.log(receipt);
                                console.log("Swap Success !!");
                            })
                            .on("error", (error) => {
                                console.log(error);
                            });
                    }
                }
            );
        } catch (err) {
            console.log(err.message);
        }
    } else {
        try {
            fromContract = web3.utils.toChecksumAddress(fromContract);
            toContract = web3.utils.toChecksumAddress(toContract);
            var tx_builder =
                pancakeSwap.methods.swapExactTokensForTokensSupportingFeeOnTransferTokens(
                    amount,
                    0,
                    [fromContract, toContract],
                    address,
                    Date.now() + 3600 * 1000
                );
            var excoded_tx = tx_builder.encodeABI();
            let transObj = {
                gas: 300000,
                data: excoded_tx,
                from: address,
                to: pancakeSwapContract,
            };
            web3.eth.accounts.signTransaction(
                transObj,
                privateKey,
                (error, signedTx) => {
                    if (error) {
                        console.log(error.message);
                    } else {
                        web3.eth
                            .sendSignedTransaction(signedTx.rawTransaction)
                            .on("receipt", (receipt) => {
                                console.log(receipt);
                                console.log("Swap Success !!");
                            })
                            .on("error", (error) => {
                                console.log(error);
                            });
                    }
                }
            );
        } catch (err) {
            console.log(err.message);
        }
    }
};

export const approve = async (tokenContract, toAddress, amount, privateKey) => {
    amount = web3.utils.toWei(amount + "");
    try {
        let token = await new web3.eth.Contract(
            tokenABI,
            tokenContract.toLowerCase()
        );
        let tx_builder = token.methods.approve(toAddress, amount);
        var excoded_tx = tx_builder.encodeABI();
        let transObj = {
            gas: 300000,
            data: excoded_tx,
            from: address,
            to: tokenContract,
        };
        web3.eth.accounts.signTransaction(
            transObj,
            privateKey,
            (error, signedTx) => {
                if (error) {
                    console.log(error.message);
                } else {
                    web3.eth
                        .sendSignedTransaction(signedTx.rawTransaction)
                        .on("receipt", () => {
                            console.log("Approved !!");
                        });
                }
            }
        );
    } catch (err) {
        console.log(err.message);
    }
};

export const sendETH = async (fromAddress, toAddress, amount, privateKey) => {
    amount = web3.utils.toWei(amount + "");
    const transObj = {
        from: fromAddress,
        gasPrice: "50000000000",
        gas: "21000",
        to: toAddress,
        value: amount,
    };
    web3.eth.accounts
        .signTransaction(transObj, privateKey)
        .then((signedTx) => {
            web3.eth
                .sendSignedTransaction(signedTx.rawTransaction)
                .on("receipt", (trdt) => {
                    console.log("Eth sent !!: ", trdt);
                });
        })
        .catch((error) => {
            console.log("ERROR: ", error);
        });
};

export const sendTOKEN = async (
    fromAddress,
    toAddress,
    amount,
    tokenContract,
    privateKey
) => {
    amount = web3.utils.toWei(amount + "");
    try {
        console.log(tokenContract);
        let token = await new web3.eth.Contract(
            tokenABI,
            tokenContract.toLowerCase()
        );
        let tx_builder = token.methods.transfer(toAddress, amount);
        var excoded_tx = tx_builder.encodeABI();
        let transObj = {
            gas: 300000,
            data: excoded_tx,
            from: fromAddress,
            to: tokenContract,
        };
        web3.eth.accounts.signTransaction(
            transObj,
            privateKey,
            (error, signedTx) => {
                if (error) {
                    console.log("ERROR: ", error.message);
                } else {
                    web3.eth
                        .sendSignedTransaction(signedTx.rawTransaction)
                        .on("receipt", () => {
                            console.log("Sent !!");
                        });
                }
            }
        );
    } catch (err) {
        console.log(err);
        console.log("Error!! " + err.message);
    }
};

// module.exports = {
//   getToken,
//   getAmountsOut,
//   getDecimals,
//   getBalanceOfToken,
//   approve,
//   swap,
//   sendETH,
//   sendTOKEN,
// };
