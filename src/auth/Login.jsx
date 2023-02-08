import AuthLayout from "../layout/AuthLayout";
import Header from "../layout/Header";
import { useState } from "react";
import { MdOutlineLaptopWindows } from "react-icons/md";
import { motion } from "framer-motion";
import axios from "axios";
import { ImSpinner8 } from "react-icons/im";
import { Link } from "react-router-dom";
import { API_URL, BEARER_TOKEN, errorToast, successToast } from "../config";

const imageURL = "https://res.cloudinary.com/ruthless-labs/image/upload/v1671774864/spacebank/yni73yocqg0ope3iifqm.webp";

const Login = ({ setToken }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currentDiv, setCurrentDiv] = useState("input");
    const [processing, setProcessing] = useState(false);

    const loginUser = (e) => {
        e.preventDefault();

        setProcessing(true);

        axios({
            method: "POST",
            url: `${API_URL}/auth/login`,
            data: { email, password },
            headers: {
                'Authorization': BEARER_TOKEN,
            },
        })
        .then((res) => {
            const token = res.data.token;
            axios({
                method: "POST",
                url: `${API_URL}/user`,
                data: {
                    token: token
                },
                headers: {
                    'Authorization': BEARER_TOKEN,
                },
            })
            .then(async(res) => {
                successToast("Login successful")
                setToken(token, res.data.data);
                setProcessing(false);
            })
            .catch((error) => {
                setProcessing(false);
                console.log("SECOND ERROR: ", error);
                errorToast("An error occured, try again");
            })
        })
        .catch((error) => {
            setProcessing(false);
            console.log("INITIAL ERROR: ", error);
            errorToast("An error occured, try again");
        })
    }

	return (
		<>
			<Header />
            <AuthLayout imageURL={imageURL}>
                <section className="authLoginSection">
                    <div>
                    {
                        currentDiv==="qrcode"?
                        <>
                            <h2>Log in with QR code</h2>
                            <p>Scan this code with the mobile app to log in instantly</p>
                            <div className="qrCodeDiv">
                                <img
                                    src="https://res.cloudinary.com/ruthless-labs/image/upload/v1667381126/spacebank/ndiqqise52of1u5sxbnt.svg"
                                    alt="QrCode"
                                    width={150}
                                    height={150}
                                />
                            </div>

                            <div className="buttonDiv">
                                <button onClick={() => setCurrentDiv("emailandnumber")}>
                                    <MdOutlineLaptopWindows /> Log in with email or phone number
                                </button>
                            </div>
                        </>:
                        <>
                            <h2>Log in</h2>
                            <p>Enter a proper email address and password to get started</p>

                            <div className="authRegisterDiv">
                                <form onSubmit={loginUser}>
                                    <div className="form-group customFormGroup">
                                        <label htmlFor="sbEmail" className="customLabel">Email</label>
                                        <input
                                            type="email"
                                            placeholder=""
                                            id="sbEmail"
                                            name="sbEmail"
                                            required
                                            className="form-control customInput signUp"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group customFormGroup">
                                        <label htmlFor="sbPassword" className="customLabel">Password</label>
                                        <input
                                            type="password"
                                            placeholder=""
                                            id="sbPassword"
                                            name="sbPassword"
                                            required
                                            className="form-control customInput signUp"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div className="forgottenPasswordDiv">
                                            <Link to="/auth/recover">Forgotten password?</Link>
                                        </div>
                                    </div>
                                    <div className="authButtonDiv">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            disabled={processing}
                                            className="spin"
                                        >{processing?<ImSpinner8 />:"Log in"}</motion.button>
                                    </div>
                                </form>
                            </div>
                        </>
                    }
                    </div>

                    <div className="noAccountDiv">
                        <span>You don&apos;t have an account? <Link to="/auth/register">Create an account</Link></span>
                    </div>
                </section>
            </AuthLayout>
		</>
	)
}

export default Login;