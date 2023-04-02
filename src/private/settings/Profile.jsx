import { useCycle } from "framer-motion";
import ProfileSettingsModal from "../../components/modal/ProfileSettingsModal";
import { convertDate } from "../../utils/convertDate";

const SettingProfile = ({ activeUser, token, reloadUser }) => {
    const [openModal, cycleOpenModal] = useCycle(false, true);

    return (
        <section className="profileSettingsDiv">
            <ProfileSettingsModal
                user={activeUser}
                cycleOpenModal={cycleOpenModal}
                openModal={openModal}
                token={token}
                reloadUser={reloadUser}
            />
            <>
                <h4>Account Information</h4>
                <div className="settingDetailsDiv">
                    <ul>
                        <li>
                            <span>Full name</span>
                            <p>{activeUser.user.name}</p>
                        </li>
                        <li>
                            <span>Username</span>
                            <p>{activeUser.user.username}</p>
                        </li>
                        <li>
                            <span>Gender</span>
                            <p className="capitalize">
                                {activeUser.user.gender
                                    ? `${activeUser.user.gender}`
                                    : "Not set"}
                            </p>
                        </li>
                        <li>
                            <span>Date of birth</span>
                            <p>
                                {activeUser.user.dob
                                    ? `${convertDate(
                                          activeUser.user.dob,
                                          "fulldate"
                                      )}`
                                    : "Not set"}
                            </p>
                        </li>
                    </ul>
                </div>
            </>
            <div className="spacingDiv" />
            <>
                <h4>Contact Details</h4>
                <div className="settingDetailsDiv">
                    <ul>
                        <li>
                            <span>Email address</span>
                            <p>{activeUser.user.email}</p>
                        </li>
                        <li>
                            <span>Phone number</span>
                            <p>{activeUser.user.phoneNumber}</p>
                        </li>
                        <li>
                            <span>Address</span>
                            <p>
                                {activeUser.user.address
                                    ? activeUser.user.address
                                    : "Not Available"}
                            </p>
                        </li>
                    </ul>
                </div>
            </>
            <div className="settingsButtonDiv">
                <button onClick={cycleOpenModal}>Update Profile</button>
            </div>
        </section>
    );
};

export default SettingProfile;
