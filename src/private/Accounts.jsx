import ProtectedLayout from "../layout/ProtectedLayout";
import { successToast } from "../config";

const Accounts = ({ activeUser, token, reloadUser, removeToken }) => {
    const copyAddress = (e) => {
        e.preventDefault();
        if (navigator.clipboard) {
            window.navigator.clipboard.writeText(
                activeUser.user.wallet.address
            );
            successToast("Wallet address successfully copied");
        } else {
            alert(`Copy Address: ${activeUser.user.wallet.address}`);
        }
    };

    return (
        <ProtectedLayout
            navTitle="Accounts"
            user={activeUser}
            removeToken={removeToken}
        >
            <section className="dashboardSection">
                <div className="dashboardHeader"></div>
                <div className="dashboardContent">
                    <div className="row">
                        <div className="col-lg-6 col-md-6"></div>
                    </div>
                </div>
            </section>
        </ProtectedLayout>
    );
};

export default Accounts;
