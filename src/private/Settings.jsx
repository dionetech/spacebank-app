import { useCycle } from "framer-motion";
import { useEffect, useState } from "react";
import ProfileSettingsModal from "../components/modal/ProfileSettingsModal";
import SettingNav from "../components/section/SettingNav";
import ProtectedLayout from "../layout/ProtectedLayout";

const Settings = ({ activeUser, token, removeToken }) => {

    const [openModal, cycleOpenModal] = useCycle(false, true);

    const toggleModal = (e) => {
        e.preventDefault();
        cycleOpenModal();
    }

    return (
        <ProtectedLayout
            navTitle="Profile Settings"
            user={activeUser}
            removeToken={removeToken}
        >
            <section className="settingSection">

                <ProfileSettingsModal
                    user={activeUser}
                    cycleOpenModal={cycleOpenModal}
                    openModal={openModal}
                    token={token}
                />

                <SettingNav active="index" />

                <section className="profileSettingsDiv">
                    <>
                        <h4>Account Information</h4>
                        <div className="settingDetailsDiv">
                            <ul>
                                <li>
                                    <span>Full name</span>
                                    <p>{activeUser.fname} {activeUser.lname}</p>
                                </li>
                                <li>
                                    <span>Username</span>
                                    <p>{activeUser.username}</p>
                                </li>
                                <li>
                                    <span>Gender</span>
                                    <p>{activeUser.dob===null?"Not set":`${user.gender}`}</p>
                                </li>
                                <li>
                                    <span>Date of birth</span>
                                    <p>{activeUser.dob===null?"Not set":`${user.dob}`}</p>
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
                                    <p>{activeUser.email}</p>
                                </li>
                                <li>
                                    <span>Phone number</span>
                                    <p>{activeUser.phone}</p>
                                </li>
                                <li>
                                    <span>Address</span>
                                    <p>82233 Dicki View, South Pasqualview, RI 72234-3100</p>
                                </li>
                            </ul>
                        </div>
                    </>
                </section>
                <div className="settingsButtonDiv">
                    <button onClick={toggleModal}>Update Settings</button>
                    <button>Cancel</button>
                </div>
                <br /><br /><br />
            </section>
        </ProtectedLayout>
    )
}

export default Settings;