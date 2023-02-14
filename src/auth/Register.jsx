import AuthLayout from "../layout/AuthLayout";
import Header from "../layout/Header";
import { motion } from "framer-motion";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { API_URL, BEARER_TOKEN, errorToast, successToast } from "../config";

const imageURL = "https://res.cloudinary.com/ruthless-labs/image/upload/v1671774795/spacebank/iia8vayzldtkpbpd4mbc.webp";

const Register = ({ createAccount }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [processing, setProcessing] = useState(false);
    const [redirectToVerify, setRedirectToVerify] = useState(false);

    // getBalance().then((bal) => {
    //     console.log("BALANCE: ", bal);
    // });

    const registerUser = (e) => {
        e.preventDefault();
        setProcessing(true);

        const walletAccount = createAccount();
        console.log("WALLET ACCOUNT: ", walletAccount);
        
		axios({
			method: "POST",
			data: {
				firstName: firstName,
                lastName: lastName,
                username: username,
                phoneNumber: phone,
                email: email,
                password: password,
                wallet: {
                    address: walletAccount.address,
                    privateKey: walletAccount.privateKey
                }
			},
            url: `${API_URL}/auth/signup`,
            headers: {
                'Authorization': BEARER_TOKEN,
            },
		})
		.then((res) => {
			setProcessing(false);
            console.log("RES: ", res);
            if (res.data.success!==true){
                errorToast(res.data.message);
            }else{
                window.localStorage.setItem('verifyEmail', email);
                successToast("Account successfully created");
                setRedirectToVerify(true);
            }
		})
		.catch((error) => {
			setProcessing(false);
            try{
                errorToast(error.response.data.error);
            }catch{
                errorToast("An error occured, try again");
            }
		})
        
    }

	return (
		<>
            {redirectToVerify?<Navigate to="/auth/verify" />:""}
			<Header />
            <AuthLayout
                register={true}
                imageURL={imageURL}
            >
                <section className="authLoginSection registerContent">
                    <h2>Sign up</h2>
                    <p>Please fill in all necessary credentials to create an account</p>
                    
                    <div className="authRegisterDiv">
                        <form onSubmit={registerUser}>
                            <div className="row">
                                <div className="col-xl-6 col-md-12 col-sm-6">
                                    <div className="form-group customFormGroup">
                                        <label htmlFor="sbFirstName" className="customLabel">First name</label>
                                        <input
                                            type="text"
                                            placeholder=""
                                            id="sbFirstName"
                                            name="sbFirstName"
                                            required
                                            className="form-control customInput signUp"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-md-12 col-sm-6">
                                    <div className="form-group customFormGroup">
                                        <label htmlFor="sbLastName" className="customLabel">Last name</label>
                                        <input
                                            type="text"
                                            placeholder=""
                                            id="sbLastName"
                                            name="sbLastName"
                                            required
                                            className="form-control customInput signUp"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-6 col-md-12 col-sm-6">
                                    <div className="form-group customFormGroup">
                                        <label htmlFor="sbUsername" className="customLabel">Username</label>
                                        <input
                                            type="text"
                                            placeholder=""
                                            id="sbUsername"
                                            name="sbUsername"
                                            required
                                            className="form-control customInput signUp"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-md-12 col-sm-6">
                                    <div className="form-group customFormGroup">
                                        <label htmlFor="sbPhone" className="customLabel">Phone number</label>
                                        <input
                                            type="text"
                                            placeholder=""
                                            id="sbPhone"
                                            name="sbPhone"
                                            required
                                            className="form-control customInput signUp"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
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
                            </div>
                            <div className="authButtonDiv">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    disabled={processing}
                                    className="spin"
                                >{processing?<ImSpinner8 />:"Create account"}</motion.button>
                            </div>
                        </form>
                    </div>

                    <div className="noAccountDiv">
                        <span>Already have an account? <Link to="/auth">Sign in</Link></span>
                    </div>
                </section>
            </AuthLayout>
		</>
	)
}

export default Register;