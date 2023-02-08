import { Link } from "react-router-dom";

const Navbar = ({ register }) => {
    return (
        <nav className={register?"register":""}>
            <ul>
                <li>
                    {/* <img
                        src="https://res.cloudinary.com/ruthless-labs/image/upload/v1666520695/spacebank/n6l07fgjxs2qmsownjzw.webp"
                        alt="Space Bank Logo"
                        width={40}
                        height={40}
                    /> */}
                    <Link to="/">
                        Space <span>Bank</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;