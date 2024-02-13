import React, { useEffect, useRef, useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const LocationMap = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBsq6QxUjeCZayWhfKITk0DTb1D6ZzOxwQ&libraries=places`;
    script.async = true;
    script.onload = () => {
      if (!window.google) return; // Ensure google is available
      initMap();
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    if (!mapRef.current) return; // Ensure mapRef.current is not null

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
    setMap(mapInstance);
  };

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    if (map) {
      map.setCenter(latLng);
      map.setZoom(15);
      if (marker) {
        marker.setPosition(latLng);
      } else {
        const newMarker = new window.google.maps.Marker({
          position: latLng,
          map: map,
        });
        setMarker(newMarker);
      }
    }
  };

  const handleSubmit = async () => {
    // Send address and coordinates to backend
    console.log('Submitting address:', address);
    console.log('Submitting coordinates:', coordinates);
  };

  return (
    <div className="mx-auto max-w-lg p-4">
      <h1 className="text-3xl font-semibold mb-4">Find Your Location</h1>
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Enter location',
                className: 'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500',
              })}
            />
            <div className="mt-2">
              {loading ? <div>Loading...</div> : null}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      style,
                      className: 'cursor-pointer px-4 py-2 hover:bg-gray-100',
                    })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <div ref={mapRef} style={{ width: '100%', height: '300px', marginTop: '20px' }}></div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>Submit Location</button>
    </div>
  );
};

export default LocationMap;
