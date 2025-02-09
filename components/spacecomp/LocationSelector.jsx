import L from 'leaflet';
import MarkerIcon from '../../node_modules/leaflet/dist/images/marker-icon.png';
import MarkerShadow from '../../node_modules/leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";

const Spinner = () => {
  return (
    <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 border-solid border-gray-200 border-t-blue-500 rounded-full"></div>
  );
};

const LocationSelector = ({ onSelect }) => {
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef(null);

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        mapRef.current?.setView([lat, lng], 13);
        console.log('Selected Position:', { latitude: lat, longitude: lng });
      },
    });
    return null;
  };

  const handleGetMyLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true); 
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const newPos = [location.coords.latitude, location.coords.longitude];
          setPosition(newPos);
          mapRef.current?.setView(newPos, 13); 
          console.log('Current Position:', {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          });
          setIsLoading(false); 
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please enable location services.");
          setIsLoading(false); 
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setIsLoading(false); 
    }
  };

  const handleLocationSelect = () => {
    if (position) {
      onSelect(position[0], position[1]);
    }
  };

  const clearSelection = () => {
    setPosition(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full" style={{ height: '400px' }}>
        <MapContainer
          ref={mapRef}
          center={[19.07, 72.87]} // Default center
          zoom={15}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEvents />
          {position && (
            <Marker
              position={position}
              icon={
                new L.Icon({
                  iconUrl: MarkerIcon.src,
                  iconRetinaUrl: MarkerIcon.src,
                  iconSize: [25, 41],
                  iconAnchor: [12.5, 41],
                  popupAnchor: [0, -41],
                  shadowUrl: MarkerShadow.src,
                  shadowSize: [41, 41],
                })
              }
            />
          )}
        </MapContainer>
      </div>

      <div className="mt-4">
        <Button onClick={handleGetMyLocation} className="mr-4" disabled={isLoading}>
          {isLoading ? <Spinner /> : "Get My Location"}
        </Button>
        <Button onClick={handleLocationSelect} disabled={!position} className="mr-4">
          Select this location
        </Button>
        <Button onClick={clearSelection} className="bg-red-500">
          Clear 
        </Button>
      </div>
    </div>
  );
};

export default LocationSelector;
