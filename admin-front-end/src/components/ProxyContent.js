import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import { ReactComponent as EditIcon } from "../assets/edit.svg";

const ProxyContent = ({ proxies, clickEditedButton, clickDeleteButton }) => {

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
                <th>Host</th>
                <th>Port</th>
                <th>Username</th>
                <th>Password</th>
                <th>Protocol</th>
                <th>Exclusivity</th>
                <th>Origin</th>
                <th>Rotation</th>
                <th>Version</th>
                <th>Status</th>
                <th>SellerInfo</th>
                <th></th>
            </tr>
            {proxies.map((proxy, index) => 
                <ProxyRow proxy={proxy} index={index + 1} copyToClipboard={copyToClipboard} clickEditedButton={clickEditedButton} clickDeleteButton={clickDeleteButton}/>
            )}
        </table>
    );
}
 
export default ProxyContent;

const ProxyRow = ({ proxy, index, copyToClipboard, clickDeleteButton, clickEditedButton }) => {
    return (
        <tr>
            <td>{index}</td>
            <td>{proxy.host}</td>
            <td>{proxy.port}</td>
            <td>{proxy.username}</td>
            <td>{proxy.password}</td>
            <td>{proxy.protocol}</td>
            <td>{proxy.exclusivity}</td>
            <td>{proxy.origin}</td>
            <td>{proxy.rotation}</td>
            <td>{proxy.version}</td>
            <td>{proxy.status}</td>
            <td><a className="copy-btn" onClick={() => copyToClipboard(proxy.sellerInfo)}>Copy</a></td>           
            <td>
                <div className="svg-group">
                    <EditIcon  onClick={() => clickEditedButton(proxy)}/>
                    <DeleteIcon onClick={() => clickDeleteButton(proxy.id)}/>
                </div>
            </td>
        </tr>
    )
}