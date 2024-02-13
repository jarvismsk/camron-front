import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Karthik G Menon",
            title: "Coachin - Sold Nikon D5300",
            quote: "The exceptional service and professionalism exceeded my expectations. I wholeheartedly recommend Camco to sale and buy your camera ."
        },
        {
            name: "Akash Barman",
            title: "Bangalore - Sold Nikon D5600",
            quote: "The team for very polite and the entire experience for very quick."
        },
    ];

    return (
        <section className="py-14 bg-blue-100">
            <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h3 className="text-3xl font-semibold text-blue-800 mb-8">
                        See what others are saying about us
                    </h3>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((item, idx) => (
                        <div key={idx} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="p-6">
                                
                                <h4 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h4>
                                <p className="text-sm text-gray-600">{item.title}</p>
                                <p className="text-gray-700 mt-4">{item.quote}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
