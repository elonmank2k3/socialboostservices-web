import { act, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import ChromeUserContent from "../components/ChromeUserContent"
import { ReactComponent as AddIcon } from "../assets/add.svg";

const ChromeUser = () => {
    const [isFormShown, setIsFormShown] = useState(false)
    const [editedChromeUser, setEditedChromeUser] = useState({})
    const [isDeletionConfirmModalShown, setIsDeletionConfirmModalShown] = useState(false)
    const [selectedDeletedChromeUserId, setSelectedDeletedChromeUserId] = useState(0)
    const [chromeUsers, setChromeUsers] = useState([])
    const [mode, setMode] = useState("Add")

    function clickDeleteButton(id) {
        setSelectedDeletedChromeUserId(id)
        setIsDeletionConfirmModalShown(true)
    }

    useEffect(() => {
        fetch("http://localhost:8080/api/chrome-users")
            .then(res => res.json())
            .then(data => setChromeUsers(data))
    }, [])

    function handleDeleteAccount(isDeleted) {
        if (isDeleted) {
            fetch(`http://localhost:8080/api/chrome-users/${selectedDeletedChromeUserId}`, {
                method: "DELETE"
            }).then(() => {
                setChromeUsers(chromeUsers => chromeUsers.filter(chromeUser => chromeUser.id !== selectedDeletedChromeUserId));
            })
        }
        setIsDeletionConfirmModalShown(false)
    }

    function clickEditedButton(chromeUser) {
        setEditedChromeUser(chromeUser)
        setIsFormShown(true)
        setMode("Edit")
    }

    function toggleFormModal() {
        setIsFormShown((prevValue) => !prevValue)
    }

    function clickAddAccountButton() {
        setMode("Add")
        toggleFormModal()
    }

    return ( 
        <>
            <div className="content">
                <div className="content__header">
                    <div className="button-group">
                        <button type="button" className="icon-button" onClick={clickAddAccountButton}>
                            <AddIcon />
                        </button>
                    </div>
                </div>
                <div className="content__body">
                    <ChromeUserContent clickEditedButton={clickEditedButton} clickDeleteButton={clickDeleteButton} chromeUsers={chromeUsers}/>
                </div>
            </div>
            {
                isFormShown && 
                <Form setChromeUsers={setChromeUsers} editedChromeUser={editedChromeUser} mode={mode} toggleFormModal={toggleFormModal} />
            }
            {
                isDeletionConfirmModalShown &&
                <div className="modal">
                    <div className="modal__content shadow">
                        <div className="modal__header" style={{textAlign: "center"}}>
                            <img src={require("../assets/alert.png")} width={50} alt="" />
                        </div>
                        <div className="modal__body text-black" style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <span className="h4 text-center">Are you sure?</span>
                            <p className="text-center">
                                This action cannot be undone. All values associated with this field will be lost.   
                            </p>
                            <div className="form__button-group">
                                <button onClick={() => handleDeleteAccount(false)}>Cancel</button>
                                <button onClick={() => handleDeleteAccount(true)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
 
export default ChromeUser;

const Form = ({ setChromeUsers, mode, toggleFormModal, editedChromeUser }) => {
    const [directoryName, setDirectoryName] = useState("")
    const [googleAccount, setGoogleAccount] = useState("")
    const [youLikeHits, setYouLikeHits] = useState("")
    const [adsVlog, setAdsVlog] = useState("")
    const [easyHits4u, setEasyHits4u] = useState("")
    const [youLikeHitsAccounts, setYouLikeHitsAccounts] = useState([])
    const [googleAccounts, setGoogleAccounts] = useState([])
    const [adsVlogAccounts, setAdsVlogAccounts] = useState([])
    const [easyHits4uAccounts, setEasyHits4uAccounts] = useState([])

    useEffect(() => {
        if (mode === "Edit") {
            setDirectoryName(editedChromeUser.directoryName)
            setGoogleAccount(editedChromeUser.googleAccount)
            setYouLikeHits(editedChromeUser.youLikeHits)
            setAdsVlog(editedChromeUser.adsVlog)
            setEasyHits4u(editedChromeUser.easyHits4u)
        }

        fetch("http://localhost:8080/api/chrome-users/options")
            .then(res => res.json())
            .then(data => {
                console.log(JSON.stringify(data))
                setYouLikeHitsAccounts(data.youLikeHitsAccounts)
                setGoogleAccounts(data.googleAccounts)
                setAdsVlogAccounts(data.adsVlogAccounts)
                setEasyHits4uAccounts(data.easyHits4uAccounts)
            })
    }, [mode])

    function handleAdd() {
        let payload = new URLSearchParams()
        payload.append("directoryName", directoryName)
        payload.append("googleAccount", googleAccount)
        payload.append("youLikeHits", youLikeHits)
        payload.append("adsVlog", adsVlog)
        payload.append("easyHits4u", easyHits4u)
        
        fetch("http://localhost:8080/api/chrome-users", {
            method: "POST",
            body: payload,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(res => res.text())
            .then(data => {
                let id = String(data).substring(data.indexOf("id")+2, data.indexOf("successfully"))
                setChromeUsers((prevData) => [...prevData, {id, directoryName, googleAccount, youLikeHits, adsVlog, easyHits4u}])
            })

        toggleFormModal()
    }

    function handleEdit() {
        let payload = new URLSearchParams()
        payload.append("directoryName", directoryName)
        payload.append("googleAccount", googleAccount)
        payload.append("youLikeHits", youLikeHits)
        payload.append("adsVlog", adsVlog)
        payload.append("easyHits4u", easyHits4u)

        fetch("http://localhost:8080/api/chrome-users/" + editedChromeUser.id, {
            method: "PUT",
            body: payload,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })  
        toggleFormModal()
    }

    return (
        <div className="modal">
            <form>
                <p className="h5" style={{textAlign: "center", margin: "0"}}>{mode === "Add" ? "Add Account" : "Edit Account"}</p>
                <table className="form__inputs">
                    <tr>
                        <td>Directory Name</td>
                        <td><input type="text" value={directoryName} onChange={e => setDirectoryName(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Google Account</td>
                        <td>
                            <select value={googleAccount} onChange={e => setGoogleAccount(e.target.value)}>
                                <option value={""}></option>
                                {googleAccounts.map(account => (
                                    <option value={account}>{account}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>YouLikeHits</td>
                        <td>
                            <select value={youLikeHits} onChange={e => setYouLikeHits(e.target.value)}>
                                <option value={""}></option>
                                {youLikeHitsAccounts.map(account => (
                                    <option value={account}>{account}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>AdsVlog</td>
                        <td>
                            <select value={adsVlog} onChange={e => setAdsVlog(e.target.value)}>
                                <option value={""}></option>
                                {adsVlogAccounts.map(account => (
                                    <option value={account}>{account}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>EasyHits4u</td>
                        <td>
                            <select value={easyHits4u} onChange={e => setEasyHits4u(e.target.value)}>
                                <option value={""}></option>
                                {easyHits4uAccounts.map(account => (
                                    <option value={account}>{account}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                </table>
                <div className="form__button-group">
                    <button type="button" className="cancel-btn" onClick={toggleFormModal}>Cancel</button>
                    {
                        mode === "Add" ?
                        <button type="button" className="create-btn" onClick={handleAdd}>Add</button>:
                        <button type="button" className="create-btn" onClick={handleEdit}>Edit</button>
                    }
                </div>
            </form>
        </div>
    )
}