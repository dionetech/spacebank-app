
const GiftCardBox = ({ gcard }) => {
    return (
        <div className="giftCardBox" title={gcard.name}>
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
    )
}

export default GiftCardBox;