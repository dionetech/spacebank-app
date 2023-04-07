import { useCycle } from "framer-motion";
import SecuritySettingsModal from "../../components/modal/SecuritySettingsModal";
import { convertDate } from "../../utils/convertDate";

const SettingSecurity = ({ activeUser, token, reloadUser }) => {
    const [openModal, cycleOpenModal] = useCycle(false, true);

    return (
        <section className="profileSettingsDiv">
            <SecuritySettingsModal
                user={activeUser}
                cycleOpenModal={cycleOpenModal}
                openModal={openModal}
                token={token}
                reloadUser={reloadUser}
            />
            <>
                <h4>Security details</h4>
                <div className="settingDetailsDiv">
                    <ul>
                        <li>
                            <span>Current password</span>
                            <p>************</p>
                        </li>
                        <li>
                            <span>Security questions</span>
                            <p>
                                {activeUser.security
                                    ? activeUser.security.security_question
                                        ? activeUser.security.security_question
                                              .question
                                        : "Not set"
                                    : "Not set"}
                            </p>
                        </li>
                        <li>
                            <span>2-Step verification</span>
                            <p>
                                {activeUser.security
                                    ? activeUser.security.twoStepVerification
                                        ? "Enabled"
                                        : "Disabled"
                                    : "Disabled"}
                            </p>
                        </li>
                    </ul>
                </div>
            </>
            <div className="spacingDiv" />
            <>
                <h4>Login sessions</h4>
                <div className="settingDetailsDiv">
                    <ul>
                        {activeUser.sessions.map((session) => {
                            return (
                                <li key={session._id}>
                                    <span>
                                        {convertDate(
                                            session.createdAt,
                                            "fulldate"
                                        )}{" "}
                                        at{" "}
                                        {convertDate(session.createdAt, "time")}
                                    </span>
                                    <p>
                                        {session.deviceInfo.userAgent.slice(
                                            0,
                                            41
                                        )}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </>
            <div className="settingsButtonDiv">
                <button onClick={cycleOpenModal}>Update Security</button>
            </div>
        </section>
    );
};

export default SettingSecurity;
