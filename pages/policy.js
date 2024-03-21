import Header from './header';
import Footer from './footer';

const Policy = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Policy</h1>
                <div className="prose">
                    <p className="mb-4">
                        <strong>M./s Camco / Fusionics Space Ventures</strong>, headquartered in Bangalore (referred to as "buyer," "we," "us," or "our"), offers online and offline services facilitating customers in the purchase and sale of used cameras of all models.
                    </p>
                    <p className="mb-4">
                        By engaging with our services, you affirm that you are legally eligible to enter into contracts as per relevant laws and possess the authority to sell the camera(s) presented. You assert that you are either the owner or authorized agent/representative of the owner, thereby eligible to facilitate the sale.
                    </p>
                    <p className="mb-4">
                        Furthermore, you confirm that all information provided and declarations made regarding ownership and authority are accurate and truthful.
                    </p>
                    <p className="mb-4">
                        You also assure that the camera(s) being sold is in good, functional condition and agree to indemnify M./s Camco / Fusionics Space Ventures against any claims brought forth by third parties.
                    </p>
                    <p className="mb-4">
                        Additionally, you acknowledge that neither Camco / Fusionics Space Ventures nor any of its officers, directors, employees, shareholders, affiliates, or agents shall be held liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising from the sale of the camera(s). You assume sole responsibility for any legal implications or claims arising from the sale and agree to indemnify M./s Camco / Fusionics Space Ventures against any such claims.
                    </p>
                    <p className="mb-4">
                        It is understood that M./s Camco / Fusionics Space Ventures, as the purchaser, relies on the representations made by the seller in good faith and shall not be held accountable for any misleading claims made by the seller.
                    </p>
                    <p className="mb-4">
                        You agree to defend, indemnify, and hold harmless M./s Camco / Fusionics Space Ventures, its officers, subsidiaries, shareholders, affiliates, successors, assigns, directors, agents, service providers, suppliers, and employees from any claims, damages, liabilities, costs, or expenses arising from wrongful claims by the seller, third-party claims, or violation of third-party rights.
                    </p>
                    <p className="mb-4">
                        By electronically signing these terms and conditions, you affirm the accuracy and validity of the above declarations, binding both parties to these terms.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Policy;
