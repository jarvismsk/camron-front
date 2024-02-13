import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../pages/header';
import Loading from './Loading'; // Import the Loading component

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

const ScrollDownIndicator = () => {
  const handleScrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="fixed bottom-10 right-10 flex items-center justify-center bg-black rounded-full p-3 cursor-pointer"
      onClick={handleScrollDown}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white animate-bounce"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  );
};

const LensPage = ({ lenses }) => {
  const router = useRouter();
  const { brand, model, price } = router.query;
  const [selectedLenses, setSelectedLenses] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleLensToggle = (lens) => {
    if (isSelected(lens)) {
      handleLensDeselect(lens);
    } else {
      handleLensSelect(lens);
    }
  };

  const handleLensSelect = (lens) => {
    if (selectedLenses.length < 3) {
      setSelectedLenses((prevLenses) => [...prevLenses, lens]);
    }
  };

  const handleLensDeselect = (lens) => {
    setSelectedLenses((prevLenses) =>
      prevLenses.filter((prevLens) => prevLens.model !== lens.model)
    );
  };

  const isSelected = (lens) =>
    selectedLenses.some((selectedLens) => selectedLens.model === lens.model);

  const lensImage = (model) => {
    switch (model) {
      case 'Canon EF-S 18-55mm f/3.5-5.6':
        return '/images/canonLens/canon18-55.png';
      case 'Canon EF-S 55-250mm F4-5.6':
        return '/images/canonLens/canon55-250.png';
      case 'Canon EF 50mm F/1.8':
        return '/images/canonLens/canon50.png';
      case 'Canon 15-45mm f3.5-6.3':
        return '/images/canonLens/canon15-45.png';
      case 'Canon EF-S 18-135mm f/3.5-5.6':
        return '/images/canonLens/canon18-135.png';
      // Add cases for other lens models
      default:
        return '/images/default.png'; // Default image path
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <ScrollDownIndicator />

      <h1 className="text-4xl md:text-5xl lg:text-6xl pt-0 mt-10 pb-3 mb-4 font-bold text-black text-center">
        Select the Camera Lens
      </h1>
      <div className="flex-1 flex justify-center items-start">
        {loading ? (
          <Loading />
        ) : (
          <ul className="rounded bg-white border-black-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 md:p-10">
            {lenses.map((lens) => (
              <li key={lens._id}>
                <button
                  onClick={() => handleLensToggle(lens)}
                  className={`py-3 px-6 rounded-md ${
                    isSelected(lens)
                      ? 'bg-blue-400 text-lightblue focus:ring focus:ring-gray-300 transition-colors'
                      : 'bg-blue-100 text-black border border-blue-200 hover:bg-blue-200 focus:ring focus:ring-blue-200 transition-colors'
                  } w-full text-left`}
                >
                  <div className="flex items-center">
                    <Image
                      src={lensImage(lens.model)}
                      alt={lens.model}
                      width={120}
                      height={80}
                      loading="lazy"
                    />
                    <span className="ml-2">{lens.model}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Link
        href={`/condition?brand=${brand}&model=${model}&price=${price}&lenses=${selectedLenses
          .map((lens) => lens.price)
          .join(',')}`}
      >
<div className="flex mt-5 justify-center">
  <button
    className={`py-3 px-12 mb-10 hover:bg-gray-600 bg-blue-500 text-white rounded-md focus:ring focus:ring-gray-300 transition-colors`}
  >
    Next
  </button>
</div>

      </Link>
      <div className="mx-4 mt-1 mb-4 p-4 rounded bg-blue-500 text-center">
        <p className="text-white text-lg mt-1">
          Didn't find your Lens? Don't worry! Call us -{' '}
          <a href="tel:7022935544" className="text-white font-semibold">
            +91 70229 35544
          </a>
        </p>
      </div>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const { brand } = query;

  // Ensure the API endpoint name corresponds to the naming convention
  const res = await fetch(
    `https://stark-meadow-99394-06b7b830b309.herokuapp.com/${brand.toLowerCase()}lens`
  );
  const lenses = await res.json();

  return {
    props: {
      lenses,
    },
  };
}

export default LensPage;
