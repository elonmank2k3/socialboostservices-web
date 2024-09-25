import { useEffect, useState } from "react";

const Accounts = ({ setSelectedAccount }) => {
    const [isError, setIsError] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [rows, setRows] = useState([])
    const [serviceOption, setServiceOption] = useState(0)
    const [priceOption, setPriceOption] = useState(0)
    const [saleOption, setSaleOption] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)
    const itemsPerPage = 12;

    // Handle page change
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevValue => prevValue += 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prevValue => prevValue -= 1);
        }
    };

    function selectAccount(account) {
        setSelectedAccount(account)
    }

    useEffect(() => {
        setIsFetching(true)

        let options = new URLSearchParams()
        options.append("serviceOption", serviceOption)
        options.append("priceOption", priceOption)
        options.append("saleOption", saleOption)
        options.append("currentPage", currentPage)

        fetch(`https://api.socialboostservices.shop/api?` + options)
        .then(res => {
            if (res.status != 200) throw new Error("Fetch")
            return res.json()
        })
        .then(data => {
            var tempRows = [];
            for (let i = 0; i < data.length; i += 4) {
                tempRows.push(data.accounts.slice(i, i + 4));
            }
            setRows(tempRows)
            setTotalPages(Math.ceil(data.length / itemsPerPage))
            setIsFetching(false)
            setIsError(false)
        })
        .catch(() => {
            setIsError(true)
            setIsFetching(false)
        })
    }, [currentPage])

    function filterAccounts() {
        setIsFetching(true)

        let options = new URLSearchParams()
        options.append("serviceOption", serviceOption)
        options.append("priceOption", priceOption)
        options.append("saleOption", saleOption)
        options.append("currentPage", currentPage)

        fetch(`https://api.socialboostservices.shop/api?` + options)
        .then(res => {
            if (res.status != 200) throw new Error("Fetch data failed")
            return res.json()
        })
        .then(data => {
            var tempRows = [];
            for (let i = 0; i < data.length; i += 4) {
                tempRows.push(data.accounts.slice(i, i + 4));
            }
            setRows(tempRows)
            setTotalPages(Math.ceil(data.length / itemsPerPage))
            setIsError(false)
            setIsFetching(false)
        })
        .catch(() => {
            setIsError(true)
            setIsFetching(false)
        })
    }

    useEffect(() => {
        setPriceOption("0");
        setSaleOption("0");
        setCurrentPage(1)
    }, [serviceOption])

    return ( 
        <section id="accounts" className='account-list d-flex flex-column align-items-center'>
            <p className='text-center fw-bold'><span className='section-title resp-h4'><i class="bi bi-grid-fill"></i> &nbsp; Account List</span></p>
            <div class="account-options__grid container text-center">
                <div class="account-options__row row g-2">
                    <div class="account-options__column col-6 col-lg-3">
                        <div className="account-options__option">
                            <label className='fw-bold text-white'>Service</label>
                            <select value={serviceOption}
                                onChange={(e) => setServiceOption(Number(e.target.value))}
                            >
                                <option value="0">All</option>
                                <option value="1">YouLikeHits</option>
                                <option value="2">EasyHits4U</option>
                                <option value="3">AdsVlog</option>
                                <option value="4">TrafficUp</option>
                            </select>
                        </div>
                    </div>
                    <div class="account-options__column col-6 col-lg-3">
                        <div className="account-options__option">
                            <label className='fw-bold text-white'>Price</label>
                            <select value={priceOption}
                                onChange={(e) => setPriceOption(Number(e.target.value))}
                            >
                                <option value="0">All</option>
                                <option value="1">&le;1</option>
                                <option value="2">&le;2</option>
                                <option value="3">&le;3</option>
                                <option value="4">&le;4</option>
                                <option value="5">&le;5</option>
                            </select>
                        </div>
                    </div>
                    <div class="account-options__column col-6 col-lg-3">
                        <div className="account-options__option">
                            <label className='fw-bold text-white'>Sale</label>
                            <select value={saleOption}
                                onChange={(e) => setSaleOption(Number(e.target.value))}
                            >
                                <option value="0">All</option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="account-options__column col-6 col-lg-3">
                        <div className="account-options__button">
                            <button className='filter-btn' onClick={filterAccounts}>Filter</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid text-center mt-3" style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                {
                    isFetching ?
                    <img width={100} src={require("../assets/loading.gif")} />:
                    isError ? 
                    <>No data</>:
                    rows.map((row) => (
                        <div class="row g-3 mt-1">
                           {
                             row.map((account) => (
                                <div class="col-6 col-lg-3">
                                    <AccountItem account={account} selectAccount={selectAccount}/>
                                </div>
                            ))
                           }
                        </div>
                    ))
                }
                <div className="my-pagination">
                    <button className="page-switch-btn" onClick={handlePrevious} disabled={currentPage === 1}>
                    &lt;&lt;
                    </button>
                    <span> Page {currentPage} of {totalPages} </span>
                    <button className="page-switch-btn" onClick={handleNext} disabled={currentPage === totalPages}>
                    &gt;&gt;
                    </button>
                </div>
            </div>
        </section>
    );
}
 
export default Accounts;

const AccountItem = ({ account, selectAccount }) => {
    const [saleImg, setSaleImg] = useState(null);
   
    useEffect(() => {
        switch (account.percentSale) {
            case 10: {
                setSaleImg(require('../assets/sale10.png'));
                break;
            }
            case 20: {
                setSaleImg(require('../assets/sale20.png'));
                break;
            }
            case 30: {
                setSaleImg(require('../assets/sale30.png'));
                break;
            }
            case 40: {
                setSaleImg(require('../assets/sale40.png'));
                break;
            }
            case 50: {
                setSaleImg(require('../assets/sale50.png'));
                break;
            }
            default: {
                setSaleImg(null);
                break;
            }
        }
    }, [account.percentSale]);

    return ( 
        <div class="card account-item" onClick={() => selectAccount(account)} data-bs-toggle="modal" data-bs-target="#account-details">
            {
                account.oriPrice != account.soldPrice && 
                <div className='account-sale'>
                    <span className='end-sale-time'>
                        End {account.remainHours} hrs
                    </span>
                    <img src={saleImg} alt="" />
                </div>
            }
            <div style={{position: "relative", margin: "3px", backgroundColor: "black", borderRadius: '3px', overflow: "hidden"}}>
                <div className='account-id'>{account.serviceName}-{account.id}</div>
                <img src={require("../assets/account-bg.png")} class="card-img-top img-fluid" style={{borderRadius: "5px"}} alt="" />
                <img src={!!account.image ? account.image : require("../assets/account-img.png") } 
                    class="account-image" alt="Account Image"
                    style={{border: "3px solid black", boxSizing: "border-box"}}
                />
            </div>
            <div class="card-body position-relative">
                <div>
                    <div className='fw-bold fs-5 justify-content-center'>
                        <div className='account-price text-white position-relative'>
                            ${account.soldPrice.toFixed(2)}
                            {
                                account.oriPrice != account.soldPrice && 
                                <div className='account-ori-price text-decoration-line-through text-light'>
                                    ${account.oriPrice}
                                </div>
                            }
                        </div>                   
                    </div>
                </div>
            </div>
        </div>
    );
}