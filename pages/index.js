import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../pages/header';
import Stem from './stem'
import Review from './review'
import Faq from './faq'
import Footer from './footer'
import LocationMap from './location';

const Meta = () => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta
        name="description"
        content="Camco is your go-to place to sell Nikon, Canon, and Sony cameras online in Bangalore and all across India. Get instant cash for your used DSLR cameras and camera lenses. Explore our online camera sale for exciting offers and the best prices."
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
        content="Camco is your go-to place to sell Nikon, Canon, and Sony cameras online in Bangalore and all across india. Get instant cash for your used DSLR cameras and camera lenses. Explore our online camera sale for exciting offers and the best prices."
      />
   
      <meta property="og:url" content="https://www.camco.org.in/" />

      {/* Twitter */}
      <meta name="twitter:card" />
      <meta
        name="twitter:description"
        content="Camco is your go-to place to sell Nikon, Canon, and Sony cameras online in Bangalore and all across India. Get instant cash for your used DSLR cameras and camera lenses. Explore our online camera sale for exciting offers and the best prices."
      />
    
      <meta name="twitter:url" content="https://www.camco.org.in/" />
    </>
  );
};

const HomePage = () => {
  return (
   <div>
      <Header />
      <div/>


      <section className="mt-14 md:mt-18 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
                <div className="text-left font-bold 	 md:text-center mx-3 space-y-4">

                    <h1 className="text-gray-800 font-bold text-4xl md:leading-tight md:text-6xl">
                       The Easiest Way to Sell your Used Camera &
                         <span className="text-blue-600"> Get Instant Cash!</span>
                    </h1>

                    <p className="text-gray-600 font-medium	 text-center max-w-xl mx-auto leading-relaxed">
                        Select the Brand - 
                    </p>
                </div>
      
            </section>



            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-3">
  <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-center items-center">
    <div className="mx-auto sm:flex sm:flex-row flex-col items-center space-y-4 sm:space-y-0 sm:space-x-5">
      {[
        { brand: 'canon', logo: '/images/logo/canon.png', alt: 'Canon Logo' },
        { brand: 'nikon', logo: '/images/logo/nikon.png', alt: 'Nikon Logo' },
        { brand: 'sony', logo: '/images/logo/sony.png', alt: 'Sony Logo' },
      ].map((item, index) => (
        <Link key={index} href={`/brand?brand=${item.brand}`} passHref>
          <div className="p-7  md:p-6 md:mt-0 mt-0 rounded-lg text-center  border-black border-opacity-100 border-gray-500 border-2 hover:border-gray-700 cursor-pointer hover:bg-gray-100 transition duration-300 my-5 flex items-center justify-center">
            <Image src={item.logo} width={200} height={124} alt={item.alt} loading="lazy" className="object-contain" />
          </div>
        </Link>
      ))}
    </div>
  </div>
</ul>

<span class="flex items-center">
  <span class="h-px flex-1 mx-20 my-10 md:my-10  bg-black"></span>
</span>

<Stem/>


<Review/>


<Faq/>

<LocationMap/>

<Footer/>



    </div>
  );
};

export default HomePage;

