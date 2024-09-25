import { useEffect, useRef, useState } from "react";
import ServiceContent from "../components/ServiceContent";
import ServiceForm from "../components/ServiceForm";
import DeletionConfirmModal from "../components/DeletionConfirmModal";
import { ReactComponent as AddIcon } from "../assets/add.svg";
import { ReactComponent as FilterIcon } from "../assets/filter.svg";

const Service = () => {
    const [serviceOption, setServiceOption] = useState(1)
    const [priceOption, setPriceOption] = useState(0)
    const [saleOption, setSaleOption] = useState(0)
    const [availabilityOption, setAvailabilityOption] = useState(0)
    const [selectedAccounts, setSelectedAccounts] = useState([])
    const [filteredAccounts, setFilteredAccounts] = useState([])
    const priceRef = useRef(null)
    const saleRef = useRef(null)
    const statusRef = useRef(null)
    const [isAddAccountModalShown, setIsAddAccountModalShown] = useState(false)
    const [mode, setMode]  = useState("")
    const [editedAccount, setEditedAccount] = useState({})
    const [isDeletionConfirmModalShown, setIsDeletionConfirmModalShown] = useState(false)
    const [selectedDeletedAccountId, setSelectedDeletedAccountId] = useState(0)
    const [isFetching, setIsFetching] = useState(true)

    function clickDeleteButton(id) {
        setSelectedDeletedAccountId(id)
        setIsDeletionConfirmModalShown(true)
    }

    // Fetch accounts from server
    useEffect(() => {
        setIsFetching(true)

        fetch(`http://localhost:8080/api/admin/accounts?service-option=${serviceOption}`)
            .then(res => res.json())
            .then(data => {
                setSelectedAccounts(data)
                setFilteredAccounts(data)
                setIsFetching(false)

                //  Reset filter options
                setPriceOption(0);
                setSaleOption(0);
                setAvailabilityOption(0);
                priceRef.current.value = 0
                saleRef.current.value = 0
                statusRef.current.value = 0
            })
    }, [serviceOption]);

    function handleDeletionAccount(isDeleted) {
        if (isDeleted) {
            let urlMap = {
                1: `http://localhost:8080/api/youlikehits/${selectedDeletedAccountId}`,
                2: `http://localhost:8080/api/easyhits4us/${selectedDeletedAccountId}`,
                3: `http://localhost:8080/api/adsvlogs/${selectedDeletedAccountId}`,
                4: `http://localhost:8080/api/trafficups/${selectedDeletedAccountId}`
            }

            fetch(urlMap[serviceOption], {
                method: "DELETE"
            }).then(() => {
                setSelectedAccounts(prevAccounts => prevAccounts.filter(account => account.id !== selectedDeletedAccountId));
                setFilteredAccounts(prevAccounts => prevAccounts.filter(account => account.id !== selectedDeletedAccountId));
            })
        }
        setIsDeletionConfirmModalShown(false)
    }

    function clickEditedButton(account) {
        setEditedAccount(account)
        setIsAddAccountModalShown(true)
        setMode("Edit")
    }

    function toggleAddAccountModal() {
        setIsAddAccountModalShown((prevValue) => !prevValue)
    }

    function filterAccounts() {
        setIsFetching(true)
        var tempAccounts = [...selectedAccounts]

        tempAccounts = tempAccounts.filter(account => {
           // Check if the sold price exceeds the price option
            if (account.soldPrice > priceOption) return false;

            // Check sale option
            if (
                (saleOption === 1 && account.soldPrice === account.oriPrice) || 
                (saleOption === 2 && account.soldPrice !== account.oriPrice)
            ) {
                return false;
            }

            // Check availability option
            if (
                (availabilityOption === 1 && account.buyerInfo !== null) || 
                (availabilityOption === 2 && account.buyerInfo === null)
            ) {
                return false;
            }

            return true;
        })

        setFilteredAccounts(tempAccounts)
        setIsFetching(false)
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
                            <label>Availability</label>
                            <select 
                                ref={statusRef}
                                onChange={(e) => setAvailabilityOption(Number(e.target.value))}
                            >
                                <option value="0">All</option>
                                <option value="1">Available</option>
                                <option value="2">Sold</option>
                            </select>
                        </div>
                    </div>
                    <div className="button-group">
                        <button type="button" className="icon-button" onClick={filterAccounts}>
                            <FilterIcon />
                        </button>
                        <button type="button" className="icon-button" onClick={() => {toggleAddAccountModal(); setMode("Add")}}>
                            <AddIcon />
                        </button>
                    </div>
                </div>
                {
                    isFetching ?
                    <img width={60} src={require("../assets/loading.gif")} alt="" />:
                    <div className="content__body">
                        <ServiceContent clickEditedButton={clickEditedButton} clickDeleteButton={clickDeleteButton} serviceOption={serviceOption} accounts={filteredAccounts}/>
                    </div>
                }
                
            </div>
            {
                isAddAccountModalShown && 
                <ServiceForm serviceOption={serviceOption} toggleAddAccountModal={toggleAddAccountModal} mode={mode} editedAccount={editedAccount} setFilteredAccounts={setFilteredAccounts}/>
            }
            {
                isDeletionConfirmModalShown &&
                <DeletionConfirmModal handleDeletionAccount={handleDeletionAccount} />
            }
        </>
    );
}
 
export default Service;
