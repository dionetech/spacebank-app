import { useState } from "react";
import GiftCardBox from "../../components/card/GiftCardBox";
import { localGiftCard } from "../../data/giftCard";
import ProtectedLayout from "../../layout/ProtectedLayout";

const GiftCard = ({ activeUser, token, removeToken, convertDate }) => {

    const [activeTab, setActiveTab] = useState("local");
    const [a, setA] = useState([]);

    return (
        <ProtectedLayout
            navTitle="Gift Card"
            user={activeUser}
            removeToken={removeToken}
        >
            <section className="transactionSection giftCardSection">
                <nav className="giftCardNav">
                    <ul>
                        <li
                            className={activeTab==="local"?"active":""}
                            onClick={() => setActiveTab("local")}
                        >Local</li>
                        <li
                            className={activeTab==="international"?"active":""}
                            onClick={() => setActiveTab("international")}
                        >International</li>
                    </ul>
                </nav>

                <div className="giftCardContent">
                {
                    activeTab==="local"&&(
                        <LocalGiftCards />
                    )
                }
                {
                    activeTab==="international"&&(
                        <InternationalGiftCards />
                    )
                }
                </div>
            </section>
        </ProtectedLayout>
    )
}

const InternationalGiftCards = () => {

    const [country, setCountry] = useState("");

    return (
        <>
            <div className="">
                <form>
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="form-group">
                                <select
                                    id="spacebankNetwork"
                                    name="spacebankNetwork"
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="form-control selectDropdown"
                                    defaultValue={country}
                                >
                                    <option value="">USA</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="form-group">
                                <input
                                    type="search"
                                    className="form-control customInput appInput"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

const LocalGiftCards = () => {
    return (
        <>
            <div className="row">
            {
                localGiftCard.map((gcard, index) => {
                    return (
                        <div
                            className="col-xl-3"
                            key={index}
                        >
                            <GiftCardBox
                                gcard={gcard}
                            />
                        </div>
                    )
                })
            }
            </div>
        </>
    )
}

export default GiftCard;