const Header = () => {
    return (
        <header className='position-fixed top-0 w-100 z-2'>
            <nav class="navbar navbar-expand-md ">
                <div class="container-fluid">
                    <a class="navbar-brand fw-bold" href="#" style={{fontFamily: "Georgia"}}>SocialBoostServices</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="bi bi-list" style={{fontSize: "2rem", color: "white"}}></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ">
                        <li class="nav-item">
                            <a class="nav-link" href="#intro"><i class="bi bi-house-door-fill"></i> Home</a>
                        </li>
                         <li class="nav-item">
                            <a class="nav-link" href="#rules"><i class="bi bi-file-ruled-fill"></i> Rules</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#accounts"><i class="bi bi-grid-fill"></i> Accounts</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#contact"><i class="bi bi-person-lines-fill"></i> Contact</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#transaction"><i class="bi bi-ui-checks"></i>Transaction Proof</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#faqs"><i class="bi bi-question-circle-fill"></i> FAQs</a>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>
        </header>
    );
}
 
export default Header;