import { Suspense } from "react"
import { ToastContainer } from "react-toastify";
import Footer from "../components/nav/app/Footer";
import Navbar from "../components/nav/app/Navbar";
import Sidebar from "../components/nav/app/Sidebar";
import useDarkmode from "../hooks/useDarkmode";
import AppLoader from "../utils/appLoader";

const ProtectedLayout = ({ children, navTitle, user, removeToken }) => {

    const { darkmode, toggleDarkmode } = useDarkmode();

    return (
        <Suspense fallback={<AppLoader />}>
            <ToastContainer />
            <div className={`App private ${darkmode?'darkmode':''}`}>
                <div className="row">
                    <div className="col-lg-3 col-md-2" id="appSidebarCol">
                        <Sidebar />
                    </div>
                    <div className="col-lg-9 col-md-10">
                        <Navbar
                            navTitle={navTitle}
                            toggleDarkmode={toggleDarkmode}
                            user={user.user}
                            removeToken={removeToken}
                        />
                        {children}
                        <Footer />
                    </div>
                </div>
            </div>
        </Suspense>
    )
}

export default ProtectedLayout;