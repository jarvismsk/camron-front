import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { CameraIcon } from '@heroicons/react/solid';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleContactClick = () => {
        router.push('/contact');
        setIsMobileMenuOpen(false); // Close the mobile menu after navigation
    };

    return (
        
        <header className="bg-white border-b border-gray-200">

<div class="bg-indigo-600 py-4">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center">
        <a href="tel:7022935544" class="text-white font-semibold  duration-150 hover:text-indigo-100 flex items-center gap-x-1">
            <span class="sm:hidden"> Call us: +91 7022935544</span>
            <span class="hidden sm:inline"> Enquiry? Call us: </span> <span class="hidden sm:inline">+91 7022935544</span>
        
        </a>
    </div>
</div>







            <div className="mx-auto max-w-screen-xl px-6 py-4 lg:px-8 flex justify-between items-center">
                <div>
                    <a href="/" className="flex items-center">
                        <img src="https://png.pngtree.com/png-vector/20221225/ourmid/pngtree-c-icon-metal-design-png-image_6536367.png" className="mr-3 h-12 sm:h-14" alt="Flowbite Logo" />
                        <span className="text-2xl font-semibold sm:text-3xl">Camco</span>
                    </a>
                </div>
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <nav className="hidden lg:flex justify-center items-center space-x-8">
                        <a href="/" className="text-gray-700 hover:text-black font-medium">Home</a>
                        <a href="#" className="text-gray-700 hover:text-black font-medium flex items-center" onClick={() => router.push('/sellcamera')}>Sell Camera <CameraIcon className="h-6 w-6 inline ml-1.5" aria-hidden="true" /></a>
                        <a href="/howitworks" className="text-gray-700 hover:text-black font-medium">How it works?</a>
                        <a href="#" className="text-gray-700 hover:text-black font-medium" onClick={handleContactClick}>Contact</a>
                    </nav>
                    <button onClick={toggleMobileMenu} className="lg:hidden text-gray-800 hover:text-black focus:outline-none">
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <nav className="lg:hidden bg-white py-4 px-6 mt-4">
                    <ul className="flex flex-col items-start space-y-4">
                        <li>
                            <a onClick={() => setIsMobileMenuOpen(false)} href="/" className="text-gray-600 hover:text-black font-medium">Home</a>
                        </li>
                        <li>
                            <a onClick={() => router.push('/sellcamera')} href="/sellcamera" className="text-gray-600 hover:text-black font-medium flex items-center">Sell Camera <CameraIcon className="h-6 w-6 inline ml-1" aria-hidden="true" /></a>
                        </li>
                        <li>
                            <a onClick={() => router.push('/howitworks')} href="/howitworks" className="text-gray-600 hover:text-black font-medium">How it works?</a>
                        </li>
                        <li>
                            <a onClick={handleContactClick} href="/contact" className="text-gray-600 hover:text-black font-medium">Contact</a>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
