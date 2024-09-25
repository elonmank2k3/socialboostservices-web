import { useState } from "react";
import { ReactComponent as AddIcon } from "../assets/add.svg";

const TransactionProof = () => {
    const [isProofAddModalShown, setIsProofAddModalShown] = useState(false)
    const [image, setImage] = useState("")
    const [proofImages, setProofImages] = useState([])

    useState(() => {
        fetch("http://localhost:8080/api/transactionproofs")
        .then(res => res.json())
        .then(data => setProofImages(data.reverse()))
    }, [])
    
    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
    
          reader.onloadend = () => {
            resolve(reader.result); // Return the base64 string
          };
    
          reader.onerror = (error) => {
            reject(error); // Return the error if there's an issue
          };
    
          reader.readAsDataURL(file); // Read file as Data URL (base64 string)
        });
      };

    function handleImageChange(file) {
        convertToBase64(file).then(result => setImage(result))
    };

    function toggleProofAddModal() {
        setIsProofAddModalShown((prevValue) => !prevValue)
    }

    function handleAddTransactionProof() {
        let payload = new URLSearchParams()
        payload.append("image", image)

        fetch("http://localhost:8080/api/transactionproofs", {
            method: "POST",
            body: payload,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        toggleProofAddModal()
    }

    function openImageInNewTab(imageData) {
        const newWindow = window.open();
        if (newWindow) {
            newWindow.document.write(`
                <html style="height: 100vh;">
                    <head>
                        <meta name="viewport" content="width=device-width, minimum-scale=0.1">
                        <title>Image Viewer</title>
                    </head>
                    <body style="display: flex; margin: 0; height: 100%; background-color: rgb(14, 14, 14);">
                        <img style="display: block; height: 100%; -webkit-user-select: none; margin: auto; 
                        background-color: hsl(0, 0%, 90%); transition: background-color 300ms;" src="${imageData}" alt="Image">
                    </body>
                </html>
            `);
            newWindow.document.close();
        } else {
            alert('Pop-up blocked! Please allow pop-ups for this website.');
        }
    };

    return (
        <>
            <div className="transaction-proof content">
                <div className="content__header">
                    <div className="button-group">
                        <button type="button" className="icon-button" onClick={toggleProofAddModal}>
                            <AddIcon />
                        </button>
                    </div>
                </div>
                <div className="content__body">
                    {proofImages.map((image, index) => (
                        <div key={index}>
                            <img src={image.image} alt="" />
                            <button onClick={() => openImageInNewTab(image.image)}
                            >View</button>
                        </div>
                    ))}
                </div>
            </div>
            {   
                isProofAddModalShown &&
                <div className="modal">
                    <form>
                        <input type="file" onChange={(e) => handleImageChange(e.target.files[0])}/>
                        <div className="form__button-group">
                            <button type="button" className="cancel-btn" onClick={toggleProofAddModal}>Cancel</button>
                            <button type="button" className="edit-btn" onClick={handleAddTransactionProof}>Add</button>
                        </div>
                    </form>
                </div>
            }
        </>
    );
}
 
export default TransactionProof;