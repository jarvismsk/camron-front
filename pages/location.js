import React, { useEffect, useRef, useState } from 'react';

const LocationMap = () => {
  const [manualLocation, setManualLocation] = useState('');
  const [autoLocation, setAutoLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
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
    setAutocomplete(autocompleteInstance);

    // Listen for place changes
    autocompleteInstance.addListener('place_changed', onPlaceChanged);

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

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      console.error('Place has no geometry');
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); // Zoom to show more details
    }

    // Clear existing marker
    if (marker) {
      marker.setMap(null);
    }

    // Add marker for selected place
    const markerInstance = new window.google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name,
    });
    setMarker(markerInstance);
  };

  const handleManualLocationChange = (e) => {
    setManualLocation(e.target.value);
  };

  const handleManualLocationSubmit = (e) => {
    e.preventDefault();
    if (autocomplete) {
      autocomplete.set('place', null);
    }
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
    <div>
      <h1>Google Maps Location</h1>
      <form onSubmit={handleManualLocationSubmit}>
        <input
          type="text"
          value={manualLocation}
          onChange={handleManualLocationChange}
          placeholder="Enter location"
          ref={autocompleteRef}
        />
        <button type="submit">Search</button>
      </form>
      <div ref={mapRef} style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>
    </div>
  );
};

export default LocationMap;
