import { toast } from "react-toastify";

const TS_STYLE = {
    position: "top-right",
    theme: "dark",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
}

export const API_URL = "https://spacebank-api.vercel.app/api/v1"; // https://spacebank-api.vercel.app/api/v1 //"https://spacebank-api-production.up.railway.app/api/v1"; //"http://localhost:6500/api/v1" // "https://api.myspacebank.com/private-api/v1";
export const IMG_URL = "https://image.tmdb.org/t/p";
export const COOKIE_NAME = "spacebank__cookiename";
export const COOKIE_PASSWORD = "ake#LACHI8899andChikabamdhkgmhkfgfnmkhmkfgmknompkpomidu";
export const BEARER_TOKEN = "nkdoe6209912028vcsasyet51";
export const successToast = (success) => toast.success(`${success}`, TS_STYLE);
export const errorToast = (error) => toast.error(`${error}`, TS_STYLE);
export const warningToast = (error) => toast.warning(`${error}`, TS_STYLE);
export const ADMIN_ADDRESS = "0x5Ff33aECECa7fB5cE9CbEfC14b2eD5C87B1B6836";
export const DOLLAR_BNB = 0.00301204819;
export const BNB_DOLLAR = 332;
export const DOLLAR_NAIRA = 755;