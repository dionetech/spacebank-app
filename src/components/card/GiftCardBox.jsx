import { useCycle } from "framer-motion";
import PurchaseGiftCard from "../modal/PurchaseGiftCard";

const GiftCardBox = ({ gcard, reloadUser, token, international }) => {
    const [gCardModal, cycleGCardModal] = useCycle(false, true);

    return (
        <>
            {!international ? (
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
                            <img src={gcard.image_url} alt={gcard.name} />
                        </div>
                        <div>
                            <h3>{gcard.name}</h3>
                            <p>{gcard.short_desc}</p>
                        </div>
                    </div>
                </>
            ) : (
                <InternationalGiftCardBox
                    gcard={gcard}
                    token={token}
                    reloadUser={reloadUser}
                />
            )}
        </>
    );
};

const InternationalGiftCardBox = ({ gcard, token, reloadUser }) => {
    const [gCardModal, cycleGCardModal] = useCycle(false, true);

    return (
        <>
            <PurchaseGiftCard
                gcard={gcard}
                gCardModal={gCardModal}
                cycleGCardModal={cycleGCardModal}
                token={token}
                reloadUser={reloadUser}
                international={true}
            />
            <div
                className="giftCardBox"
                title={gcard.name}
                onClick={cycleGCardModal}
            >
                <div>
                    <img src={gcard.logoUrls[0]} alt={gcard.productName} />
                </div>
                <div>
                    <h3>{gcard.productName}</h3>
                    <p>{gcard.country.name}</p>
                </div>
            </div>
        </>
    );
};

export default GiftCardBox;
