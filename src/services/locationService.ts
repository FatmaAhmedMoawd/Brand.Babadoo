async function safeFetch(url: string, options?: RequestInit): Promise<Response> {
  try {
    return await fetch(url, options).catch((error) => {
      console.warn(`safeFetch encountered direct network/CORS rejection for ${url}:`, error);
      return new Response(
        JSON.stringify({ error: "Network connection failed", details: String(error) }),
        { status: 503, statusText: "Service Unavailable", headers: { "Content-Type": "application/json" } }
      );
    });
  } catch (err) {
    console.warn(`safeFetch caught synchronous throw for ${url}:`, err);
    return new Response(
      JSON.stringify({ error: "Synchronous throw failed", details: String(err) }),
      { status: 503, statusText: "Service Unavailable", headers: { "Content-Type": "application/json" } }
    );
  }
}

export interface NominatimAddress {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    country?: string;
    state?: string;
    county?: string;
    city?: string;
    town?: string;
    village?: string;
    suburb?: string;
    neighbourhood?: string;
    road?: string;
    house_number?: string;
    residential?: string;
    quarter?: string;
    [key: string]: unknown;
  };
}

export const nominatimService = {
  async search(query: string): Promise<NominatimAddress[]> {
    if (!query.trim()) return [];
    
    try {
      const response = await safeFetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=eg&limit=5&addressdetails=1&accept-language=ar&email=support@babbadoo.com`
      );
      
      if (!response.ok) throw new Error("Search failed");
      
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Nominatim search error:", error);
      return [];
    }
  },

  async reverseGeocode(lat: number, lng: number): Promise<NominatimAddress | null> {
    try {
      const response = await safeFetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=ar&email=support@babbadoo.com`
      );
      
      if (!response.ok) throw new Error("Reverse geocode failed");
      
      const data = await response.json();
      
      if (data && data.error) {
         throw new Error(data.error);
      }
      
      return data || null;
    } catch (error) {
      console.error("Nominatim reverse geocode error:", error);
      return null;
    }
  },

  async getFallbackLocation(): Promise<{lat: number, lng: number}> {
    try {
      // First try ipinfo.io
      const response1 = await safeFetch("https://ipinfo.io/json");
      if (response1.ok) {
        const data1 = await response1.json();
        if (data1.loc) {
           const [latStr, lngStr] = data1.loc.split(',');
           if (latStr && lngStr) {
             return { lat: parseFloat(latStr), lng: parseFloat(lngStr) };
           }
        }
      }
    } catch (e) {
      console.warn("ipinfo.io failed:", e);
    }

    try {
      // Second try freeipapi.com
      const response2 = await safeFetch("https://freeipapi.com/api/json");
      if (response2.ok) {
        const data2 = await response2.json();
        if (data2.latitude && data2.longitude) {
           return { lat: data2.latitude, lng: data2.longitude };
        }
      }
    } catch (e) {
      console.warn("freeipapi.com failed:", e);
    }

    try {
      // Third try ipapi.co
      const response3 = await safeFetch("https://ipapi.co/json/");
      if (response3.ok) {
        const data3 = await response3.json();
        if (data3.latitude && data3.longitude) {
           return { lat: data3.latitude, lng: data3.longitude };
        }
      }
    } catch (e) {
      console.warn("ipapi.co failed:", e);
    }

    console.warn("All IP Geolocation APIs failed, yielding default location (Cairo)");
    return { lat: 30.0444, lng: 31.2357 };
  },

  getCurrentLocation(): Promise<{lat: number, lng: number}> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        nominatimService.getFallbackLocation().then(resolve).catch(() => reject(new Error("الوصول للموقع غير مدعوم في متصفحك")));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        async (error) => {
          console.warn("Geolocation API error details:", {
             code: error.code,
             message: error.message
          });
          
          try {
            const fallback = await nominatimService.getFallbackLocation();
            resolve(fallback);
          } catch (fallbackError) {
            let errorMessage = "حدث خطأ أثناء الحصول على الموقع";
            if (error.code === 1) errorMessage = "تم رفض إذن الوصول للموقع. يرجى السماح بالوصول في متصفحك أو المحاولة في نافذة جديدة.";
            else if (error.code === 2) errorMessage = "الموقع غير متاح حالياً. تأكد من تشغيل خدمة الموقع.";
            else if (error.code === 3) errorMessage = "انتهى وقت طلب الموقع، ولكن يمكنك اختيار الموقع يدوياً.";
            
            reject(new Error(errorMessage));
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000, 
          maximumAge: Infinity
        }
      );
    });
  }
};
