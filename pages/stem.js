import { useState, useEffect } from "react";

export default () => {
    const [steps, setSteps] = useState([
        {
            title: "Get the Price",
            description: "Submit your camera details to receive an instant price quote."
        },
        {
            title: "We'll Call You",
            description: "Our team will contact you shortly to discuss the offer and details."
        },
        {
            title: "Pickup",
            description: "Once agreed, we'll arrange a convenient pickup at your doorstep."
        },
    ]);
    
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [currentStep]);

    return (
        <div className="max-w-screen-xl mt-0 mx-auto mb-16 px-4 md:px-8">
            <h2 className="text-3xl underline decoration-solid font-bold decoration-blue-600 text-gray-900 mb-8">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, idx) => (
                    <div key={idx} className={`bg-white rounded-lg shadow-lg p-6 text-center ${idx + 1 <= currentStep ? "border-2 border-blue-600" : ""}`}>
                        <div className={`rounded-full w-16 h-16 flex items-center justify-center bg-blue-600 text-white font-bold mb-6 mx-auto`}>
                            {idx + 1}
                        </div>
                        <h3 className={`font-semibold text-lg ${idx + 1 === currentStep ? "text-blue-600" : "text-gray-800"}`}>{step.title}</h3>
                        <p className="text-gray-600 mt-4">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
