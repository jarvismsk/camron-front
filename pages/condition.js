import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Header from '../pages/header';

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

const ConditionPage = () => {
    const router = useRouter();
    const { brand, model, price, lenses } = router.query;
    const [selectedCondition, setSelectedCondition] = useState(null);

    const handleConditionSelect = (condition) => {
        setSelectedCondition(condition);
      
        const updatedPrice = parseInt(price) + conditionPrice[condition];
        const queryString = `brand=${brand}&model=${model}&price=${updatedPrice}&lenses=${lenses}&condition=${condition}`;
        
        const route = `/accessories?${queryString}`;
      
        router.push(route);
      };
      


    const conditionPrice = {
        great: 0,
        good: -500,
        average: -1200,
    };

    return (
      <div className="bg-white min-h-screen flex flex-col">
          <Header />
          <h1 className="text-4xl md:text-5xl pb-3 mb-4 mx-5 my-5 lg:text-6xl mt-0 pt-14 font-bold text-gray-800 text-center">
              Select the Camera Condition
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-10 md:px-44">
              <button
                  onClick={() => handleConditionSelect('great')}
                  className={`py-8 px-12 rounded-2xl border-4 border-blue-100 ${
                      selectedCondition === 'great'
                          ? 'bg-blue-200 text-blue-800 font-bold'
                          : 'bg-white text-gray-800'
                  } hover:bg-blue-200 focus:ring focus:ring-blue-400 transition-colors w-full mx-auto`}
              >
                  Great
              </button>
              <button
                  onClick={() => handleConditionSelect('good')}
                  className={`py-8 px-12 rounded-2xl border-4 border-blue-100 ${
                      selectedCondition === 'good'
                          ? 'bg-blue-200 text-blue-800 font-bold'
                          : 'bg-white text-gray-800'
                  } hover:bg-blue-200 focus:ring focus:ring-blue-400 transition-colors w-full mx-auto`}
              >
                  Good
              </button>
              <button
                  onClick={() => handleConditionSelect('average')}
                  className={`py-8 px-12 rounded-2xl border-4 border-blue-100 ${
                      selectedCondition === 'average'
                          ? 'bg-blue-200 text-blue-800 font-bold'
                          : 'bg-white text-gray-800'
                  } hover:bg-blue-200 focus:ring focus:ring-blue-400 transition-colors w-full mx-auto`}
              >
                  Average
              </button>
          </div>
      </div>
  );
};

export default ConditionPage;