import { Link } from "react-router-dom";
import { IoIosRedo, IoIosUndo } from "react-icons/io";
import { BiLogOut, BiCog } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

const ProfileDropdown = ({ cycleOpenModal, removeToken }) => {
    const logUserOut = (e) => {
        e.preventDefault();
        removeToken();
        cycleOpenModal();
    };

    return (
        <>
            <div className="dropdownContent profileDropdown">
                <div className="dropdownCard">
                    <Link to="/settings" className="active">
                        <BiCog /> Profile Settings
                    </Link>
                    <Link to="/transactions">
                        <IoIosRedo /> Transactions
                    </Link>
                    <Link to="/transactions/new/transfer">
                        <IoIosUndo /> Send Money
                    </Link>
                    <Link to="/logout" onClick={logUserOut}>
                        <BiLogOut /> Log out
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ProfileDropdown;
