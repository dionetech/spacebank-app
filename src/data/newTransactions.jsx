import { BsPhoneVibrate } from "react-icons/bs";
import { AiOutlineGift } from "react-icons/ai";
import { GiReceiveMoney } from "react-icons/gi";
import { FaPaperPlane } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { RiPlantLine } from "react-icons/ri";

export const transactionsLists = [
    {
        title: "Send Money",
        subTitle: "Account to account",
        icon: <FaPaperPlane />,
        color: "#fc5185",
        link: "/transactions/new/transfer"
    },
    {
        title: "Buy Airtime",
        subTitle: "Buy airtime from dealers",
        icon: <BsPhoneVibrate />,
        color: "#107a8b",
        link: "/transactions/new/airtime"
    },
    {
        title: "Gift Card",
        subTitle: "Buy gift cards from brands",
        icon: <AiOutlineGift />,
        color: "#f0d43a",
        link: "/transactions/new/giftcard"
    },
    {
        title: "Data Subscription",
        subTitle: "Buy data effortlessly",
        icon: <MdOutlinePayments />,
        color: "#7a57d1",
        link: "/transactions/new/data"
    },
    {
        title: "Investment",
        subTitle: "Invest your money in stocks",
        icon: <RiPlantLine />,
        color: "#ed733f",
        link: "/transactions/new/invest"
    },
    {
        title: "Savings",
        subTitle: "Save money with interest",
        icon: <GiReceiveMoney />,
        color: "#10316b",
        link: "/transactions/new/save"
    },
]