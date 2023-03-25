import { useCycle } from "framer-motion";
import { useEffect, useState } from "react";
import ProfileSettingsModal from "../components/modal/ProfileSettingsModal";
import SettingNav from "../components/section/SettingNav";
import ProtectedLayout from "../layout/ProtectedLayout";
import SettingNotifications from "./settings/Notifications";
import SettingPayments from "./settings/Payments";
import SettingProfile from "./settings/Profile";
import SettingSecurity from "./settings/Security";

const Settings = ({ activeUser, token, removeToken }) => {
    const [openModal, cycleOpenModal] = useCycle(false, true);
    const [activeTab, setActiveTab] = useState("");

    const pathname = window.location.href.split("=")[1];

    useEffect(() => {
        setActiveTab(pathname ? pathname : "index");
    }, [pathname]);

    const changeTab = (tabName) => {
        setActiveTab(tabName);
    };

    const toggleModal = (e) => {
        e.preventDefault();
        cycleOpenModal();
    };

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

                <SettingNav active={activeTab} changeTab={changeTab} />

                {activeTab === "index" && (
                    <SettingProfile activeUser={activeUser} />
                )}
                {activeTab === "security" && (
                    <SettingSecurity activeUser={activeUser} />
                )}
                {activeTab === "notification" && (
                    <SettingNotifications activeUser={activeUser} />
                )}
                {activeTab === "payment" && (
                    <SettingPayments activeUser={activeUser} />
                )}

                <div className="settingsButtonDiv">
                    <button onClick={toggleModal}>Update Settings</button>
                    <button>Cancel</button>
                </div>
                <br />
                <br />
                <br />
            </section>
        </ProtectedLayout>
    );
};

export default Settings;
