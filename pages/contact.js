import React, { useEffect, useRef, useState } from 'react';
import Header from './header';
import Footer from './footer';

const ContactPage = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const exactLocation = {
    lat: 12.996215243595834, // Updated latitude
    lng: 77.66922642452403, // Updated longitude
  };

  const contactMethods = [
    {
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>,
      contact: "Salarpuria Magnificia, 11th Floor, No. 78, Next to KR Puram Tin Factory, Old Madras Road, Mahadevapura Bengaluru KA 560016",
      title: "Our office"
    },
    {
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>,
      contact: "+91 7022935544",
      title: "Phone"
    },
    {
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>,
      contact: "Support@camron.io",
      title: "Email"
    },
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBsq6QxUjeCZayWhfKITk0DTb1D6ZzOxwQ&libraries=places`;
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (map && exactLocation) {
      // Add a marker for the exact location with the label "Salarpuria Sattva Magnificia"
      const marker = new window.google.maps.Marker({
        position: exactLocation,
        map: map,
        title: 'Salarpuria Sattva Magnificia',
      });

      // Add an info window to display the label
      const infoWindow = new window.google.maps.InfoWindow({
        content: 'Salarpuria Sattva Magnificia',
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      setMarker(marker);
    }
  }, [map, exactLocation]);

  const initializeMap = () => {
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: exactLocation, // Set the center to your exact location
      zoom: 16, // Zoom in for better visibility
    });
    setMap(mapInstance);
  };

  return (
    <>
      <Header />
      <main className="py-14 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            <h3 className="text-indigo-600 font-semibold text-lg md:text-xl mb-4">
              Contact Us
            </h3>
            <p className="text-gray-700 mb-6">
              Let us know how we can help. We’re here to answer any questions you might have.
            </p>
            <ul className="space-y-4">
              {contactMethods.map((item, idx) => (
                <li key={idx}>
                  <h4 className="text-gray-800 text-base md:text-lg font-medium">{item.title}</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="text-gray-500">{item.icon}</div>
                    <p className="text-gray-700">{item.contact}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 rounded-lg overflow-hidden bg-white">
            <div ref={mapRef} className="w-full h-80 md:h-96"></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
