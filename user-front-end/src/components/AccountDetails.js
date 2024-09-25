const AccountDetails = ({ account }) => {

    return ( 
        <section class="account-details modal fade" id="account-details" tabindex="-1" aria-labelledby="account-details" aria-hidden="true">
            <div class="account-details__dialog modal-dialog">
                <div class="account-details__content modal-content">
                    <div class="account-details__header modal-header">
                        <h1 class="account-details__title modal-title text-primary fs-5 text-center">Account Details</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="account-details__body modal-body">
                        <div class="account-details__grid container-fluid">
                            <div class="account-details__row row g-5 justify-content-center align-items-start">
                                <div class="account-details__column col-12 col-md-6">
                                    <div>
                                        <div className="image-wrapper" style={{position: "relative", outline: "thin solid black", borderRadius: "5px", overflow: "hidden"}}>
                                         <img src={require("../assets/account-bg.png")} class="img-fluid" alt="" />
                                        <img src={!!account.image ? account.image : require("../assets/account-img.png") } class="account-details__image" alt="Account Image"/>
                                        </div>
                                        <div>
                                            {
                                                (String(account.serviceName).includes("YouLikeHits") || 
                                                String(account.serviceName).includes("TrafficUp")) &&
                                                <p><strong>Points</strong>: {account.point} points</p>
                                            }
                                            {
                                                String(account.serviceName).includes("AdsVlog") &&
                                                <p><strong>Balance</strong>: ${account.balance}</p>
                                            }
                                            {
                                                String(account.serviceName).includes("EasyHits4u") &&
                                                <div>
                                                    <strong>Credit</strong>: {account.credit} <br />
                                                    <strong>Banner Impressions</strong>: {account.banner} <br />
                                                    <strong>Text Ad Impressions</strong>: {account.textAd} <br />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div class="account-details__column col-12 col-md-6">
                                    <div className="bg-primary py-3 d-flex align-items-center rounded">
                                        <div className="account-details__info mx-5 fs-5 text-white fw-bold">
                                            ID account: {account.serviceName}-{account.id} <br />
                                            Price: {!!account.soldPrice && account.soldPrice.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="border border-2 border-primary rounded mt-3">
                                        <p className="resp-h4 text-center fw-bold mb-0">Follow steps to buy account</p>
                                        <ol>
                                            <li>
                                                <strong>Contact me through one of ways</strong>
                                                <ul>
                                                    <li><em>Facebook: 👉<a href="https://www.facebook.com/profile.php?id=61566203315223">Click Here</a>👈</em></li>
                                                    <li><em>Telegram</em>: @social_boost_services</li>
                                                    <li><em>Whatsapp</em>: +84383669611</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <strong>Send me ID account and wait for my response</strong>
                                            </li>
                                        </ol>
                                        <p className="resp-h4 text-center fw-bold mb-0">Accepted Payment Methods</p>
                                        <p className="text-center">
                                            <img src={require("../assets/usdt.png")} width={40} alt="" /> &nbsp;&nbsp;
                                            <img src={require("../assets/btc.png")} width={40} alt="" /> &nbsp;&nbsp;
                                            <img src={require("../assets/trx.png")} width={40} alt="" /> &nbsp;&nbsp;
                                            <img src={require("../assets/payeer.png")} width={40} alt="" /> &nbsp;&nbsp;
                                            <img src={require("../assets/paypal.png")} width={40}  alt="" />
                                        </p>
                                        <p className="text-center"><strong>Note</strong>: For gmail account, after using up balance, give me back account, I send back $0.25</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default AccountDetails;