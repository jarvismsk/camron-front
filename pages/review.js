import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
            name: "Martin Escobar",
            title: "Founder of Meta",
            quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et est hendrerit, porta nunc vitae."
        },
        {
            avatar: "https://randomuser.me/api/portraits/women/79.jpg",
            name: "Angela Stian",
            title: "Product Designer",
            quote: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
        },
        {
            avatar: "https://randomuser.me/api/portraits/men/86.jpg",
            name: "Karim Ahmed",
            title: "DevOps Engineer",
            quote: "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain."
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
                                <img src={item.avatar} alt={item.name} className="w-20 h-20 mx-auto rounded-full mb-4" />
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
