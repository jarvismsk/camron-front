import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../pages/header';
import { FaMobileAlt } from 'react-icons/fa'; // Import the mobile icon


const MobileNumber = () => {
  const router = useRouter();
  const { brand, model, price, lenses, condition } = router.query;
  const [loading, setLoading] = useState(false); // Add loading state
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const [policyAccepted, setPolicyAccepted] = useState(false); // Add state for policy acceptance




 


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

  const addMobileNumber = async (mobileNumber) => {
    const mobileData = {
      brand,
      model,
      mobilenumber: mobileNumber,
    };

    try {
      const response = await fetch("https://infinite-dusk-30605-e20af80cdc9e.herokuapp.com/mobilenumber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mobileData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Mobile Number Added", data);
        router.push(`/lens?brand=${brand}&model=${encodeURIComponent(model)}&price=${price}`);
      } else {
        console.error("Error adding mobile number");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before making the API call

    if (mobileNumber.length < 10) {
      setError('Please enter a valid mobile number');
      setLoading(false); // Set loading to false if there's an error
      return;
    }

    if (!policyAccepted) {
      setError('Please accept the policy');
      setLoading(false); // Set loading to false if policy is not accepted
      return;
    }

    try {
      await addMobileNumber(mobileNumber);
    } catch (error) {
      console.error('Error adding mobile number', error);
      setLoading(false); // Set loading to false in case of an error
    }

    setMobileNumber(""); // Clear the input field after submitting
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="bg-blue-600 w-full py-6">
        <h1 className="text-3xl font-bold text-white text-center">
          Please Enter Your Mobile Number to Check the 
        </h1>
        <p className="text-lg text-white text-center mt-2">
          Estimated Price: ₹XX,XXX
        </p>
      </div>
      <div className="flex-1 flex justify-center items-start mt-8">
        <div className="bg-white rounded-lg shadow-lg p-8 mt-4 max-w-md w-full">
          <div className="relative">
            <FaMobileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
            <input
              type="tel"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="pl-12 py-4 pr-4 border border-blue-300 rounded-lg focus:ring focus:ring-blue-200 transition-colors text-black w-full"
            />
          </div>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              checked={policyAccepted}
              onChange={() => setPolicyAccepted(!policyAccepted)}
              className="mr-2"
            />
            <p className="text-sm">
              I accept the Terms &  <Link className="text-blue-500" href="/policy">Policy</Link>
            </p>
          </div>
          <div className="mt-6 text-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className={`px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Please wait...' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNumber;