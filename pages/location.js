import React, { useEffect, useRef, useState } from 'react';

const LocationMap = () => {
  const [manualLocation, setManualLocation] = useState('');
  const [autoLocation, setAutoLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);
  const autocompleteService = useRef(null);
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

    // Initialize autocomplete service
    autocompleteService.current = new window.google.maps.places.AutocompleteService();

    // Initialize places service
    placesService.current = new window.google.maps.places.PlacesService(mapInstance);

    // Initialize geocoder
    geocoder.current = new window.google.maps.Geocoder();

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
    if (e.target.value.trim() !== '') {
      autocompleteService.current.getPlacePredictions(
        { input: e.target.value },
        handleAutocompleteResults
      );
    }
  };

  const handleAutocompleteResults = (predictions, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      console.log('Autocomplete predictions:', predictions);
      // Handle autocomplete predictions here
    } else {
      console.error('Autocomplete failed:', status);
      // Handle autocomplete failure
    }
  };

  const handleManualLocationSubmit = (e) => {
    e.preventDefault();
    console.log('Manually entered location:', manualLocation);
    geocodeLocation(manualLocation);
  };

  const handleAutoLocationSubmit = () => {
    if (!currentLocation) {
      console.error('Current location not available.');
      return;
    }
    console.log('Current location:', currentLocation);
    // Send currentLocation to backend for further processing
  };

  const geocodeLocation = (location) => {
    geocoder.current.geocode({ address: location }, (results, status) => {
      if (status === 'OK') {
        const locationLatLng = results[0].geometry.location;
        setCurrentLocation(locationLatLng);
        map.setCenter(locationLatLng);
        if (marker) {
          marker.setPosition(locationLatLng);
        } else {
          const newMarker = new window.google.maps.Marker({
            position: locationLatLng,
            map: map,
            title: 'Searched Location',
          });
          setMarker(newMarker);
        }
        map.setZoom(15); // Zoom to show searched location
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  };

  return (
    <div>
      <h1>Google Maps Location</h1>
      <form onSubmit={handleManualLocationSubmit}>
        <input
          type="text"
          value={manualLocation}
          onChange={handleManualLocationChange}
          placeholder="Enter location"
        />
        <button type="submit">Search</button>
      </form>
      <button onClick={handleAutoLocationSubmit}>
        Use Current Location
      </button>
      <div ref={mapRef} style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>
    </div>
  );
};

export default LocationMap;
