import BestPrice from '../assets/best-price.png'
import LegitPng from "../assets/legit.png"
import { useEffect, useState } from "react"

const Intro = () => {
    const [isError, setIsError] = useState(false)
    const [statistics, setStatistics] = useState([])

    useEffect(() => {
        fetch('https://api.socialboostservices.shop/api/statistics')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Fetch fail was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setStatistics(data)
          setIsError(false)
        })
        .catch(() => setIsError(true))
    }, [])

    return (
        <section id='intro' style={{paddingTop: "80px"}}>
            <p className="container text-center resp-h3 fw-bold">Sell YouLikeHits, AdsVlog, EasyHits4U, TrafficUp accounts</p>
            <div class="intro__grid container d-flex flex-column align-items-center text-center pt-3">
                <div class="intro__row row g-3 justify-content-center w-100">
                    <div class="intro__column col-12 col-md-4">
                        <div className='statistics text-white h-100 rounded py-3 px-3'>
                            <p className='resp-h3 text-white'>Statistics</p>
                            <table style={{width: "100%"}}>
                                <tr>
                                    <th>Service</th>
                                    <th>Available</th>
                                    <th>Sold</th>
                                </tr>
                                {
                                    isError ?
                                    <tr>
                                        <td>No data</td>
                                        <td>No data</td>
                                        <td>No data</td>
                                    </tr>:
                                    statistics.map((statistic, index) => 
                                    <tr key={index}>
                                        <td>{statistic.name}</td>
                                        <td>{statistic.availableAccountsNum}</td>
                                        <td>{statistic.soldAccountsNum}</td>
                                    </tr>                                        
                                )}
                                <tr></tr>
                            </table>
                            <p className='resp-heading-size fw-bold mt-3'>New service soon...</p>
                        </div>
                    </div>
                    <div className='intro__column col-12 col-md-7 d-flex flex-column justify-content-center border border-2 border-primary rounded'>
                        <p className="text-center resp-h4">
                            100% Cheap <img src={BestPrice} style={{width: "2em"}} alt="" /> 
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            100% Legit <img src={LegitPng} style={{width: "2em"}} alt="Legit" />
                        </p>
                        <div className='available-services'>
                            <p>Available services</p>
                            <div>
                                <img src={require("../assets/adsvlog.png")} alt="" />
                                <img src={require("../assets/easyhits4u.png")} alt="" />
                                <img src={require("../assets/trafficup.png")} alt="" />
                                <img src={require("../assets/youlikehits.png")} alt="" />
                                <img src={require("../assets/update-soon.png")} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Intro;