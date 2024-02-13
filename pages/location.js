import React, { useEffect, useRef, useState } from 'react';

const LocationMap = () => {
  const [manualLocation, setManualLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
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
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
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

    // Fetch current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(currentPos);
          mapInstance.setCenter(currentPos);
          const markerInstance = new window.google.maps.Marker({
            position: currentPos,
            map: mapInstance,
            title: 'Your Location',
          });
          setMarker(markerInstance);
          mapInstance.panTo(currentPos);
          mapInstance.setZoom(15); // Zoom to show nearby details
        },
        (error) => {
          console.error('Error fetching current location:', error);
          // Handle error fetching current location
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Handle case where geolocation is not supported
    }
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
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ margin: '20px 0', fontSize: '24px', color: '#333' }}>Find Your Location</h1>
      <form
        onSubmit={handleManualLocationSubmit}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <input
          type="text"
          value={manualLocation}
          onChange={handleManualLocationChange}
          placeholder="Enter location"
          style={{
            width: '80%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '10px',
          }}
          ref={autocompleteRef}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </form>
      <div
        ref={mapRef}
        style={{ width: '90%', height: '400px', marginTop: '20px', borderRadius: '5px', overflow: 'hidden' }}
      ></div>
    </div>
  );
};

export default LocationMap;
