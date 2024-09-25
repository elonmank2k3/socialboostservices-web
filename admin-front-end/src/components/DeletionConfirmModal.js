const DeletionConfirmModal = ({ handleDeletionAccount }) => {
    return (
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
                        <button onClick={() => handleDeletionAccount(false)}>Cancel</button>
                        <button onClick={() => handleDeletionAccount(true)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default DeletionConfirmModal;