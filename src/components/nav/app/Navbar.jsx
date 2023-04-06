import ProfileDropdown from "../../dropdown/ProfileDropdown";
import LogoutModal from "../../modal/LogoutModal";
import { useCycle } from "framer-motion";
import { useState } from "react";

const Navbar = ({ navTitle, toggleDarkmode, user, removeToken }) => {
    const [openModal, cycleOpenModal] = useCycle(false, true);
    const [ifImageError, setIfImageError] = useState(false);

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
                        {/* <form>
                            <input
                                type="search"
                                className="form-control searchInput"
                                placeholder="Type to search ..."
                            />
                        </form>
                        <li>
                            <Link href="/darkmode" id="bellIcon">
                                <a href="/darkmode" onClick={toggleDarkmode}><BiMoon /></a>
                            </Link>
                        </li> */}
                        <li>
                            <span>Hi, {user.username}</span>
                        </li>
                        <li className="customDropdown profile">
                            {!ifImageError ? (
                                <img
                                    src={user.profilePhoto}
                                    alt="User Image"
                                    style={{ width: "30px", height: "30px" }}
                                    onError={() => setIfImageError(true)}
                                />
                            ) : (
                                <div className="replaceNavImg"></div>
                            )}
                            <ProfileDropdown
                                removeToken={removeToken}
                                cycleOpenModal={cycleOpenModal}
                            />
                        </li>
                    </div>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
