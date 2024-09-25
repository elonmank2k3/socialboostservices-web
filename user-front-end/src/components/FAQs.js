const FAQs = () => {
    const faqs = [
        {
            id: "flush-collapse01",
            header: `<strong>I have some questions that aren't in here. How can I contact you?</strong>`,
            body: `<em>Telegram</em>: @social_boost_services`
        },
        {
            id: "flush-collapse02",
            header: "<strong>How do I buy account?</strong>",
            body: `Follow steps
                <ol>
                    <li>Choose account</li>
                    <li>Contact me through Telegram, Facebook or WhatsApp</li>
                    <li>Send me ID account put on the top-left of account picture</li>
                    <li>I will check then sell for you</li>
                </ol>
                100% legit, check real Transaction Proof 👉<a href="#transaction">Here</a>👈`
        },
        {
            id: "flush-collapse03",
            header: "<strong>I have used up balance, what should I do with it?</strong>",
            body: `For Google account, give me back account, I will send back you $0.25 <br />
            But make sure that you don't set anything to recover this account, for example: phone number for Gmail...`
        }
    ]

    return ( 
        <section id="faqs">
            <p className='text-center fw-bold'>
                <span className='section-title resp-h4'>
                    <i class="bi bi-question-circle-fill"></i> &nbsp;
                    FAQs
                </span>
            </p>
            <div class="accordion accordion-flush" id="faqs-accordion">
                {
                    faqs.map(fqa => (
                        <AccordionItem id={fqa.id} header={fqa.header} body={fqa.body}/>
                    ))
                }
            </div>
        </section>
    );
}
 
export default FAQs;

const AccordionItem = ({ id, header, body }) => {
    var dataBsTarget = "#" + id
    return (
        <div class="accordion-item">
            <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
            data-bs-target={dataBsTarget} aria-expanded="false" aria-controls={id}>
                <div dangerouslySetInnerHTML={{ __html: header}} />
            </button>
            </h2>
            <div id={id} class="accordion-collapse collapse" data-bs-parent="#faqs-accordion">
                <div class="accordion-body" dangerouslySetInnerHTML={{ __html: body}}/>
                    <div  />
            </div>
        </div>
    )
}