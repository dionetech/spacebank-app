import AuthLayout from "../layout/AuthLayout";
import Header from "../layout/Header";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";
import { API_URL, BEARER_TOKEN, errorToast } from "../config";

const imageURL = "https://res.cloudinary.com/ruthless-labs/image/upload/v1671774795/spacebank/iia8vayzldtkpbpd4mbc.webp";

const Verify = () => {

    const [code, setCode] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const emailExist = window.localStorage.getItem("verifyEmail");
        if (!emailExist){
            console.log("NO EMAIL");
        }
    }, [])

    const verifyEmail = (e) => {
        e.preventDefault();

        setProcessing(true);
        axios({
            method: "POST",
            url: `${API_URL}/auth/verify`,
            data: { email: window.localStorage.getItem("verifyEmail"), otp: parseInt(code) },
            headers: {
                'Authorization': BEARER_TOKEN,
            },
        })
        .then((res) => {
            setProcessing(false);
            console.log("RES: ", res);
            if (res.data.error){
                errorToast(res.data.message);
            }else{
                successToast("Email successfully confirmed");
                window.localStorage.removeItem("verifyEmail");
            }
        })
        .catch((error) => {
            setProcessing(false);
            console.log("Error: ", error);
            errorToast("An error occured, try again");
        })
    }

	return (
		<>
			<Header />
            <AuthLayout
                register={true}
                imageURL={imageURL}
            >
            <section className="authLoginSection">
                <div>
                    <>
                        <h2>Verify email</h2>
                        <p>An OTP has been sent to your email for confirmation</p>

                        <div className="authRegisterDiv">
                            <form onSubmit={verifyEmail}>
                                <div className="form-group customFormGroup">
                                    <label htmlFor="sbCode" className="customLabel">OTP Code</label>
                                    <input
                                        type="number"
                                        placeholder=""
                                        id="sbCode"
                                        name="sbCode"
                                        required
                                        className="form-control customInput signUp"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </div>
                                <div className="authButtonDiv">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        disabled={processing}
                                        className="spin"
                                    >{processing?<ImSpinner8 />:"Verify Email"}</motion.button>
                                </div>
                            </form>
                        </div>
                    </>
                </div>
            </section>
            </AuthLayout>
		</>
	)
}

export default Verify;