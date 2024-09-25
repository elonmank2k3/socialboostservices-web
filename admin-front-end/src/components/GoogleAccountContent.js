import { useState } from "react";
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import { ReactComponent as EditIcon } from "../assets/edit.svg";
import { ReactComponent as CopyIcon } from "../assets/copy.svg";

const GoogleAccountContent = ({ accounts, clickEditedButton, clickDeleteButton}) => {
     
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Password</th>
                <th>Recovery Email</th>
                <th>Phone Number</th>
                <th></th>
            </tr>
            {accounts.map((account, index) => 
                <AccountRow account={account} index={index + 1} clickEditedButton={clickEditedButton} clickDeleteButton={clickDeleteButton}/>
            )}
        </table>
    );
}
 
export default GoogleAccountContent;

const AccountRow = ({ account, index, clickDeleteButton, clickEditedButton }) => {
    const [isCopied, setIsCopied] = useState(false)

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(
          () => {
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), [3000])
          },
          (err) => {
            console.error("Failed to copy text: ", err);
          }
        );
    };
    
    return (
        <tr>
            <td>{index}</td>
            <td>{account.email}</td>
            <td>
                <a className="copy-btn" style={{textDecoration: isCopied ? "none" : "initial"}} onClick={() => copyToClipboard(account.password)}>
                    {
                        !isCopied ?
                            <CopyIcon />:
                            <span style={{color: "red"}}>Copied</span>
                    }
                </a>
            </td>
            <td>{account.recoveryEmail}</td>
            <td>{account.phoneNumber}</td>
            <td>
                <div className="svg-group">
                    <EditIcon  onClick={() => clickEditedButton(account)}/>
                    <DeleteIcon onClick={() => clickDeleteButton(account.id)}/>
                </div>
            </td>
        </tr>
    )
}