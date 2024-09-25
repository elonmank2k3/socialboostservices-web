import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <span class="brand" href="#" style={{fontFamily: "Georgia"}}>SocialBoostServices</span>
            <nav>
                <Link to="/service">Service</Link>
                <Link to="/transaction-proof">Transaction Proof</Link>
                <Link to="/google-account">Google Account</Link>
                <Link to="/chrome-user">Chrome User</Link>
                <Link to="/proxy">Proxy</Link>
            </nav>
        </header>
    );
}
 
export default Header;