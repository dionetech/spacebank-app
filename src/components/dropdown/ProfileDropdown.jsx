import { Link } from "react-router-dom";
import { IoIosRedo, IoIosUndo } from "react-icons/io";
import { BiLogOut, BiCog } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

const ProfileDropdown = ({ toggleModal }) => {

    return (
        <>
            <div className="dropdownContent profileDropdown">
                <div className="dropdownCard">
                    <Link to="/settings" className="active">
                        <BiCog /> Account Settings
                    </Link>
                    <Link to="/settings/authentication">
                        <AiOutlineUser /> Authentication
                    </Link>
                    <Link to="/user/dealings/recharge">
                        <IoIosRedo /> Quick deposit
                    </Link>
                    <Link to="/transactions/new/transfer">
                        <IoIosUndo /> Send Money
                    </Link>
                    <Link to="/logout" onClick={toggleModal}>
                        <BiLogOut /> Log out
                    </Link>
                </div>
            </div>
        </>
    )
}

export default ProfileDropdown;