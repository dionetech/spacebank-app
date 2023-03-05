import { useEffect, useState } from "react";
import { convertDate } from "../../../utils/convertDate";
import MobileTrCard from "./MobileTrCard";

const TrByDate = ({ date, transactions }) => {

    const [trList, setTrList] = useState([]);

    useEffect(() => {
        const dummyTrList = [];

        transactions.map((tr) => {
            if (String(convertDate(tr.createdAt, "ddmmyy")) === String(date)){
                dummyTrList.push(tr);
            }
        })

        setTrList(dummyTrList);
    }, [ transactions ])

    return (
        <>
        {
            trList.length!==0&&(
            <div className="trByDate">
                <div className="header">
                    <h4>{date}</h4>
                </div>

                <div className="content">
                    <ul>
                    {
                        trList.map((tr, index) => {
                            return (
                                <MobileTrCard
                                    key={index}
                                    tr={tr}
                                />
                            )
                        })
                    }
                    </ul>
                </div>
            </div>
            )
        }
        </>
    )
}

export default TrByDate;