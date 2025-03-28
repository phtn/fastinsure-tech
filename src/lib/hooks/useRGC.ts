import { useEffect, useState } from 'react';

const useGoogleMaps = (apiKey: string) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoaded) {
      const existingScript = document.getElementById('google-maps-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.id = 'google-maps-script';
        script.async = true;
        script.onload = () => {
          setIsLoaded(true);
        };
        document.body.appendChild(script);
      } else {
        setIsLoaded(true);
      }
    }
  }, [apiKey, isLoaded]);

  return isLoaded;
};

export default useGoogleMaps;
