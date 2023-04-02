import { useEffect, useState } from "react";
import SettingNav from "../components/section/SettingNav";
import ProtectedLayout from "../layout/ProtectedLayout";
import SettingNotifications from "./settings/Notifications";
import SettingPayments from "./settings/Payments";
import SettingProfile from "./settings/Profile";
import SettingSecurity from "./settings/Security";

const Settings = ({ activeUser, token, removeToken, reloadUser }) => {
    const [activeTab, setActiveTab] = useState("index");

    const pathname = window.location.href.split("=")[1];

    useEffect(() => {
        setActiveTab(pathname ? pathname : "index");
    }, [pathname]);

    const changeTab = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <ProtectedLayout
            navTitle="Settings"
            user={activeUser}
            removeToken={removeToken}
        >
            <section className="settingSection">
                <SettingNav active={activeTab} changeTab={changeTab} />

                {activeTab === "index" && (
                    <SettingProfile
                        activeUser={activeUser}
                        token={token}
                        reloadUser={reloadUser}
                    />
                )}
                {activeTab === "security" && (
                    <SettingSecurity
                        activeUser={activeUser}
                        token={token}
                        reloadUser={reloadUser}
                    />
                )}
                {activeTab === "notification" && (
                    <SettingNotifications
                        activeUser={activeUser}
                        token={token}
                        reloadUser={reloadUser}
                    />
                )}
                {activeTab === "payment" && (
                    <SettingPayments
                        activeUser={activeUser}
                        token={token}
                        reloadUser={reloadUser}
                    />
                )}

                {/* <div className="settingsButtonDiv">
                    <button onClick={toggleModal}>Update Settings</button>
                    <button>Cancel</button>
                </div> */}
                <br />
                <br />
                <br />
            </section>
        </ProtectedLayout>
    );
};

export default Settings;
