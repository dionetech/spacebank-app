import { useCycle } from "framer-motion";
import ProfileSettingsModal from "../components/modal/ProfileSettingsModal";
import SettingNav from "../components/section/SettingNav";
import ProtectedLayout from "../layout/ProtectedLayout";
import { convertDate } from "../utils/convertDate";

const Settings = ({ activeUser, token, removeToken }) => {
  const [openModal, cycleOpenModal] = useCycle(false, true);

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

        <SettingNav active="index" />

        <section className="profileSettingsDiv">
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
                  <p>
                    {activeUser.user.gender
                      ? `${activeUser.user.gender}`
                      : "Not set"}
                  </p>
                </li>
                <li>
                  <span>Date of birth</span>
                  <p>
                    {activeUser.user.dob
                      ? `${convertDate(activeUser.user.dob, "fulldate")}`
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
        </section>
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
