import { Link } from "react-router-dom";
import { VscBell } from "react-icons/vsc";
import ProfileDropdown from "../../dropdown/ProfileDropdown";
import LogoutModal from "../../modal/LogoutModal";
import { useCycle } from "framer-motion";

const Navbar = ({ navTitle, toggleDarkmode, user, removeToken }) => {

    const [openModal, cycleOpenModal] = useCycle(false, true);

    return (
        <>
            <LogoutModal
                openModal={openModal}
                cycleOpenModal={cycleOpenModal}
            />
            <nav className="appCustomNavbar">
                <ul>
                    <div>
                        <li className="navbarTitle">{navTitle}</li>
                    </div>
                    <div>
                        <form>
                            <input
                                type="search"
                                className="form-control searchInput"
                                placeholder="Type to search ..."
                            />
                        </form>
                        <li>
                            <Link to="/notifications" id="bellIcon">
                                <VscBell />
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="/darkmode" id="bellIcon">
                                <a href="/darkmode" onClick={toggleDarkmode}><BiMoon /></a>
                            </Link>
                        </li> */}
                        <li className="customDropdown profile">
                            {
                                user.profilepic.split("/")[6]==="user.png"?
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
                                    alt="User Image"
                                    style={{ width: "10px", height: "10px" }}
                                />:
                                <img
                                    src={user.profilepic}
                                    alt="User Image"
                                    style={{ width: "30px", height: "30px" }}
                                />
                            }
                            <ProfileDropdown
                                removeToken={removeToken}
                                cycleOpenModal={cycleOpenModal}
                            />
                        </li>
                    </div>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;