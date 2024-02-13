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
            q: "What camera brands can I sell?",
            a: "We purchase Nikon, Canon, and Sony brands."
        },

        {
            q: "From which locations do you purchase cameras?",
            a: "We offer free pickup across India at your doorstep."
        },

        {
            q: "Do you accept camera without the box or bill?",
            a: "Sorry, we require at least the box or the bill."
        },
        {
            q: "Do I receive payment instantly?",
            a: "Yes, you receive payment instantly before handing the camera to the executive."
        },   
        {
            q: "How long do I have to wait for pickup?",
            a: "We offer same-day pickup for your hassle-free experience."
        },        
        {
            q: "Are there any pickup charges?",
            a: "No, we don't have any pickup charges, our pickup is absolutely free across India."
        },
    ];
    

    return (
        <section className="max-w-screen-xl mx-auto  px-10 md:px-4  pt-8 mt-4 md:pt-12  pb-16">
            <div className="text-center mb-12">
                <h1 className="text-3xl text-blue-800 font-semibold mb-4">
                    Frequently Asked Questions
                </h1>
                <p className="text-gray-600 max-w-lg mx-auto text-lg">
                Answered all frequently asked questions, Still wondering for the best price? feel free to contact us.
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
