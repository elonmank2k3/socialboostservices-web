import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import GoogleAccountContent from "../components/GoogleAccountContent"
import { ReactComponent as AddIcon } from "../assets/add.svg";

const GoogleAccount = () => {
    const [isFormShown, setIsFormShown] = useState(false)
    const [editedAccount, setEditedAccount] = useState({})
    const [isDeletionConfirmModalShown, setIsDeletionConfirmModalShown] = useState(false)
    const [selectedDeletedAccountId, setSelectedDeletedAccountId] = useState(0)
    const [googleAccounts, setGoogleAccounts] = useState([])
    const [mode, setMode] = useState("Add")

    function clickDeleteButton(id) {
        setSelectedDeletedAccountId(id)
        setIsDeletionConfirmModalShown(true)
    }

    useEffect(() => {
        fetch("http://localhost:8080/api/google-accounts")
            .then(res => res.json())
            .then(data => setGoogleAccounts(data))
    }, [])

    function handleDeleteAccount(isDeleted) {
        if (isDeleted) {
            fetch(`http://localhost:8080/api/google-accounts/${selectedDeletedAccountId}`, {
                method: "DELETE"
            }).then(() => {
                setGoogleAccounts(prevAccounts => prevAccounts.filter(account => account.id !== selectedDeletedAccountId));
            })
        }
        setIsDeletionConfirmModalShown(false)
    }

    function clickEditedButton(account) {
        setEditedAccount(account)
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
                    <GoogleAccountContent clickEditedButton={clickEditedButton} clickDeleteButton={clickDeleteButton} accounts={googleAccounts}/>
                </div>
            </div>
            {
                isFormShown && 
                <GoogleAccountForm setGoogleAccounts={setGoogleAccounts} editedAccount={editedAccount} mode={mode} toggleFormModal={toggleFormModal} />
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
 
export default GoogleAccount;

const GoogleAccountForm = ({ setGoogleAccounts, mode, toggleFormModal, editedAccount }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [recoveryEmail, setRecoveryEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    useEffect(() => {
        if (mode === "Edit") {
            setEmail(editedAccount.email)
            setPassword(editedAccount.password)
            setRecoveryEmail(editedAccount.recoveryEmail)
            setPhoneNumber(editedAccount.phoneNumber)
        }
    }, [mode])

    function handleAddAccount() {
        var payload = {email, password, recoveryEmail, phoneNumber}

        fetch("http://localhost:8080/api/google-accounts", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.text())
            .then(data => {
                let id = String(data).substring(data.indexOf("id")+2, data.indexOf("successfully"))
                setGoogleAccounts((prevData) => [...prevData, {id, email, password, recoveryEmail, phoneNumber}])
            })
        toggleFormModal()
    }

    function handleEditAccount() {
        var payload = {email, password, recoveryEmail, phoneNumber}

        fetch("http://localhost:8080/api/google-accounts/" + editedAccount.id, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
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
                        <td>Email</td>
                        <td><input type="email" value={email} onChange={e => setEmail(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="password" value={password} onChange={e => setPassword(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Recovery Email</td>
                        <td><input type="text" value={recoveryEmail} onChange={e => setRecoveryEmail(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Phone Number</td>
                        <td><input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} /></td>
                    </tr>
                </table>
                <div className="form__button-group">
                    <button type="button" className="cancel-btn" onClick={toggleFormModal}>Cancel</button>
                    {
                        mode === "Add" ?
                        <button type="button" className="create-btn" onClick={handleAddAccount}>Add</button>:
                        <button type="button" className="create-btn" onClick={handleEditAccount}>Edit</button>
                    }
                </div>
            </form>
        </div>
    )
}