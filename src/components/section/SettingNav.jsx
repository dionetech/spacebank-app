import { BiLock, BiUserCircle } from "react-icons/bi";
import { VscBell } from "react-icons/vsc";
import { Link } from "react-router-dom";

const SettingNav = ({ active, changeTab }) => {
    return (
        <div className="settingNavDiv">
            <nav className="settingNav">
                <ul>
                    <li>
                        <Link
                            to="/settings"
                            className={active === "index" ? "active" : ""}
                            onClick={() => changeTab("index")}
                        >
                            <BiUserCircle />
                            <i>Profile</i>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/settings?tab=security"
                            className={active === "security" ? "active" : ""}
                            onClick={() => changeTab("security")}
                        >
                            <BiLock />
                            <i>Security</i>
                        </Link>
                    </li>
                    {/* <li>
                        <Link
                            to="/settings?tab=notification"
                            className={
                                active === "notification" ? "active" : ""
                            }
                            onClick={() => changeTab("notification")}
                        >
                            <VscBell />
                            <i>Notifications</i>
                        </Link>
                    </li> */}
                    {/* <li>
                        <Link
                            to="/settings?tab=payment"
                            className={active === "payment" ? "active" : ""}
                            onClick={() => changeTab("payment")}
                        >
                            <MdPayments />
                            <i>Payments</i>
                        </Link>
                    </li> */}
                </ul>
            </nav>
        </div>
    );
};

export default SettingNav;
