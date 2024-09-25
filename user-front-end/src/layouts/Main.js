import Intro from "../components/Intro"
import Rules from "../components/Rules"
import Accounts from "../components/Accounts"
import Contact from "../components/Contact"
import AccountDetails from "../components/AccountDetails"
import TransactionProof from "../components/TransactionProof"
import FAQs from "../components/FAQs"
import { useState } from "react"

const Main = () => {
    const [selectedAccount, setSelectedAccount] = useState({
    })
    
    return ( 
        <>
            <main>
                <Intro />
                <Rules />
                <Accounts setSelectedAccount={setSelectedAccount} />
                <Contact />
                <TransactionProof />
                <FAQs />
                {
                    !!selectedAccount && <AccountDetails account={selectedAccount}/>
                }
            </main>
        </>
     );
}
 
export default Main;