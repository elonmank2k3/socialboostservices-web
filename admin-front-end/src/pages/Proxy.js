import ProxyContent from "../components/ProxyContent"
import { useState, useEffect } from "react"
import { ReactComponent as AddIcon } from "../assets/add.svg";

const Proxy = () => {
    const [isFormShown, setIsFormShown] = useState(false)
    const [editedProxy, setEditedProxy] = useState({})
    const [isDeletionConfirmModalShown, setIsDeletionConfirmModalShown] = useState(false)
    const [selectedDeletedProxyId, setSelectedDeletedProxyId] = useState(0)
    const [proxies, setProxies] = useState([])
    const [mode, setMode] = useState("Add")
    
    useEffect(() => {
        fetch("http://localhost:8080/api/proxies")
            .then(res => res.json())
            .then(data => setProxies(data))
    }, [])

    function clickDeleteButton(id) {
        setSelectedDeletedProxyId(id)
        setIsDeletionConfirmModalShown(true)
    }

    function clickEditedButton(proxy) {
        setEditedProxy(proxy)
        setIsFormShown(true)
        setMode("Edit")
    }

    function toggleFormModal() {
        setIsFormShown((prevValue) => !prevValue)
    }

    function clickAddProxyButton() {
        setMode("Add")
        toggleFormModal()
    }

    function handleDeleteProxy(isDeleted) {
        if (isDeleted) {
            fetch(`http://localhost:8080/api/proxies/${selectedDeletedProxyId}`, {
                method: "DELETE"
            }).then(() => {
                setProxies(prevProxies => prevProxies.filter(proxy => proxy.id !== selectedDeletedProxyId));
            })
        }
        setIsDeletionConfirmModalShown(false)
    }
    
    return (
        <>
            <div className="content">
                <div className="content__header">
                    <div className="button-group">
                        <button type="button" className="icon-button" onClick={clickAddProxyButton}>
                            <AddIcon />
                        </button>
                    </div>
                </div>
                <div className="content__body">
                    <ProxyContent clickEditedButton={clickEditedButton} clickDeleteButton={clickDeleteButton} proxies={proxies}/>
                </div>
            </div>
            {
                isFormShown && 
                <ProxyForm setProxies={setProxies} editedProxy={editedProxy} mode={mode} toggleFormModal={toggleFormModal} />
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
                                <button onClick={() => handleDeleteProxy(false)}>Cancel</button>
                                <button onClick={() => handleDeleteProxy(true)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
 
export default Proxy;

const ProxyForm = ({ setProxies, mode, toggleFormModal, editedProxy }) => {
    const [host, setHost] = useState("")
    const [port, setPort] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [protocol, setProtocol] = useState("HTTP")
    const [exclusivity, setExclusivity] = useState("Public")
    const [origin, setOrigin] = useState("Residential")
    const [rotation, setRotation] = useState("Rotating")
    const [version, setVersion] = useState("IPv4")
    const [status, setStatus] = useState("Active")
    const [sellerInfo, setSellerInfo] = useState("")

    useEffect(() => {
        if (mode === "Edit") {
            setHost(editedProxy.host)
            setPort(editedProxy.port)
            setUsername(editedProxy.username)
            setPassword(editedProxy.password)
            setProtocol(editedProxy.protocol)
            setExclusivity(editedProxy.exclusivity)
            setOrigin(editedProxy.origin)
            setRotation(editedProxy.rotation)
            setVersion(editedProxy.version)
            setStatus(editedProxy.status)
            setSellerInfo(editedProxy.sellerInfo)
        }
    }, [mode])

    function handleAddProxy() {
        var payload = {host, port, username, password, protocol, exclusivity, origin, rotation, version, status, sellerInfo}

        fetch("http://localhost:8080/api/proxies", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.text())
            .then(data => {
                let id = String(data).substring(data.indexOf("id")+2, data.indexOf("successfully"))
                setProxies((prevData) => [...prevData, {id, host, port, username, password, protocol, exclusivity, origin, rotation, version, status, sellerInfo}])
            })

        toggleFormModal()
    }

    function handleEditProxy() {
        var payload = {host, port, username, password, protocol, exclusivity, origin, rotation, version, status, sellerInfo}

        fetch("http://localhost:8080/api/proxies/" + editedProxy.id, {
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
                <p className="h5" style={{textAlign: "center", margin: "0"}}>{mode === "Add" ? "Add Proxy" : "Edit Proxy"}</p>
                <table className="form__inputs">
                    <tr>
                        <td>Host</td>
                        <td><input type="text" value={host} onChange={e => setHost(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Port</td>
                        <td><input type="Port" value={port} onChange={e => setPort(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Username</td>
                        <td><input type="text" value={username} onChange={e => setUsername(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="text" value={password} onChange={e => setPassword(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Protocol</td>
                        <td>
                            <select value={protocol} onChange={e => setProtocol(e.target.value)}>
                                <option value={"HTTP"} selected>HTTP</option>
                                <option value={"HTTPS"}>HTTPS</option>
                                <option value={"SOCKS5"}>SOCKS5</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Exclusivity</td>
                        <td>
                            <select value={exclusivity} onChange={e => setExclusivity(e.target.value)}>
                                <option value="Private" selected>Private</option>
                                <option value="Public">Public</option>
                                <option value="Dedicated">Dedicated</option>
                                <option value="Shared">Shared</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Origin</td>
                        <td>
                            <select value={origin} onChange={e => setOrigin(e.target.value)}>
                                <option value="Residential" selected>Residential</option>
                                <option value="Datacenter">Datacenter</option>
                                <option value="Mobile">Mobile</option>
                                <option value="ISP">ISP</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Rotation</td>
                        <td>
                            <select value={rotation} onChange={e => setRotation(e.target.value)}>
                                <option value="Rotating" selected>Rotating</option>
                                <option value="Static">Static</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Version</td>
                        <td>
                            <select value={version} onChange={e => setVersion(e.target.value)}>
                                <option value="Rotating" selected>Rotating</option>
                                <option value="Static">Static</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>
                            <select value={status} onChange={e => setStatus(e.target.value)}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Seller Info</td>
                        <td><input type="text" value={sellerInfo} onChange={e => setSellerInfo(e.target.value)} /></td>
                    </tr>
                </table>
                <div className="form__button-group">
                    <button type="button" className="cancel-btn" onClick={toggleFormModal}>Cancel</button>
                    {
                        mode === "Add" ?
                        <button type="button" className="create-btn" onClick={handleAddProxy}>Add</button>:
                        <button type="button" className="create-btn" onClick={handleEditProxy}>Edit</button>
                    }
                </div>
            </form>
        </div>
    )
}