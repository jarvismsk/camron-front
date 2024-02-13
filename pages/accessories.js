import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../pages/header';
import { FaCheck } from 'react-icons/fa';

const Meta = () => {
    return (
      <>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Camco is your go-to place to sell Nikon, Canon, and Sony cameras online in Bangalore. Get instant cash for your used DSLR cameras and camera lenses. Explore our online camera sale for exciting offers and the best prices."
        />
        <meta
          name="keywords"
          content="sell camera online, sell my camera online, sell your camera online, sell Nikon camera, sell Canon camera, sell Sony camera, DSLR camera, camera lenses, sell used camera Bangalore, camera sale online, online camera selling, camera equipment sale"
        />
        <meta name="robots" content="index, follow" />
  
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Camco is your go-to place to sell Nikon, Canon, and Sony cameras online in Bangalore. Get instant cash for your used DSLR cameras and camera lenses. Explore our online camera sale for exciting offers and the best prices."
        />
     
        <meta property="og:url" content="https://www.camco.org.in/" />
  
        {/* Twitter */}
        <meta name="twitter:card" />
        <meta
          name="twitter:description"
          content="Camco is your go-to place to sell Nikon, Canon, and Sony cameras online in Bangalore. Get instant cash for your used DSLR cameras and camera lenses. Explore our online camera sale for exciting offers and the best prices."
        />
      
        <meta name="twitter:url" content="https://www.camco.org.in/" />
      </>
    );
  };

const AccessoriesPage = () => {
    const router = useRouter();
    const { brand, model, price, lenses, condition } = router.query;
    const [selectedAccessories, setSelectedAccessories] = useState({
        Box: false,
        Bill: false,
        Warranty: false,
    });

    const handleAccessoryToggle = (accessory) => {
        setSelectedAccessories((prevAccessories) => ({
            ...prevAccessories,
            [accessory]: !prevAccessories[accessory],
        }));
    };

    const accessoryImage = (accessory) => {
        switch (accessory) {
            case 'Box':
                return '/images/accessories/box.png';
            case 'Bill':
                return '/images/accessories/bill.png';
            case 'Warranty':
                return '/images/accessories/warranty.png';
            default:
                return ''; // Default image path
        }
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header />
            <h1 className="text-4xl md:text-5xl pb-0 mb-4 mt-10 font-bold text-gray-800 text-center">
                Select the Accessories
            </h1>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-10">
                {Object.entries(selectedAccessories).map(([accessory, isSelected]) => (
                    <li key={accessory}>
                        <button
                            onClick={() => handleAccessoryToggle(accessory)}
                            className={`py-4 px-6 rounded-lg ${
                                isSelected
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-blue-100 text-gray-800 '
                            } focus:ring focus:ring-blue-300 transition-colors w-full flex justify-between items-center`}
                        >
                            <div className="flex items-center">
                                <Image
                                    src={accessoryImage(accessory)}
                                    alt={accessory}
                                    width={40}
                                    height={30}
                                />
                                <span className={`ml-2 uppercase ${isSelected ? 'font-bold' : ''}`}>{accessory}</span>
                            </div>
                            {isSelected && <FaCheck className="text-green-500" />}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="w-full max-w-md mt-8 mx-auto">
                <Link
                    href={`/final?brand=${brand}&model=${model}&price=${price}&lenses=${lenses}&condition=${condition}&accessories=${Object.entries(
                        selectedAccessories
                    )
                        .filter(([, isSelected]) => isSelected)
                        .map(([accessory]) => accessory)
                        .join(',')}`}
                >

                    
                    <button
                        className="w-full py-8 px-4 my-3 bg-blue-500 text-white hover:bg-blue-600 rounded-md focus:ring focus:ring-blue-300 transition-colors"
                    >
                        Next: View Final Price
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AccessoriesPage;

