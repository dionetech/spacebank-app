const SettingSecurity = ({ activeUser }) => {
    return (
        <section className="profileSettingsDiv">
            <>
                <h4>Login Details</h4>
                <div className="settingDetailsDiv">
                    <ul>
                        <li>
                            <span>Current password</span>
                            <p>************</p>
                        </li>
                        <li>
                            <span>Security questions</span>
                            <p>Your fathers name</p>
                        </li>
                        <li>
                            <span>2-Step verification</span>
                            <p>Enabled</p>
                        </li>
                    </ul>
                </div>
            </>
            <div className="spacingDiv" />
            <>
                <h4>Security credentials</h4>
                <div className="settingDetailsDiv">
                    <ul>
                        <li>
                            <span>01 Apr 2021 at 06:25PM</span>
                            <p>Mac OS Safari 15.1</p>
                        </li>
                        <li>
                            <span>20 Oct 2021 at 04:32AM</span>
                            <p>Windows 11 Mozilla Firefox</p>
                        </li>
                        <li>
                            <span>01 Apr 2021 at 06:25PM</span>
                            <p>iOS Safari 15.1</p>
                        </li>
                    </ul>
                </div>
            </>
        </section>
    );
};

export default SettingSecurity;
