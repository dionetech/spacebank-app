import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";
import { API_URL, errorToast, successToast } from "../../config";
import { securityQuestions } from "../../data/securityQuestions";

const SecuritySettingsModal = ({
    openModal,
    cycleOpenModal,
    user,
    token,
    reloadUser,
}) => {
    const [activeTab, setActiveTab] = useState("security");

    return (
        <AnimatePresence>
            {openModal && (
                <motion.div
                    className="fixed-top customBackdrop logoutBackdrop"
                    onClick={cycleOpenModal}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="customModal settingsModal"
                    >
                        <div className="modalNavTab">
                            <ul>
                                <li>
                                    <button
                                        className={
                                            activeTab === "security"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() => setActiveTab("security")}
                                    >
                                        Security
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={
                                            activeTab === "password"
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() => setActiveTab("password")}
                                    >
                                        Password
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={
                                            activeTab === "2fa" ? "active" : ""
                                        }
                                        onClick={() => setActiveTab("2fa")}
                                    >
                                        2-Factor Authentication
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="modalContent">
                            {activeTab === "security" ? (
                                <SecurityTab
                                    activeTab={activeTab}
                                    token={token}
                                    cycleOpenModal={cycleOpenModal}
                                    user={user}
                                    reloadUser={reloadUser}
                                />
                            ) : (
                                ""
                            )}
                            {activeTab === "password" ? (
                                <PasswordTab
                                    activeTab={activeTab}
                                    token={token}
                                    cycleOpenModal={cycleOpenModal}
                                    user={user}
                                    reloadUser={reloadUser}
                                />
                            ) : (
                                ""
                            )}
                            {activeTab === "2fa" ? (
                                <TwoFactorAuthentication
                                    activeTab={activeTab}
                                    token={token}
                                    cycleOpenModal={cycleOpenModal}
                                    user={user}
                                    reloadUser={reloadUser}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const SecurityTab = ({ token, user, reloadUser, cycleOpenModal }) => {
    const [securityQuestion, setSecurityQuestion] = useState(
        user.security.security_question
            ? user.security.security_question.question
            : securityQuestions[0]
    );
    const [answer, setAnswer] = useState(
        user.security.security_question
            ? user.security.security_question.answer
            : ""
    );
    const [securityNote, setSecurityNote] = useState(
        user.security.security_note ? user.security.security_note : ""
    );
    const [processing, setProcessing] = useState(false);

    const updateSecuritySettings = (e) => {
        e.preventDefault();
        setProcessing(true);

        axios({
            method: "PUT",
            data: { securityQuestion, answer, securityNote },
            url: `${API_URL}/users/${user.user._id}/security-setting`,
            headers: {
                "x-auth-token": token,
            },
        })
            .then((res) => {
                reloadUser();
                if (res.data.success) {
                    successToast("Security successfully updated");
                    setProcessing(false);
                    cycleOpenModal();
                }
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                setProcessing(false);
                errorToast("An error occured");
            });
    };

    return (
        <form onSubmit={updateSecuritySettings}>
            <div className="row">
                <div className="col-xl-6">
                    <div className="form-group">
                        <label
                            htmlFor="spacebankQuestion"
                            className="customLabel"
                        >
                            Security questions
                        </label>
                        <select
                            id="spacebankQuestion"
                            name="spacebankQuestion"
                            className="form-control selectDropdown"
                            defaultValue={securityQuestion}
                            onChange={(e) =>
                                setSecurityQuestion(e.target.value)
                            }
                        >
                            {securityQuestions.map((question, index) => {
                                return (
                                    <option key={index} value={question}>
                                        {question}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <div className="col-xl-6">
                    <div className="form-group">
                        <label
                            htmlFor="spacebankAnswer"
                            className="customLabel"
                        >
                            {securityQuestion}
                        </label>
                        <input
                            id="spacebankAnswer"
                            name="spacebankAnswer"
                            type="text"
                            required={true}
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control customInput appInput"
                        />
                    </div>
                </div>

                <div className="col-xl-12">
                    <br />
                    <div className="form-group">
                        <label
                            htmlFor="spacebankSecurityNote"
                            className="customLabel"
                        >
                            Security note
                        </label>
                        <input
                            id="spacebankSecurityNote"
                            name="spacebankSecurityNote"
                            type="text"
                            required={true}
                            value={securityNote}
                            onChange={(e) => setSecurityNote(e.target.value)}
                            className="form-control customInput appInput"
                        />
                    </div>
                </div>
            </div>
            <div className="buttonDiv">
                <button type="submit" className="spin" disabled={processing}>
                    {processing ? <ImSpinner8 /> : "Update Security"}
                </button>
            </div>
        </form>
    );
};

const PasswordTab = ({ token, user, reloadUser, cycleOpenModal }) => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [processing, setProcessing] = useState(false);

    const changePassword = (e) => {
        e.preventDefault();

        setProcessing(true);

        axios({
            method: "PUT",
            data: { password, newPassword },
            url: `${API_URL}/users/${user.user._id}/update-password`,
            headers: {
                "x-auth-token": token,
            },
        })
            .then((res) => {
                reloadUser();
                if (res.data.success) {
                    successToast("Password successfully updated");
                    setProcessing(false);
                    cycleOpenModal();
                }
            })
            .catch((error) => {
                // console.log("ERROR: ", error);
                try {
                    errorToast(error.response.data.error);
                } catch {
                    errorToast("An error occured");
                }
                setProcessing(false);
            });
    };

    return (
        <form onSubmit={changePassword}>
            <div className="row">
                <div className="col-xl-6">
                    <div className="form-group">
                        <label
                            htmlFor="spacebankPassword"
                            className="customLabel"
                        >
                            Current Password
                        </label>
                        <input
                            id="spacebankPassword"
                            name="spacebankPassword"
                            type="text"
                            required={true}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control customInput appInput"
                        />
                    </div>
                </div>

                <div className="col-xl-6">
                    <div className="form-group">
                        <label
                            htmlFor="spacebankNewPassword"
                            className="customLabel"
                        >
                            New Password
                        </label>
                        <input
                            id="spacebankPassword"
                            name="spacebankPassword"
                            type="text"
                            required={true}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control customInput appInput"
                        />
                    </div>
                </div>
            </div>
            <div className="buttonDiv">
                <button type="submit" className="spin" disabled={processing}>
                    {processing ? <ImSpinner8 /> : "Update Password"}
                </button>
            </div>
        </form>
    );
};

const TwoFactorAuthentication = ({
    token,
    user,
    reloadUser,
    cycleOpenModal,
}) => {
    return (
        <>
            <p>Enable Two Factor Authentication</p>
        </>
    );
};

export default SecuritySettingsModal;
