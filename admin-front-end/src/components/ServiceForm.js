import { useEffect, useState } from "react";

const ServiceForm = ({ serviceOption, mode, toggleAddAccountModal, setFilteredAccounts, editedAccount }) => {
    const [serviceName, setServiceName] = useState("")
    const [id, setId] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [expectedPoint, setExpectedPoint] = useState(0)
    const [expectedBalance, setExpectedBalance] = useState(0)
    const [balance, setBalance] = useState(0)
    const [point, setPoint] = useState(0)
    const [credit, setCredit] = useState(0)
    const [banner, setBanner] = useState(0)
    const [textAd, setTextAd] = useState(0)
    const [oriPrice, setOriPrice] = useState(0)
    const [percentSale, setPercentSale] = useState(0)
    const [saleEndTime, setSaleEndTime] = useState("")
    const [soldPrice, setSoldPrice] = useState(0)
    const [buyerInfo, setBuyerInfo] = useState()
    const [image, setImage] = useState('')
    const [authorization, setAuthorization] = useState("")
    const [cookie, setCookie] = useState("")
    const [emails, setEmails] = useState([])

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
    
          reader.onloadend = () => {
            resolve(reader.result); // Return the base64 string
          };
    
          reader.onerror = (error) => {
            reject(error); // Return the error if there's an issue
          };
    
          reader.readAsDataURL(file); // Read file as Data URL (base64 string)
        });
      };

    function handleImageChange(file) {
        convertToBase64(file).then(result => setImage(result))
    };
    
    function handleButtonClick() {
        // This function will trigger the file input click
        document.getElementById('file-input').click();
    };

    function handleAddAccount() {
        let formData = new URLSearchParams()
        let url = "";

        if (serviceOption == 1) {
            url = `http://localhost:8080/api/youlikehits`
            formData.append("email", email)
            formData.append("password", password)
            formData.append("cookie", cookie)
        } else if (serviceOption == 2) {
            url = `http://localhost:8080/api/easyhits4us`
            formData.append("username", username)
            formData.append("password", password)
            formData.append("cookie", cookie)
        } else if (serviceOption == 3) {
            url = `http://localhost:8080/api/adsvlogs`
            formData.append("email", email)
            formData.append("authorization", authorization)
        } else {
            url = `http://localhost:8080/api/trafficups`
            formData.append("email", email)
            formData.append("password", password)
        } 

        fetch(url, {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }})
            .then(res => res.text())
            .then(data => {
                let id = String(data).substring(data.indexOf("id")+2, data.indexOf("created"))
                setFilteredAccounts(prevData => [...prevData, {id: id, email, username, password, balance, point, credit, textAd, banner, oriPrice, percentSale, soldPrice, saleEndTime: new Date().toISOString(), cookie, authorization}])
            })

        toggleAddAccountModal()
    }

    function handleEditAccount() {
        let payload = new URLSearchParams()
        payload.append("id", id)
        payload.append("username", username)
        payload.append("email", email)
        payload.append("password", password)
        payload.append("point", point)
        payload.append("expectedPoint", expectedPoint)
        payload.append("expectedBalance", expectedBalance)
        payload.append("credit", credit)
        payload.append("banner", banner)
        payload.append("textAd", textAd)
        payload.append("balance", balance)
        payload.append("oriPrice", oriPrice)
        payload.append("percentSale", percentSale)
        payload.append("saleEndTime", saleEndTime.substring(0, 10) + "T00:00:00")
        payload.append("image", image)
        payload.append("buyerInfo", buyerInfo)
        payload.append("cookie", cookie)
        payload.append("authorization", authorization)
       
        const urlMap = {
            1: `http://localhost:8080/api/youlikehits/${id}`,
            2: `http://localhost:8080/api/easyhits4us/${id}`,
            3: `http://localhost:8080/api/adsvlogs/${id}`,
            4: `http://localhost:8080/api/trafficups/${id}`
        }
        fetch(urlMap[serviceOption], {
            method: "PUT",
            body: payload,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })

        toggleAddAccountModal()
    }

    useEffect(() => {
        let serviceMap = {
            1: "YouLikeHits",
            2: "EasyHits4u",
            3: "AdsVlog",
            4: "TrafficUp"
        }

        setServiceName(serviceMap[serviceOption])
    }, [serviceOption])
    
    useEffect(() => {
        if (mode === "Edit") {
            if (serviceOption === 1) {
                setEmail(editedAccount.email)
                setPoint(editedAccount.point)
            } else if (serviceOption === 2) {
                setUsername(editedAccount.username)
                setCredit(editedAccount.credit)
                setBanner(editedAccount.banner)
                setTextAd(editedAccount.textAd)
            } else if (serviceOption === 3) {
                setEmail(editedAccount.email)
                setBalance(editedAccount.balance)
                setAuthorization(editedAccount.authorization)
            } else {
                setEmail(editedAccount.email)
                setPoint(editedAccount.point)
            }

            setId(editedAccount.id)
            setPassword(editedAccount.password)
            setOriPrice(editedAccount.oriPrice)
            setPercentSale(editedAccount.percentSale)
            setSaleEndTime(editedAccount.saleEndTime)
            setSoldPrice(editedAccount.soldPrice)
            setImage(editedAccount.image)
            setBuyerInfo(editedAccount.buyerInfo)
            setCookie(editedAccount.cookie)
        }
        fetch("http://localhost:8080/api/google-accounts/emails")
            .then(res => res.json())
            .then(data => setEmails(data))
    }, [editedAccount, mode, serviceOption])

    return (
        <>
            {
                mode === "Add" && 
                <div className="modal">
                    <form>
                        <p className="h5" style={{textAlign: "center", margin: "0"}}>Add Account</p>
                        <table className="form__inputs">
                            <tr>
                                <td>Service</td>
                                <td><input type="text" value={serviceName} disabled/></td>
                            </tr>
                            {
                                serviceName === "EasyHits4u"  &&
                                <tr>
                                    <td>Username</td>
                                    <td><input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/></td>
                                </tr>
                            }
                            {
                                serviceName === "AdsVlog" && 
                                <tr>
                                    <td>Google Account</td>
                                    <td>
                                        <select value={email} onChange={(e) => setEmail(e.target.value)}>
                                            {
                                                emails.map(email => (
                                                    <option value={email}>{email}</option>
                                                ))
                                            }
                                        </select>
                                    </td>
                                </tr>
                            }
                              
                            {
                                (serviceName === "TrafficUp" || serviceName === "YouLikeHits") && 
                                <tr>
                                    <td>Email</td>
                                    <td>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    </td>
                                </tr>
                            }
                            {
                                serviceName !== "AdsVlog" &&
                                <tr>
                                    <td>Password</td>
                                    <td><input type="text" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
                                </tr>
                            }
                            {
                                (serviceName === "YouLikeHits" || serviceName === "EasyHits4u") && 
                                <tr>
                                    <td>Cookie</td>
                                    <td>
                                        <input type="text" value={cookie} onChange={(e) => setCookie(e.target.value)}/>
                                    </td>
                                </tr>
                            }
                            {
                                serviceName === "AdsVlog" &&
                                <tr>
                                    <td>Authorization</td>
                                    <td>
                                        <input type="text" value={authorization} onChange={(e) => setAuthorization(e.target.value)}/>
                                    </td>
                                </tr>
                            }
                        </table>
                        <div className="form__button-group">
                            <button type="button" className="cancel-btn" onClick={toggleAddAccountModal}>Cancel</button>
                            <button type="button" className="create-btn" onClick={handleAddAccount}>Add</button>
                        </div>
                    </form>
                </div>
            }
            {
                mode === "Edit" && 
                <div className="modal">
                    <form>
                        <p className="h5" style={{textAlign: "center", margin: "0"}}>Edit Account</p>
                        <table className="form__inputs">
                            <tr>
                                <td>Service</td>
                                <td><input type="text" value={serviceName} disabled/></td>
                            </tr>
                            <tr>
                                <td>Id</td>
                                <td><input type="text" value={id} disabled/></td>
                            </tr>
                            {   
                                serviceName === "EasyHits4u" &&
                                <tr>
                                    <td>Username</td>
                                    <td><input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/></td>
                                </tr>
                            }
                            {
                                (serviceName === "TrafficUp" || serviceName === "AdsVlog" || serviceName === "YouLikeHits") &&
                                <tr>
                                    <td>Email</td>
                                    <td>
                                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                                    </td>
                                </tr>
                            }
                            <tr>
                                <td>Password</td>
                                <td><input type="text" value={password} onChange={e => setPassword(e.target.value)} /></td>
                            </tr>
                            {
                                (serviceName === "YouLikeHits" ||
                                serviceName === "TrafficUp") &&
                                <tr>
                                    <td>Point</td>
                                    <td><input type="text" value={point} onChange={(e) => setPoint(e.target.value)}/></td>
                                </tr>
                            }
                            {
                                (serviceName === "YouLikeHits" ||
                                serviceName === "TrafficUp") &&
                                <tr>
                                    <td>Expected Point</td>
                                    <td><input type="number" value={expectedPoint} onChange={(e) => setExpectedPoint(e.target.value)}/></td>
                                </tr>
                            }
                            {
                                serviceName === "EasyHits4u" &&
                                <>
                                    <tr>
                                        <td>Credit</td>
                                        <td><input type="number" value={credit} onChange={e => setCredit(e.target.value)}/></td>
                                    </tr>
                                    <tr>
                                        <td>Banner</td>
                                        <td><input type="number" value={banner} onChange={e => setBanner(e.target.value)}/></td>
                                    </tr>
                                    <tr>
                                        <td>Text Ad</td>
                                        <td><input type="number" value={textAd} onChange={e => setTextAd(e.target.value)}/></td>
                                    </tr>
                                </>
                            }
                            {
                                serviceName === "AdsVlog" &&
                                <tr>
                                    <td>Balance</td>
                                    <td><input type="number" value={balance} onChange={e => setBalance(e.target.value)}/></td>
                                </tr>
                            }
                            {
                                serviceName === "AdsVlog" &&
                                <tr>
                                    <td>Expected Balance</td>
                                    <td><input type="number" value={expectedBalance} onChange={e => setExpectedBalance(e.target.value)}/></td>
                                </tr>
                            }
                            <tr>
                                <td>Ori Price</td>
                                <td><input type="number" value={oriPrice} onChange={e => setOriPrice(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td>Percent Sale</td>
                                <td>
                                    <select 
                                        value={percentSale}
                                        onChange={e => setPercentSale(e.target.value)}
                                    >
                                        <option value="0">0</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                        <option value="40">40</option>
                                        <option value="50">50</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                    <td>Sale End Time</td>
                                    <td>
                                        <input type="date" value={saleEndTime.substring(0, 10)} onChange={e => setSaleEndTime(e.target.value)}/>
                                    </td>
                            </tr>
                            <tr>
                                    <td>Sold Price</td>
                                    <td><input type="number" value={soldPrice} disabled/></td>
                            </tr>
                            <tr>
                                    <td>Image</td>
                                    <td>
                                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                            <img src={image} alt="No image" width={"50px"} height={40}/>
                                            <button type="button" onClick={handleButtonClick}>
                                                Choose Image
                                            </button>
                                            <input type="file" id="file-input" onChange={(e) => handleImageChange(e.target.files[0])} style={{display: "none"}}/>
                                        </div>
                                    </td>
                            </tr>
                            <tr>
                                <td>Buyer Info</td>
                                <td><input type="text" value={buyerInfo} onChange={e => setBuyerInfo(e.target.value)}/></td>
                            </tr>
                            {
                                (serviceName == "YouLikeHits" || serviceName == "EasyHits4u") &&
                                <tr>
                                    <td>Cookie</td>
                                    <td><input type="text" value={cookie} onChange={e => setCookie(e.target.value)}/></td>
                                </tr>
                            }
                            {
                                serviceName === "AdsVlog" && 
                                <tr>
                                    <td>Authorization</td>
                                    <td><input type="text" value={authorization} onChange={e => setAuthorization(e.target.value)}/></td>
                                </tr>
                            }
                        </table>
                        <div className="form__button-group">
                            <button type="button" className="cancel-btn" onClick={toggleAddAccountModal}>Cancel</button>
                            <button type="button" className="edit-btn" onClick={handleEditAccount}>Edit</button>
                        </div>
                    </form>
                </div>
            }
        </>
    );
}

export default ServiceForm;