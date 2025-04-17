
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from "@/components/ui/use-toast";

interface MapProps {
  courses: Array<{
    id: number;
    name: string;
    location: string;
    region?: string;
    played: boolean;
    coordinates?: [number, number]; // Tuple type for coordinates
  }>;
  onCourseSelect: (courseName: string) => void;
  activeRegion?: string;
}

// Center coordinates for New Zealand
const NZ_CENTER: [number, number] = [172.5, -41.0];

// Region-specific bounds
const REGION_BOUNDS = {
  all: {
    north: -34.1,
    south: -47.5,
    west: 166.0,
    east: 179.0
  },
  north: {
    north: -34.1,
    south: -41.5,
    west: 172.5,
    east: 179.0
  },
  south: {
    north: -40.5,
    south: -47.5,
    west: 166.0,
    east: 174.5
  }
};

const Map = ({ courses, onCourseSelect, activeRegion = 'all' }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapboxToken] = useState<string>('pk.eyJ1IjoiZnRyZXNpZGRlciIsImEiOiJjbTlrcXkzd2MwcG50MmtvZGlrMG4wcThyIn0.P62EMNTNt2icfIGN18VXfA');

  // Mock coordinates for the example courses (centered around New Zealand)
  const mockCoordinates: Record<string, [number, number]> = {
    'Auckland Golf Club': [174.7633, -36.8485],
    'Gulf Harbour Country Club': [174.7633, -36.9],
    'Muriwai Golf Club': [174.4891, -36.8304],
    'Titirangi Golf Club': [174.6465, -36.9376],
    'Remuera Golf Club': [174.8058, -36.8824],
    'Christchurch Golf Club': [172.6362, -43.5321],
    'Millbrook Resort': [168.8212, -44.9482],
    'Paraparaumu Beach Golf Club': [175.0165, -40.9000],
    'Wairakei Golf Course': [176.0678, -38.6295],
    'The Hills': [168.8352, -44.9468],
  };

  // Clear existing markers
  const clearMarkers = () => {
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
  };

  // Add markers for the filtered courses
  const addMarkers = () => {
    if (!map.current) return;
    
    clearMarkers();
    
    courses.forEach(course => {
      const coordinates = mockCoordinates[course.name];
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
        const marker = new mapboxgl.Marker(el)
          .setLngLat(coordinates)
          .setPopup(popup)
          .addTo(map.current!);
          
        markers.current.push(marker);
      }
    });
  };

  // Update map bounds based on active region
  const updateMapBounds = () => {
    if (!map.current) return;
    
    const bounds = REGION_BOUNDS[activeRegion as keyof typeof REGION_BOUNDS];
    
    map.current.fitBounds([
      [bounds.west, bounds.south],
      [bounds.east, bounds.north]
    ], { padding: 50, duration: 1000 });
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map if it doesn't exist
    if (!map.current) {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11', // Dark theme for visual consistency
        center: NZ_CENTER, // Center on New Zealand
        zoom: 5,
        maxBounds: [
          [REGION_BOUNDS.all.west, REGION_BOUNDS.all.south], // Southwest coordinates
          [REGION_BOUNDS.all.east, REGION_BOUNDS.all.north]  // Northeast coordinates
        ]
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Initial bounds
      map.current.on('load', () => {
        updateMapBounds();
        addMarkers();
      });
    } else {
      // Update markers when courses change
      addMarkers();
      
      // Update bounds when region changes
      updateMapBounds();
    }

    // Clean up on unmount
    return () => {
      if (map.current) {
        clearMarkers();
      }
    };
  }, [courses, mapboxToken, activeRegion, onCourseSelect]);

  useEffect(() => {
    // This effect runs when courses or activeRegion changes
    if (map.current) {
      addMarkers();
      updateMapBounds();
    }
  }, [courses, activeRegion]);

  return <div ref={mapContainer} className="h-full rounded-lg" />;
};

export default Map;
