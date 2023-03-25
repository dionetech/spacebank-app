import { convertDate } from "../../utils/convertDate";

const SettingNotifications = ({ activeUser }) => {
    return (
        <section className="profileSettingsDiv">
            <>
                <h4>Notifications</h4>
                <div className="settingDetailsDiv">
                    <ul>
                        <li>
                            <span>Product updates</span>
                            <p>Receive messages from our platform</p>
                        </li>
                        <li>
                            <span>Promotion and tips</span>
                            <p>Receive coupons, promotions, surveys</p>
                        </li>
                    </ul>
                </div>
            </>
        </section>
    );
};

export default SettingNotifications;
