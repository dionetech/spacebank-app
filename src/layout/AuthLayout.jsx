import { ToastContainer } from "react-toastify";
import Navbar from "../components/nav/auth/Navbar";

const AuthLayout = ({ children, register, imageURL }) => {
    return (
        <div className="App authApp">
            <ToastContainer />
            <section className="authSection">
                <div className="row justify-content-center">
                    <div className={register?"col-md-6 col-sm-10":"col-md-6 col-sm-8"}>
                        <Navbar
                            register={register}
                        />
                        {children}
                    </div>
                    <div className="col-md-6" id="authGradientCol">
                        <div className="sticky-top authGradientDiv" style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url("${imageURL}")` }}>
                            <div>
                                <h4>Powerfully online banking built for small business. See why over 160,000 businesses trust us.</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AuthLayout;