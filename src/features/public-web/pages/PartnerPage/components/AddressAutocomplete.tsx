import React, { useState, useRef } from "react";
import { Navigation } from "lucide-react";
import { nominatimService, NominatimAddress } from "../../../../../services/locationService";

interface AddressAutocompleteProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSelect: (addressData: NominatimAddress, lat: number, lng: number) => void;
  placeholder?: string;
}

export const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({ 
  value, 
  onChange, 
  onSelect,
  placeholder 
}) => {
  const [predictions, setPredictions] = useState<NominatimAddress[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchPredictions = async (query: string) => {
    if (!query.trim()) {
      setPredictions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const data = await nominatimService.search(query);
      setPredictions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
    const query = e.target.value;
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    if (query.trim().length > 2) {
      debounceRef.current = setTimeout(() => {
        fetchPredictions(query);
      }, 500);
    } else {
      setPredictions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectPrediction = (prediction: NominatimAddress) => {
    setShowSuggestions(false);
    const lat = parseFloat(prediction.lat);
    const lng = parseFloat(prediction.lon);
    onSelect(prediction, lat, lng);
  };

  const handleCurrentLocation = async () => {
    setErrorMsg(null);
    setShowSuggestions(false);
    setIsSearching(true);
    
    try {
      const position = await nominatimService.getCurrentLocation();
      const addressData = await nominatimService.reverseGeocode(position.lat, position.lng);
      if (addressData) {
        onSelect(addressData, position.lat, position.lng);
      }
    } catch (error) {
      const err = error as Error & { message?: string };
      console.error("Location detection failed:", error);
      setErrorMsg(err.message || "فشل في تحديد العنوان تلقائياً. يرجى إدخاله يدوياً.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <textarea
          rows={3}
          name="address"
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (predictions.length > 0) setShowSuggestions(true);
          }}
          placeholder={placeholder}
          className={`w-full border ${errorMsg ? 'border-red-400' : 'border-gray-300'} rounded-[20px] p-4 outline-none focus:border-[#D38842] focus:ring-4 focus:ring-[#D38842]/5 transition-all duration-300 bg-white shadow-sm resize-none`}
        ></textarea>
        {isSearching && (
          <div className="absolute top-4 end-4">
            <div className="w-5 h-5 border-2 border-[#D38842] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <button
          type="button"
          onClick={handleCurrentLocation}
          disabled={isSearching}
          className="absolute bottom-4 end-4 p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors flex items-center justify-center gap-2 px-3 shadow-sm border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="استخدام الموقع الحالي"
        >
          <Navigation className="w-4 h-4 text-[#D38842]" />
          <span className="text-xs font-bold">موقعي الحالي</span>
        </button>
      </div>

      {errorMsg && (
        <p className="text-xs text-red-500 mt-2 font-cairo block">{errorMsg}</p>
      )}

      {showSuggestions && predictions.length > 0 && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => setShowSuggestions(false)} />
          <div className="absolute left-0 right-0 z-[70] mt-1 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden max-h-[250px] overflow-y-auto animate-fade-in-up">
            {predictions.map((prediction, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPrediction(prediction)}
                className="w-full text-start px-4 py-3 hover:bg-[#D38842]/5 border-b border-gray-100 last:border-0 transition-colors"
              >
                <p className="text-sm font-medium text-gray-800 font-cairo line-clamp-2">
                  {prediction.display_name}
                </p>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
