import { useState } from "react"
import { useEffect } from "react"

export default function CryptoIcons({ coin }) {

    const [imageURL, setImageURL] = useState("");

    useEffect(()=> {
        const tempCoin = coin.toLowerCase();
        if (tempCoin==="bnb"){
            setImageURL("https://crypto-icons-plus.netlify.app/img/binance-coin.1f249bb3.png");
        }
        if (tempCoin==="wbnb"){
            setImageURL("https://crypto-icons-plus.netlify.app/img/wbnb.6ad20d06.png");
        }
        if (tempCoin==="usdt"){
            setImageURL("https://crypto-icons-plus.netlify.app/img/tether.b5a07ae1.png");
        }
        if (tempCoin==="busd"){
            setImageURL("https://crypto-icons-plus.netlify.app/img/binance-usd.be95c500.png");
        }
        if (tempCoin==="usdc"){
            setImageURL("https://crypto-icons-plus.netlify.app/img/usd-coin.1019df29.png");
        }
    }, [])

    return (
        <img
            src={imageURL}
            style={{ width: "17px", height: "17px" }}
            alt="Account List Icon"
        />
    )
}