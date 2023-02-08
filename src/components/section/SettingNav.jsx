import { BiLock, BiUserCircle } from "react-icons/bi";
import { MdPayments } from "react-icons/md";
import { VscBell } from "react-icons/vsc";
import { Link } from "react-router-dom";

const SettingNav = ({ active }) => {
    return (
        <div className="settingNavDiv">
            <nav className="settingNav">
                <ul>
                    <li><Link to="/app/settings" className={active==="index"?"active":""}><BiUserCircle /><i>Profile</i></Link></li>
                    <li><Link to="/app/settings/security" className={active==="security"?"active":""}><BiLock /><i>Security</i></Link></li>
                    <li><Link to="/app/settings/notification" className={active==="notification"?"active":""}><VscBell /><i>Notifications</i></Link></li>
                    <li><Link to="/app/settings/payment" className={active==="payment"?"active":""}><MdPayments /><i>Payments</i></Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default SettingNav;