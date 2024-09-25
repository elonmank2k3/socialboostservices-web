import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import { ReactComponent as EditIcon } from "../assets/edit.svg";

const ChromeUserContent = ({ chromeUsers, clickEditedButton, clickDeleteButton}) => {
     
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(
          () => {
            console.log("Text copied to clipboard successfully!");
            alert("Text copied to clipboard!");
          },
          (err) => {
            console.error("Failed to copy text: ", err);
          }
        );
    };

    return (
        <table>
            <tr>
                <th>ID</th>
                <th>Directory Name</th>
                <th>Google Account</th>
                <th>AdsVlog</th>
                <th></th>
            </tr>
            {chromeUsers.map((chromeUser, index) => 
                <AccountRow chromeUser={chromeUser} index={index + 1} copyToClipboard={copyToClipboard} clickEditedButton={clickEditedButton} clickDeleteButton={clickDeleteButton}/>
            )}
        </table>
    );
}
 
export default ChromeUserContent;

const AccountRow = ({ chromeUser, index, clickDeleteButton, clickEditedButton }) => {
    return (
        <tr>
            <td>{index}</td>
            <td>{chromeUser.directoryName}</td>
            <td>{chromeUser.googleAccount}</td>
            <td>{chromeUser.adsVlog}</td>
            <td>
                <div className="svg-group">
                    <EditIcon  onClick={() => clickEditedButton(chromeUser)}/>
                    <DeleteIcon onClick={() => clickDeleteButton(chromeUser.id)}/>
                </div>
            </td>
        </tr>
    )
}