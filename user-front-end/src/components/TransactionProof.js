import { useState } from "react";

const TransactionProof = () => {
    const [proofImages, setProofImages] = useState([])
    const [isError, setIsError] = useState(false)

    useState(() => {
        fetch("https://api.socialboostservices.shop/api/transactionproofs")
        .then(res => {
            if (res.status != 200) throw new Error("Fetch transaction proof failed")
            return res.json()
        })
        .then(data => {
            setProofImages(data.reverse())
            setIsError(false)
        })
        .catch(() => setIsError(true))
    }, [])
    
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
        <section id="transaction">
            <p className='text-center fw-bold'>
                <span className='section-title resp-h4'>
                <i class="bi bi-ui-checks"></i> &nbsp;
                    Transaction Proof
                </span>
            </p>
            <p className="text-center">The 10 latest transactions</p>
            {
                !(!!proofImages.length) && <p className="text-center">No transaction proofs, updating soon...</p>
            }
            <div class="container text-center">
                <div class="grid-container">
                    {proofImages.map((image, index) => (
                        <div key={index} class="grid-item">
                            <img src={image.image} style={{width: "100%"}}/>
                            <div className="transactions__image-date">{image.date}</div>
                            <button onClick={() => openImageInNewTab(image.image)}
                            >View</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
 
export default TransactionProof;