
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from 'lucide-react';
import Map from '@/components/Map';
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';

type Course = Database['public']['Tables']['courses']['Row'];

export default function MapScreen() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [query, setQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Fetch courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .limit(500);
      if (!error && data) {
        setCourses(data);
        setFilteredCourses(data);
      }
    };
    fetchCourses();
  }, []);

  // Handle search
  useEffect(() => {
    if (query === '') {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, courses]);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setQuery('');
  };

  return (
    <div className="relative h-screen bg-background">
      {/* Map View */}
      <div className="h-full">
        <Map 
          courses={filteredCourses.map(course => ({
            id: parseInt(course.id),
            name: course.name,
            location: course.address || '',
            region: course.region || 'Other',
            played: false,
            coordinates: course.lat && course.lng ? [course.lng, course.lat] : undefined
          }))}
          onCourseSelect={(courseName) => {
            const course = courses.find(c => c.name === courseName);
            if (course) handleCourseSelect(course);
          }}
          activeRegion="all"
        />
      </div>

      {/* Search Input */}
      <div className="absolute top-4 left-4 right-4 z-10 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-10 bg-card text-foreground"
            placeholder="Search courses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query.length > 0 && (
            <Card className="absolute w-full mt-1 max-h-60 overflow-y-auto">
              <ul className="py-2">
                {filteredCourses.slice(0, 10).map((course) => (
                  <li key={course.id}>
                    <button
                      className="w-full px-4 py-2 text-left hover:bg-muted flex items-center gap-2"
                      onClick={() => handleCourseSelect(course)}
                    >
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{course.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>

      {/* Preview Card */}
      {selectedCourse && (
        <Card className="absolute bottom-4 left-4 right-4 max-w-md mx-auto bg-card p-4 border-border">
          <h3 className="text-lg font-semibold text-foreground">{selectedCourse.name}</h3>
          <p className="text-muted-foreground">{selectedCourse.region}</p>
          <p className="text-muted-foreground mt-1">{selectedCourse.address}</p>
          <Button className="w-full mt-3 bg-primary hover:bg-primary/90">
            Log a Round
          </Button>
        </Card>
      )}
    </div>
  );
}
