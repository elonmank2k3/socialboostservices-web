import { useEffect, useRef, useState } from "react";
import TableContent from "../components/TableContent";
import CreateAccForm from "../components/CreateAccForm";
import DeletionConfirmModal from "../components/DeletionConfirmModal";

const Service = () => {
    const [serviceOption, setServiceOption] = useState(1)
    const [priceOption, setPriceOption] = useState(0)
    const [saleOption, setSaleOption] = useState(0)
    const [statusOption, setStatusOption] = useState(0)
    const [youLikeHitsAccounts, setYouLikeHitsAccounts] = useState([])
    const [adsVlogAccounts, setAdsVlogAccounts] = useState([])
    const [easyHits4uAccounts, setEasyHits4uAccounts] = useState([])
    const [trafficUpAccounts, setTrafficUpAccounts] = useState([])
    const [selectedAccounts, setSelectedAccounts] = useState([])
    const [filteredAccounts, setFilteredAccounts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const priceRef = useRef(null)
    const saleRef = useRef(null)
    const statusRef = useRef(null)
    const [isCreateAccountModalShown, setIsCreateAccountModalShown] = useState(false)
    const [mode, setMode]  = useState("")
    const [editedAccount, setEditedAccount] = useState({})
    const [isDeletionConfirmModalShown, setIsDeletionConfirmModalShown] = useState(false)
    const [selectedDeletedAccountId, setSelectedDeletedAccountId] = useState(0)

    function clickDeleteButton(id) {
        setSelectedDeletedAccountId(id)
        setIsDeletionConfirmModalShown(true)
    }

    function handleDeletionAccount(isDeleted) {
        if (isDeleted) {
            var url = ""
            var id = String(selectedDeletedAccountId).substring(selectedDeletedAccountId.indexOf("-") + 1)

            switch (serviceOption) {
                case 1: {
                    url = `http://localhost:8080/api/youlikehits/${id}`
                    break;
                }
                case 2: {
                    url = `http://localhost:8080/api/easyhits4us/${id}`
                    break
                }
                case 3: {
                    url = `http://localhost:8080/api/adsvlogs/${id}`
                    break
                }
                case 4: {
                    url = `http://localhost:8080/api/trafficups/${id}`
                    break
                }
            }
            
            fetch(url, {
                method: "DELETE"
            })
        }
        setIsDeletionConfirmModalShown(false)
    }

    function clickEditedButton(account) {
        setEditedAccount(account)
        setIsCreateAccountModalShown(true)
        setMode("Edit")
    }

    useEffect(() => {
        setPriceOption(0);
        setSaleOption(0);
        setStatusOption(0);
        priceRef.current.value = 0
        saleRef.current.value = 0
        statusRef.current.value = 0
        
        switch (serviceOption) {
            case 1: {
                setSelectedAccounts(youLikeHitsAccounts)
                break;
            }
            case 2: {
                setSelectedAccounts(easyHits4uAccounts)
                break;
            }
            case 3: {
                setSelectedAccounts(adsVlogAccounts)
                break;
            }
            case 4: {
                setSelectedAccounts(trafficUpAccounts)
                break;
            }
            default: {
                setSelectedAccounts([])
                break;
            }
        }
    }, [serviceOption])

    useEffect(() => {
        setFilteredAccounts(selectedAccounts)
    }, [selectedAccounts])

    useEffect(() => {
        if (!isLoading) {   // Giảm tình trạng lặp update liên tục
            setFilteredAccounts(youLikeHitsAccounts)
        }
    }, [isLoading])

    // Fetch accounts from server
    useEffect(() => {
        fetch("http://localhost:8080/api/admin/accounts")
            .then(res => res.json())
            .then(data => {
                setYouLikeHitsAccounts(data.filter(account => String(account.id).includes("YouLikeHits")))
                setAdsVlogAccounts(data.filter(account => String(account.id).includes("AdsVlog")))
                setTrafficUpAccounts(data.filter(account => String(account.id).includes("TrafficUp")))
                setEasyHits4uAccounts(data.filter(account => String(account.id).includes("EasyHits4u")))
                setIsLoading(false)
            })
    }, [])

    function toggleModal() {
        setIsCreateAccountModalShown((prevValue) => !prevValue)
    }

    function filterAccounts() {
        var tempAccounts = [...selectedAccounts]

        // Filter based on Price
        if (priceOption != 0) {
            tempAccounts = tempAccounts.filter(account => {
                return account.soldPrice <= priceOption
            })
        }

        // Filter based on Sale
        switch (saleOption) {
            case 0: {   // Both
                tempAccounts = tempAccounts
                break
            }
            case 1: {   // Sale
                tempAccounts = tempAccounts.filter(account => account.soldPrice != account.oriPrice)
                break
            }
            case 2: {   // No Sale
                tempAccounts = tempAccounts.filter(account => account.soldPrice === account.oriPrice)
                break
            }
        }

        // Filter based on Status
        switch(statusOption) {
            case 0: {
                tempAccounts = tempAccounts
                break;
            }
            case 1: {   // Available
                tempAccounts = tempAccounts.filter(account => account.buyerInfo === null) 
                break;
            }   
            case 2: {   // Sold
                tempAccounts = tempAccounts.filter(account => account.buyerInfo != null) 
                break;
            }
        }
        setFilteredAccounts(tempAccounts)
    }

    return ( 
        <>
            <div className="content">
                <div className="content__header">
                    <div className="options">
                        <div className="option">
                            <label>Service</label>
                            <select onChange={e => setServiceOption(Number(e.target.value))}>
                                <option value="1" selected>YouLikeHits</option>
                                <option value="2">EasyHits4U</option>
                                <option value="3">AdsVlog</option>
                                <option value="4">TrafficUp</option>
                            </select>
                        </div>
                        <div className="option">
                            <label>Price</label>
                            <select ref={priceRef} onChange={e => setPriceOption(Number(e.target.value))}>
                                <option value="0">All</option>
                                <option value="1">&le;1</option>
                                <option value="2">&le;2</option>
                                <option value="3">&le;3</option>
                                <option value="4">&le;4</option>
                                <option value="5">&le;5</option>
                            </select>
                        </div>
                        <div className="option">
                            <label>Sale</label>
                            <select 
                                ref={saleRef}
                                onChange={(e) => setSaleOption(Number(e.target.value))}
                            >
                                <option value="0">All</option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            </select>
                        </div>
                        <div className="option">
                            <label>Status</label>
                            <select 
                                ref={statusRef}
                                onChange={(e) => setStatusOption(Number(e.target.value))}
                            >
                                <option value="0">All</option>
                                <option value="1">Available</option>
                                <option value="2">Sold</option>
                            </select>
                        </div>
                    </div>
                    <div className="button-group">
                        <button type="button" className="filter-btn" onClick={filterAccounts}>Filter</button>
                        <button type="button" className="create-btn" onClick={() => {toggleModal(); setMode("Create")}}>Create</button>
                    </div>
                </div>
                <div className="content__body">
                    {/* <table>
                        <TableContent clickEditedButton={clickEditedButton} clickDeleteButton={clickDeleteButton} serviceOption={serviceOption} accounts={filteredAccounts}/>
                    </table> */}
                </div>
            </div>
            {/* {
                isCreateAccountModalShown && 
                <CreateAccForm serviceOption={serviceOption} toggleModal={toggleModal} mode={mode} editedAccount={editedAccount}/>
            }
            {
                isDeletionConfirmModalShown &&
                <DeletionConfirmModal handleDeletionAccount={handleDeletionAccount} />
            } */}
        </>
    );
}
 
export default Service;
