import React from 'react';
import { useRouter } from 'next/router';
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

const FinalPage = () => {
    const router = useRouter();
    const {
        brand,
        model,
        price,
        lenses,
        accessories,
    } = router.query;

    // Calculate the total price based on selections
    const calculateFinalPrice = () => {
        let totalPrice = parseInt(price, 10); // Parse price to an integer

        // Add lens prices
        if (lenses) {
            lenses.split(',').forEach((lensPrice) => {
                totalPrice += parseInt(lensPrice, 10); // Parse lens price to an integer
            });
        }

        // Add accessories price
        if (accessories) {
            const selectedAccessories = accessories.split(',');
            if (selectedAccessories.includes('box')) {
                totalPrice += 500;
            }
            if (selectedAccessories.includes('bill')) {
                totalPrice += 500;
            }
            if (selectedAccessories.includes('warranty')) {
                totalPrice += 500;
            }
        }

        return totalPrice;
    };

    return (
      <div className="bg-blue-200 min-h-screen flex flex-col">
          <Header />
          <div className="flex-grow flex flex-col items-center justify-center">
              <h1 className="text-4xl text-gray-800 font-semibold mt-10 mb-8 text-center">
                  The Estimated Price is
              </h1>
              <div className="bg-blue-500 bg-opacity-50 rounded-lg p-6 text-center max-w-md mx-auto">
                  <p className="text-4xl font-semibold text-white">₹ {calculateFinalPrice()}</p>
              </div>
              <div className="bg-blue-200 mt-8 p-6 rounded-lg mx-4 text-left">
               
                  <p className="text-lg text-gray-800 mb-4">
                      * The displayed price is not final and may vary based on the item's condition.
                  </p>

                  <p className="text-lg text-gray-800 mb-4">
                      * We will contact you shortly to proceed with the sale.
                  </p>
                  
              </div>
          </div>

          <button
              onClick={() => router.push('/location')}
              className="bg-blue-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 my-0 mt-0 mx-auto"
          >
              Next: Select Location
          </button>

          <div className="mt-8 bg-white p-6 mb-16 rounded-lg mx-5 text-center">
              <p className="text-lg text-gray-800 mt-1">
                  Not satisfied with the price? Let's make it right! Call us at{' '}
                  <a href="tel:7022935544" className="text-blue-500 font-semibold">
                      +91 70229 35544
                  </a>
              </p>
          </div>
      </div>
  );
};

export default FinalPage;
