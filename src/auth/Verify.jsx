import AuthLayout from "../layout/AuthLayout";
import Header from "../layout/Header";
import { motion } from "framer-motion";
import { useState, useEffect, useReducer, useRef } from "react";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";
import { API_URL, BEARER_TOKEN, errorToast, successToast } from "../config";
import { Navigate } from "react-router-dom";

const imageURL = "https://res.cloudinary.com/ruthless-labs/image/upload/v1678007848/spacebank/vebkzacxodblspnrgluf.webp";

const Verify = () => {

    const [code, setCode] = useState("");
    const [processing, setProcessing] = useState(false);
    const [redirectToAuth, setRedirectToAuth] = useState(false);

    useEffect(() => {
        const emailExist = window.localStorage.getItem("verifyEmail");
        if (!emailExist){
            console.log("NO EMAIL");
            setRedirectToAuth(true);
        }
    }, [])

    const verifyEmail = (e) => {
        e.preventDefault();

        console.log("OTP CODE ENTERED: ", code);

        setProcessing(true);
        axios({
            method: "POST",
            url: `${API_URL}/auth/otp`,
            data: { email: window.localStorage.getItem("verifyEmail"), otp: code },
            headers: {
                'Authorization': BEARER_TOKEN,
            },
        })
        .then((res) => {
            setProcessing(false);
            if (res.data.success){
                successToast("Email successfully verified");
                setRedirectToAuth(true);
            }
        })
        .catch((error) => {
            setProcessing(false);
            console.log("Error: ", error);
            try{
                errorToast(error.response.data.error);
            }catch{
                errorToast("An error occured, try again");
            }
        })
    }

	return (
		<>
            {redirectToAuth?<Navigate to="/auth" />:""}
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

                                    <div className="inputFlexGroup">
                                        <CodeInput
                                            setCode={setCode}
                                        />
                                    </div>
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

const CodeInput = ({ setCode }) => {
    const itemsRef = useRef([]);
  
    const codeChangeHandler = (event) => {
        const [, codeFieldIndex] = event.target.name.split("-");
        let fieldIntIndex = parseInt(codeFieldIndex, 10);
        setCode((prevState) => prevState + event.target.value);
  
        if (fieldIntIndex < 3) {
            itemsRef.current[fieldIntIndex + 1].focus();
        } else {
            const field = document.querySelector(`Input[name=code-${fieldIntIndex}]`);
            field.blur();
        }
    };
  
    const codeInputFields = new Array(4)
        .fill(0)
        .map((item, index) => (
            <input
                type="text"
                className="form-control customInput appInput"
                ref={(ref) => itemsRef.current.push(ref)}
                name={`code-${index}`}
                key={index}
                onChange={(event) => codeChangeHandler(event)}
                maxLength={1}
                required
            />
        ));
  
    return <>{codeInputFields}</>;
};

export default Verify;