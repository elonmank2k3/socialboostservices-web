import { useEffect, useState } from "react";
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import { ReactComponent as EditIcon } from "../assets/edit.svg";
import { ReactComponent as CopyIcon } from "../assets/copy.svg";

const ServiceContent = ({ clickDeleteButton, clickEditedButton, serviceOption=1, accounts=[] }) => {

    return (
        <table>
            <tr>
                <th>ID</th>
                {
                    serviceOption === 2 ? 
                    <th>Username</th>:
                    serviceOption === 3 ? 
                    <th>Gg Acc</th>:
                    <th>Email</th>
                }
                <th>Password</th>
                {
                    (serviceOption === 1 || serviceOption === 4) ?
                    <th>Points</th>:
                    serviceOption === 2 ? 
                    <>
                        <th>Credit</th>
                        <th>Banner</th>
                        <th>Text Ad</th>
                    </> :
                    <th>Balance</th>
                }
                <th>Ori Price</th>
                <th>Percent Sale</th>
                <th>Sale End Time</th>
                <th>Sold Price</th>
                <th>Image</th>
                <th>Buyer Info</th>
                {
                    (serviceOption === 1 || serviceOption === 2) &&
                    <th>Cookie</th>
                }
                {
                    serviceOption === 3 &&
                    <th>Authorization</th>
                }
                <th>Status</th>
                <th></th>

            </tr>
            {accounts.map((account, index) => 
                <AccountRow serviceOption={serviceOption} index={index+1} account={account} clickEditedButton={clickEditedButton} clickDeleteButton={clickDeleteButton}/>
            )}
        </table>
    );
}
 
export default ServiceContent;

const AccountRow = ({ serviceOption, index, account, clickDeleteButton, clickEditedButton }) => {
    const [status, setStatus] = useState()
    const [isPasswordCopied, setIsPasswordCopied] = useState(false)
    const [isBuyerInfoCopied, setIsBuyerInfoCopied] = useState(false)
    const [isCookieCopied, setIsCookieCopied] = useState(false)
    const [isAuthorizationCopied, setIsAuthorizationCopied] = useState(false)

    function copyToClipboard(fieldName, text) {
        navigator.clipboard.writeText(text).then(
          () => {
            if (fieldName === "password") {
                setIsPasswordCopied(true)
                setTimeout(() => setIsPasswordCopied(false), [3000])
            } else if (fieldName === "cookie") {
                setIsCookieCopied(true)
                setTimeout(() => setIsCookieCopied(false), [3000])
            } else if (fieldName === "buyerInfo") {
                setIsBuyerInfoCopied(true)
                setTimeout(() => setIsBuyerInfoCopied(false), [3000])
            } else if (fieldName === "authorization") {
                setIsAuthorizationCopied(true)
                setTimeout(() => setIsAuthorizationCopied(false), [3000])
            }
          },
        );
    };

    useEffect(() => {
        setStatus(account.status)
    }, [account.status])

    function handleEditStatus(status) {
        setStatus(status)

        let payload = new URLSearchParams()
        payload.append("serviceOption", serviceOption)
        payload.append("id", account.id)
        payload.append("status", status)

        fetch(`http://localhost:8080/api/admin/edit-status`, {
            method: "POST",
            body: payload
        })
    }

    return (
        <tr>
            <td>{account.id}</td>
            {
                (serviceOption === 2) ?
                <td className="cursor-pointer" onDoubleClick={() => copyToClipboard(null, account.username)}>{account.username}</td>:
                <td className="cursor-pointer" onDoubleClick={() => copyToClipboard(null, account.email)}>{String(account.email).replace("@gmail.com", "")}</td>
            }
            <td>
                <a className="copy-btn" style={{textDecoration: isPasswordCopied ? "none" : "initial"}} onClick={() => copyToClipboard("password", account.password)}>
                    {
                        !isPasswordCopied ?
                            <CopyIcon />:
                            <span style={{color: "red"}}>Copied</span>
                    }
                </a>
            </td>
            {
                (serviceOption === 1 || serviceOption === 4) ?
                <td className="cursor-pointer" onDoubleClick={() => copyToClipboard(null, account.point)}>{account.point}</td>:
                serviceOption === 2 ?
                <>
                    <td>{account.credit}</td>
                    <td>{account.banner}</td>
                    <td>{account.textAd}</td>
                </>:
                <td className="cursor-pointer" onDoubleClick={() => copyToClipboard(null, account.balance)}>{account.balance}</td>
            }
            <td>{account.oriPrice}</td>
            <td>{account.percentSale}</td>
            <td>{account.saleEndTime.substring("0" ,account.saleEndTime.indexOf("T"))} </td>
            <td>{account.soldPrice.toFixed(2)}</td>
            <td><img src={`data:image/png;base64,${account.image}`} width={80} alt="" /></td>
            <td>
                <a className="copy-btn" style={{textDecoration: isBuyerInfoCopied ? "none" : "initial"}} onClick={() => copyToClipboard("buyerInfo", account.buyerInfo)}>
                    {
                        !isBuyerInfoCopied ?
                            <CopyIcon />:
                            <span style={{color: "red"}}>Copied</span>
                    }
                </a>
            </td>
            {
                (serviceOption === 1 || serviceOption === 2) && 
                <td>
                <a className="copy-btn" style={{textDecoration: isCookieCopied ? "none" : "initial"}} onClick={() => copyToClipboard("cookie", account.cookie)}>
                    {
                        !isCookieCopied ?
                            <CopyIcon />:
                            <span style={{color: "red"}}>Copied</span>
                    }
                </a>
            </td>
            }
            {
                serviceOption === 3 &&
                <td>
                <a className="copy-btn" style={{textDecoration: isAuthorizationCopied ? "none" : "initial"}} onClick={() => copyToClipboard("authorization", account.authorization)}>
                    {
                        !isAuthorizationCopied ?
                            <CopyIcon />:
                            <span style={{color: "red"}}>Copied</span>
                    }
                </a>
            </td>
            }
            <td>
                <select className="status-dropdown" value={status} onChange={(e) => handleEditStatus(e.target.value)}>
                    <option value="On sale">On sale</option>
                    <option value="In progress">In progress</option>
                    <option value="In stock">In stock</option>
                </select>
            </td>
            <td>
                <div className="svg-group">
                    <EditIcon  onClick={() => clickEditedButton(account)}/>
                    <DeleteIcon onClick={() => clickDeleteButton(account.id)}/>
                </div>
            </td>
        </tr>
    )
}