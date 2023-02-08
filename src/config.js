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

export const API_URL = "https://api.myspacebank.com/private-api/v1";
export const IMG_URL = "https://image.tmdb.org/t/p";
export const COOKIE_NAME = "spacebank__cookiename";
export const COOKIE_PASSWORD = "ake#LACHI8899andChikabamdhkgmhkfgfnmkhmkfgmknompkpomidu";
export const BEARER_TOKEN = "nkdoe6209912028vcsasyet51";
export const successToast = (success) => toast.success(`${success}`, TS_STYLE);
export const errorToast = (error) => toast.error(`${error}`, TS_STYLE);
export const warningToast = (error) => toast.warning(`${error}`, TS_STYLE);