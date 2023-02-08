import { useState } from "react";

const useDarkmode = () => {
    const [darkmode, setDarkmode] = useState(false);

    const toggleDarkmode = (e) => {
        e.preventDefault();
        setDarkmode(!darkmode);
    };

    return { darkmode, toggleDarkmode }
}

export default useDarkmode;