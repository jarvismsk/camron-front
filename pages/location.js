import React, { useEffect, useRef, useState } from 'react';
import Header from './header';
import Footer from './footer';

const LocationMap = () => {
  const [manualLocation, setManualLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [message, setMessage] = useState('');
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);
  const placesService = useRef(null);
  const geocoder = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBsq6QxUjeCZayWhfKITk0DTb1D6ZzOxwQ&libraries=places`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 12.9716, lng: 77.5946 }, // Default to Bangalore
      zoom: 14,
    });
    setMap(mapInstance);

    // Initialize places service
    placesService.current = new window.google.maps.places.PlacesService(mapInstance);

    // Initialize geocoder
    geocoder.current = new window.google.maps.Geocoder();

    // Initialize autocomplete
    const autocompleteInstance = new window.google.maps.places.Autocomplete(
      autocompleteRef.current
    );
    autocompleteInstance.bindTo('bounds', mapInstance);

    // Event listener for place changed
    autocompleteInstance.addListener('place_changed', () => {
      const place = autocompleteInstance.getPlace();
      if (place.geometry && place.geometry.location) {
        setCurrentLocation(place.geometry.location);
        mapInstance.setCenter(place.geometry.location);
        if (marker) {
          marker.setPosition(place.geometry.location);
        } else {
          const markerInstance = new window.google.maps.Marker({
            position: place.geometry.location,
            map: mapInstance,
            title: place.formatted_address,
          });
          setMarker(markerInstance);
        }
        mapInstance.setZoom(15); // Zoom to show searched location
        if (place.address_components.some(component => component.types.includes('country') && component.long_name === 'India')) {
          setMessage('Great! Our service are available at your location. We will call you shortly.');
        } else {
          setMessage('Sorry! Our services are not available outside India.');
        }
      } else {
        setMessage('Location not found. Please try again.');
      }
    });
  };

  const handleManualLocationChange = (e) => {
    setManualLocation(e.target.value);
  };

  const handleManualLocationSubmit = (e) => {
    e.preventDefault();
    geocoder.current.geocode({ address: manualLocation }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const place = results[0];
        setCurrentLocation(place.geometry.location);
        map.setCenter(place.geometry.location);
        if (marker) {
          marker.setPosition(place.geometry.location);
        } else {
          const markerInstance = new window.google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.formatted_address,
          });
          setMarker(markerInstance);
        }
        map.setZoom(15); // Zoom to show searched location
        if (place.address_components.some(component => component.types.includes('country') && component.long_name === 'India')) {
          setMessage('Great! Our services are available at your location.');
        } else {
          setMessage('Sorry! Our services are not available outside India.');
        }
      } else {
        setMessage('Location not found. Please try again.');
      }
    });
  };

  const handleAutoLocationSubmit = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(currentPos);
          map.setCenter(currentPos);
          if (marker) {
            marker.setPosition(currentPos);
          } else {
            const markerInstance = new window.google.maps.Marker({
              position: currentPos,
              map: map,
              title: 'Your Current Location',
            });
            setMarker(markerInstance);
          }
          map.setZoom(15); // Zoom to show current location
          setMessage('Great! Our services are available at your current location.');
        },
        (error) => {
          console.error('Error fetching current location:', error);
          setMessage('Error fetching current location. Please try again.');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setMessage('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Please Select the Location</h1>
        <form onSubmit={handleManualLocationSubmit} className="flex flex-col mb-4">
          <input
            type="text"
            value={manualLocation}
            onChange={handleManualLocationChange}
            placeholder="Enter location"
            className="w-full p-2  border rounded"
            ref={autocompleteRef}
          />
          <button
            type="submit"
            className="w-full mt-2 bg-blue-500 text-white py-2 rounded cursor-pointer"
          >
            Search
          </button>
        </form>
        <button
          onClick={handleAutoLocationSubmit}
          className="w-full bg-blue-800 text-white py-2 rounded cursor-pointer"
        >
          Use Current Location
        </button>
        <div ref={mapRef} className="w-full h-96 mt-4 rounded overflow-hidden"></div>
        {message && <p className={`mt-4 ${message.includes('not found') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
      </div>
      <Footer/>
    </div>

  );
};

export default LocationMap;
