const Rules = () => {
    return (
        <section id="rules">
            <p className='text-center fw-bold'>
                <span className='section-title resp-h4'>
                    <i class="bi bi-file-ruled-fill"></i> &nbsp;
                    Rules
                </span>
            </p>
            <ol>
                <li>All accounts (<em>YouLikeHits, TrafficUp, EasyHits4U</em>), which are created with <em>username</em> and <em>password</em>, using <em>fake email</em>. You can change password but can't recover password. <br />
                    👉 <em>Make sure to remember your password after changing</em></li>
                <li>
                    For Google accounts (<em>AdsVlog</em>), after using up balance, if you give me back account, I will send back <em>$0.25</em>
                </li>
                <li>Recommend to use services: VPN or Proxy to fake IP for logging in safely.</li>
                <li>
                    Accepted Payment Methods: &nbsp;&nbsp;
                    <img src={require("../assets/usdt.png")} width={25} alt="" />&nbsp;&nbsp;
                    <img src={require("../assets/trx.png")} width={25} alt="" />&nbsp;&nbsp;
                    <img src={require("../assets/btc.png")} width={25} alt="" />&nbsp;&nbsp;
                    <img src={require("../assets/payeer.png")} width={25} alt="" />&nbsp;&nbsp;
                    <img src={require("../assets/paypal.png")} width={25} alt="" />
                </li>
            </ol>
        </section>
    );
}
 
export default Rules;
