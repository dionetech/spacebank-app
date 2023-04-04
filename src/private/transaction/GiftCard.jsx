import { useState } from "react";
import { createFilter } from "react-search-input";
import GiftCardBox from "../../components/card/GiftCardBox";
import { localGiftCard } from "../../data/giftCard";
import {
    usGiftCard,
    frGiftCard,
    ghGiftCard,
    itGiftCard,
    keGiftCard,
    mxGiftCard,
    ngGiftCard,
    ptGiftCard,
    zaGiftCard,
    esGiftCard,
    gbGiftCard,
    zmGiftCard,
} from "../../data/itGiftCard";
import ProtectedLayout from "../../layout/ProtectedLayout";

const internationalCountries = [
    {
        country: "United States",
        code: "US",
    },
    {
        country: "France",
        code: "FR",
    },
    {
        country: "Ghana",
        code: "GH",
    },
    {
        country: "Italy",
        code: "IT",
    },
    {
        country: "Kenya",
        code: "KE",
    },
    {
        country: "Mexico",
        code: "MX",
    },
    {
        country: "Nigeria",
        code: "NG",
    },
    {
        country: "Portugal",
        code: "PT",
    },
    {
        country: "South Africa",
        code: "ZA",
    },
    {
        country: "Spain",
        code: "ES",
    },
    {
        country: "United Kingdom",
        code: "GB",
    },
    {
        country: "Zambia",
        code: "ZM",
    },
];

const GiftCard = ({ activeUser, token, reloadUser, removeToken }) => {
    const [activeTab, setActiveTab] = useState("local");

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
                            className={activeTab === "local" ? "active" : ""}
                            onClick={() => setActiveTab("local")}
                        >
                            Local
                        </li>
                        <li
                            className={
                                activeTab === "international" ? "active" : ""
                            }
                            onClick={() => setActiveTab("international")}
                        >
                            International
                        </li>
                    </ul>
                </nav>

                <div className="giftCardContent">
                    {activeTab === "local" && (
                        <LocalGiftCards reloadUser={reloadUser} token={token} />
                    )}
                    {activeTab === "international" && (
                        <InternationalGiftCards
                            reloadUser={reloadUser}
                            token={token}
                        />
                    )}
                </div>
            </section>
        </ProtectedLayout>
    );
};

const KEYS_TO_FILTERS = ["productName"];

const InternationalGiftCards = ({ token, reloadUser }) => {
    const [country, setCountry] = useState("US");
    const [giftCardList, setGiftCardList] = useState(usGiftCard);
    const [searchInput, setSearchInput] = useState("");

    const filteredGiftCard = giftCardList.filter(
        createFilter(searchInput, KEYS_TO_FILTERS)
    );

    const changeCountry = (e) => {
        setCountry(e.target.value);
        if (e.target.value === "US") {
            setGiftCardList(usGiftCard);
        }
        if (e.target.value === "FR") {
            setGiftCardList(frGiftCard);
        }
        if (e.target.value === "GH") {
            setGiftCardList(ghGiftCard);
        }
        if (e.target.value === "IT") {
            setGiftCardList(itGiftCard);
        }
        if (e.target.value === "KE") {
            setGiftCardList(keGiftCard);
        }
        if (e.target.value === "MX") {
            setGiftCardList(mxGiftCard);
        }
        if (e.target.value === "NG") {
            setGiftCardList(ngGiftCard);
        }
        if (e.target.value === "PT") {
            setGiftCardList(ptGiftCard);
        }
        if (e.target.value === "ZA") {
            setGiftCardList(zaGiftCard);
        }
        if (e.target.value === "ES") {
            setGiftCardList(esGiftCard);
        }
        if (e.target.value === "GB") {
            setGiftCardList(gbGiftCard);
        }
        if (e.target.value === "ZM") {
            setGiftCardList(zmGiftCard);
        }
    };

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
                                    className="form-control selectDropdown"
                                    defaultValue={country}
                                    onChange={changeCountry}
                                >
                                    {internationalCountries.map(
                                        (country, index) => {
                                            return (
                                                <option
                                                    value={country.code}
                                                    key={index}
                                                >
                                                    {country.country}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="form-group">
                                <input
                                    type="search"
                                    className="form-control customInput appInput"
                                    placeholder="Search Giftcards"
                                    value={searchInput}
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <br />
            <div className="row">
                {filteredGiftCard.map((gcard, index) => {
                    return (
                        <div
                            className="col-lg-3 col-md-4 col-sm-4 col-6"
                            key={index}
                        >
                            <GiftCardBox
                                gcard={gcard}
                                token={token}
                                reloadUser={reloadUser}
                                international={true}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

const LocalGiftCards = ({ token, reloadUser }) => {
    return (
        <>
            <div className="row">
                {localGiftCard.map((gcard, index) => {
                    return (
                        <div
                            className="col-lg-3 col-md-4 col-sm-4 col-6"
                            key={index}
                        >
                            <GiftCardBox
                                gcard={gcard}
                                token={token}
                                reloadUser={reloadUser}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default GiftCard;
