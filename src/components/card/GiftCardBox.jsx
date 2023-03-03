import { useCycle } from "framer-motion";
import PurchaseGiftCard from "../modal/PurchaseGiftCard";

const GiftCardBox = ({ gcard, reloadUser, token }) => {

    const [gCardModal, cycleGCardModal] = useCycle(false, true);

    return (
        <>
            <PurchaseGiftCard
                gcard={gcard}
                gCardModal={gCardModal}
                cycleGCardModal={cycleGCardModal}
                token={token}
                reloadUser={reloadUser}
            />
            <div
                className="giftCardBox"
                title={gcard.name}
                onClick={cycleGCardModal}
            >
                <div>
                    <img
                        src={gcard.image_url}
                        alt={gcard.name}
                    />
                </div>
                <div>
                    <h3>{gcard.name}</h3>
                    <p>{gcard.short_desc}</p>
                </div>
            </div>
        </>
    )
}

export default GiftCardBox;