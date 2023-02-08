import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaGlobeAsia } from "react-icons/fa";
import { navFooterList } from "../../../data/sidebarList";

const Footer = () => {

    const [activeURL, setActiveURL] = useState("");

    useEffect(() => {
        const pathname = window.location.pathname.split("/")[1];
        console.log("OFF: ", pathname);
        setActiveURL(pathname);
    }, [])

    return (
        <>
        <footer className="appCustomFooter">
            <ul>
                <div>
                    <li>
                        <Link to="/privacy-policy">
                            Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link to="/license">
                            License
                        </Link>
                    </li>
                    <li>
                        <Link to="/api">
                            API
                        </Link>
                    </li>
                    <li>
                        <Link to="/help">
                            Help Center
                        </Link>
                    </li>
                </div>
                <div className="secondDiv">
                    <li>
                        <Link to="/language">
                            English <FaGlobeAsia />
                        </Link>
                    </li>
                </div>
            </ul>
        </footer>
        <footer className="appCustomFoooterNav">
            <ul>
                {
                    navFooterList.map((item, index) => {
                        return (
                        <li key={index}>
                            <Link
                                to={`${item.link}`}
                                className={activeURL===item.activeName?"active":""}
                            >
                                {item.icon}
                            </Link>
                        </li>
                        )
                    })
                }
            </ul>
        </footer>
        </>
    )
}

export default Footer;