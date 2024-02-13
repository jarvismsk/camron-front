import React, { useRef, useState } from "react";

const FaqsCard = (props) => {
    const answerElRef = useRef();
    const [state, setState] = useState(false);
    const [answerH, setAnswerH] = useState("0px");
    const { faqsList, idx } = props;

    const handleOpenAnswer = () => {
        const answerElH = answerElRef.current.childNodes[0].offsetHeight;
        setState(!state);
        setAnswerH(`${answerElH + 20}px`);
    };

    return (
        <div
            className="mb-6 pb-6 border-b"
            onClick={handleOpenAnswer}
        >
            <h4 className="cursor-pointer flex items-center justify-between text-lg text-gray-700 font-medium">
                {faqsList.q}
                {state ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                )}
            </h4>
            <div
                ref={answerElRef}
                className="overflow-hidden"
                style={{ maxHeight: state ? answerH : "0px", transition: "max-height 0.5s ease" }}
            >
                <div>
                    <p className="text-gray-500">{faqsList.a}</p>
                </div>
            </div>
        </div>
    );
};

const Faqs = () => {
    const faqsList = [
        {
            q: "What cameras do you sell?",
            a: "We sell a wide range of cameras, including DSLRs, mirrorless cameras, point-and-shoot cameras, and action cameras. Our inventory is constantly updated with the latest models from top brands."
        },
        {
            q: "Do you offer warranties for your cameras?",
            a: "Yes, we provide warranties for all the cameras we sell. Our warranties cover manufacturing defects and malfunctions, ensuring that you can purchase with confidence."
        },
        {
            q: "Can I return a camera if I'm not satisfied?",
            a: "Yes, we have a hassle-free return policy. If you're not satisfied with your purchase for any reason, you can return the camera within 30 days for a full refund or exchange."
        },
        {
            q: "Do you offer financing options for camera purchases?",
            a: "Yes, we offer financing options to make purchasing a camera more affordable. Our financing plans have flexible terms and competitive interest rates, making it easier to get the camera you want."
        }
    ];

    return (
        <section className="max-w-screen-xl mx-auto  px-10 md:px-4  pt-8 mt-4 md:pt-12  pb-16">
            <div className="text-center mb-12">
                <h1 className="text-3xl text-blue-800 font-semibold mb-4">
                    Frequently Asked Questions
                </h1>
                <p className="text-gray-600 max-w-lg mx-auto text-lg">
                    Answered all frequently asked questions, Still confused? feel free to contact us.
                </p>
            </div>
            <div className="max-w-lg mx-auto">
                {faqsList.map((item, idx) => (
                    <FaqsCard key={idx} idx={idx} faqsList={item} />
                ))}
            </div>
        </section>
    );
};

export default Faqs;
