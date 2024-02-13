import Header from './header';
import Link from 'next/link';
import Image from 'next/image';


const HomePage = () => {
  return (
    <div>
      <Header />
      <div />

      <section className="mt-8 md:mt-18 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
        <div className="text-left font-bold md:text-center mx-3 space-y-4">

          <h1 className="text-gray-800 font-bold text-4xl md:leading-tight md:text-6xl">
            The Easiest Way to Sell your Used Camera &
            <span className="text-blue-600"> Get Instant Cash!</span>
          </h1>

          <p className="text-gray-600 font-medium text-center max-w-xl mx-auto leading-relaxed">
            Select the Brand -
          </p>
        </div>

      </section>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2">
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-center items-center">
          <div className="mx-auto sm:flex sm:flex-row flex-col items-center space-y-4 sm:space-y-0 sm:space-x-5">
            {[
              { brand: 'canon', logo: '/images/logo/canon.png', alt: 'Canon Logo' },
              { brand: 'nikon', logo: '/images/logo/nikon.png', alt: 'Nikon Logo' },
              { brand: 'sony', logo: '/images/logo/sony.png', alt: 'Sony Logo' },
            ].map((item, index) => (
              <Link key={index} href={`/brand?brand=${item.brand}`} passHref>
                <div className="p-6 md:p-6 md:mt-0 mt-0 rounded-lg text-center border-black border-opacity-100 border-gray-500 border-2 hover:border-gray-700 cursor-pointer hover:bg-gray-100 transition duration-300 my-5 flex items-center justify-center">
                  <Image src={item.logo} width={200} height={124} alt={item.alt} loading="lazy" className="object-contain" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </ul>
      <div />
    </div>
  );
};

export default HomePage;
