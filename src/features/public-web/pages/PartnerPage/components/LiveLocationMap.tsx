import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { nominatimService } from "../../../../../services/locationService";

// Fix for default marker icons in Leaflet with React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface LiveLocationMapProps {
  position: [number, number];
  onLocationChange?: (lat: number, lng: number) => void;
  onAddressFound?: (address: any) => void;
}

const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center[0], center[1], map]);
  return null;
};

export const LiveLocationMap: React.FC<LiveLocationMapProps> = ({ 
  position, 
  onLocationChange,
  onAddressFound
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleDragEnd = async (e: any) => {
    const marker = e.target;
    if (marker != null) {
      const pos = marker.getLatLng();
      if (onLocationChange) {
        onLocationChange(pos.lat, pos.lng);
      }
      
      if (onAddressFound) {
        setLoading(true);
        try {
          const addressData = await nominatimService.reverseGeocode(pos.lat, pos.lng);
          onAddressFound(addressData);
        } catch (error) {
          console.error("Error reverse geocoding:", error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="h-[220px] w-full rounded-2xl overflow-hidden relative border border-gray-200 shadow-sm z-0">
        <MapContainer 
          center={position} 
          zoom={15} 
          scrollWheelZoom={true}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker 
            position={position} 
            draggable={true}
            eventHandlers={{ dragend: handleDragEnd }}
          />
          <ChangeView center={position} />
        </MapContainer>
        
        {loading && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-[1000] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#D38842] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      <p className="text-xs text-gray-500 font-cairo px-1">
        * يمكنك سحب الدبوس على الخريطة لتحديد موقعك بدقة عالية.
      </p>
    </div>
  );
};

