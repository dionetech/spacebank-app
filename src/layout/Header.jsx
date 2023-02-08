import { Helmet } from 'react-helmet-async';

const Header = ({ title }) => {
	return (
    <Helmet>
		<title>Space Bank - {title?title:"Web3 Payment Platform"}</title>
    </Helmet>
	)
}

export default Header;