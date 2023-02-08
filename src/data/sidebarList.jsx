import { BiBarChart, BiNotepad, BiPieChart } from "react-icons/bi";
import { AiFillDollarCircle, AiFillEuroCircle, AiFillPoundCircle, AiOutlineAccountBook, AiOutlineBars, AiOutlineCreditCard, AiOutlineTrademarkCircle, AiOutlineTransaction } from "react-icons/ai";
import { GiCog } from "react-icons/gi";

export const navList = [
    {
        title: "Dashboard",
        icon: <BiPieChart />,
        link: "/"
    },
    {
        title: "Accounts",
        icon: <AiOutlineAccountBook />,
        link: "/accounts"
    },
    // {
    //     title: "Cards",
    //     icon: <AiOutlineCreditCard />,
    //     link: "/cards"
    // },
    {
        title: "Transactions",
        icon: <AiOutlineTransaction />,
        link: "/transactions"
    },
    // {
    //     title: "Invoicing",
    //     icon: <BiNotepad />,
    //     link: "/invoicing"
    // },
    // {
    //     title: "Trading",
    //     icon: <AiOutlineTrademarkCircle />,
    //     link: "/trading"
    // },
    {
        title: "Reports",
        icon: <BiBarChart />,
        link: "/reports"
    },
    {
        title: "Settings",
        icon: <GiCog />,
        link: "/settings"
    },
]

export const navFooterList = [
    {
        title: "Dashboard",
        icon: <BiPieChart />,
        link: "/",
        activeName: ""
    },
    // {
    //     title: "Cards",
    //     icon: <AiOutlineCreditCard />,
    //     link: "/cards",
    //     activeName: "cards",
    // },
    {
        title: "Transactions",
        icon: <AiOutlineTransaction />,
        link: "/transactions",
        activeName: "transactions",
    },
    {
        title: "Accounts",
        icon: <AiOutlineAccountBook />,
        link: "/accounts",
        activeName: "accounts",
    },
    // {
    //     title: "More",
    //     icon: <AiOutlineBars />,
    //     link: "/others",
    //     activeName: "others"
    // },
    {
        title: "Settings",
        icon: <GiCog />,
        link: "/settings",
        activeName: "settings"
    },
]

export const otherURL = [
    {
        title: "Accounts",
        icon: <AiOutlineAccountBook />,
        link: "/accounts"
    },
    {
        title: "Invoicing",
        icon: <BiNotepad />,
        link: "/invoicing"
    },
    {
        title: "Trading",
        icon: <AiOutlineTrademarkCircle />,
        link: "/trading"
    },
    {
        title: "Reports",
        icon: <BiBarChart />,
        link: "/reports"
    },
]

export const balanceList = [
    {
        title: "100,050.75 USD",
        icon: <AiFillDollarCircle />,
        link: "/app"
    },
    {
        title: "2310.40 EUR",
        icon: <AiFillEuroCircle />,
        link: "/reports"
    },
    {
        title: "9455.50 GBP",
        icon: <AiFillPoundCircle />,
        link: "/reports"
    },
]