
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from "@/components/ui/use-toast";

interface MapProps {
  courses: Array<{
    id: number;
    name: string;
    location: string;
    played: boolean;
    coordinates?: [number, number]; // Updated to use tuple type
  }>;
  onCourseSelect: (courseName: string) => void;
}

// Center coordinates for New Zealand
const NZ_CENTER: [number, number] = [172.5, -41.0];
const NZ_BOUNDS = {
  north: -34.1,
  south: -47.5,
  west: 166.0,
  east: 179.0
};

const Map = ({ courses, onCourseSelect }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');

  // Mock coordinates for the example courses (centered around New Zealand)
  const mockCoordinates: Record<string, [number, number]> = { // Explicitly type as tuple
    'Auckland Golf Club': [174.7633, -36.8485],
    'Gulf Harbour Country Club': [174.7633, -36.9],
    'Muriwai Golf Club': [174.4891, -36.8304],
    'Titirangi Golf Club': [174.6465, -36.9376],
    'Remuera Golf Club': [174.8058, -36.8824],
  };

  useEffect(() => {
    // Load the Mapbox token from input if not already set
    if (!mapboxToken && !map.current) {
      const storedToken = localStorage.getItem('mapboxToken');
      if (storedToken) {
        setMapboxToken(storedToken);
      }
    }

    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Dark theme for visual consistency
      center: NZ_CENTER, // Center on New Zealand
      zoom: 5,
      maxBounds: [
        [NZ_BOUNDS.west, NZ_BOUNDS.south], // Southwest coordinates
        [NZ_BOUNDS.east, NZ_BOUNDS.north]  // Northeast coordinates
      ]
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for each golf course with coordinates
    courses.forEach(course => {
      const coordinates = mockCoordinates[course.name as keyof typeof mockCoordinates];
      if (coordinates) {
        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.innerHTML = `<div class="${course.played ? 'bg-primary' : 'bg-secondary-mint'} text-white p-1 rounded-full cursor-pointer shadow-md flex items-center justify-center" style="width: 30px; height: 30px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>`;
        
        // Add popup
        const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
          .setHTML(`<div class="bg-card-surface text-white p-2 rounded-xl text-sm font-medium">${course.name}</div>`);

        // Add click event
        el.addEventListener('click', () => {
          onCourseSelect(course.name);
        });

        // Add marker to map
        new mapboxgl.Marker(el)
          .setLngLat(coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      }
    });

    // Fit map to New Zealand bounds when first loaded
    map.current.fitBounds([
      [NZ_BOUNDS.west, NZ_BOUNDS.south],
      [NZ_BOUNDS.east, NZ_BOUNDS.north]
    ], { padding: 50 });

    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [courses, mapboxToken, onCourseSelect]);

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('mapboxToken') as HTMLInputElement;
    const token = input.value.trim();
    
    if (!token) {
      toast({
        title: "Error",
        description: "Please enter a valid Mapbox token",
        variant: "destructive",
      });
      return;
    }
    
    // Validate token format (should start with 'pk.' for public tokens)
    if (!token.startsWith('pk.')) {
      toast({
        title: "Warning",
        description: "This appears to be a secret key. Please use a public token (pk.eyJ...)",
        variant: "destructive",
      });
    }
    
    localStorage.setItem('mapboxToken', token);
    setMapboxToken(token);
    
    toast({
      title: "Success",
      description: "Mapbox token saved successfully",
    });
  };

  if (!mapboxToken) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-dark-surface rounded-xl">
        <h3 className="text-lg font-bold mb-4">Mapbox API Token Required</h3>
        <p className="mb-4 text-soft-grey">To view the TeeTribe Map of New Zealand's 300+ golf courses, please enter your Mapbox <strong>public</strong> token:</p>
        <form onSubmit={handleTokenSubmit} className="w-full max-w-md">
          <div className="flex gap-2">
            <input 
              type="text" 
              name="mapboxToken"
              placeholder="pk.eyJ1..." 
              className="flex-1 rounded-2xl p-2 bg-card-surface border border-soft-grey"
              required
            />
            <button 
              type="submit" 
              className="bg-primary rounded-2xl px-4 py-2 text-white"
            >
              Set Token
            </button>
          </div>
          <p className="text-xs mt-2 text-soft-grey">
            You can get a free token at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary">mapbox.com</a>. Use a <strong>public</strong> token (starts with pk.eyJ...)
          </p>
        </form>
      </div>
    );
  }

  return <div ref={mapContainer} className="h-full rounded-lg" />;
};

export default Map;
