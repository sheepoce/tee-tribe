
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import Map from '@/components/Map';

const MapView = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  
  // Mock data for courses
  const nearbyGolfCourses = [
    { id: 1, name: 'Auckland Golf Club', location: 'Auckland', played: true },
    { id: 2, name: 'Gulf Harbour Country Club', location: 'Whangaparaoa', played: true },
    { id: 3, name: 'Muriwai Golf Club', location: 'Muriwai', played: true },
    { id: 4, name: 'Titirangi Golf Club', location: 'Titirangi', played: false },
    { id: 5, name: 'Remuera Golf Club', location: 'Remuera', played: false },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Golf Courses Map</h1>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search courses..." className="pl-10 w-full sm:w-[250px]" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-lg overflow-hidden border h-[500px] bg-dark-surface relative">
          <Map 
            courses={nearbyGolfCourses}
            onCourseSelect={setSelectedCourse} 
          />
        </div>
        
        <div className="space-y-6">
          <Card className="bg-card-surface border-soft-grey text-white">
            <CardHeader className="pb-3">
              <CardTitle>Nearby Courses</CardTitle>
              <CardDescription className="text-soft-grey">Courses in your area</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {nearbyGolfCourses.map((course) => (
                <div 
                  key={course.id}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                    selectedCourse === course.name ? 'bg-primary/10' : 'hover:bg-dark-surface'
                  }`}
                  onClick={() => setSelectedCourse(course.name)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-full ${course.played ? 'bg-primary/20' : 'bg-soft-grey/20'}`}>
                      <MapPin className={`h-4 w-4 ${course.played ? 'text-primary' : 'text-soft-grey'}`} />
                    </div>
                    <div>
                      <div className="font-medium">{course.name}</div>
                      <div className="text-xs text-soft-grey">{course.location}</div>
                    </div>
                  </div>
                  {!course.played && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add to played</span>
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="bg-card-surface border-soft-grey text-white">
            <CardHeader className="pb-3">
              <CardTitle>Your Stats</CardTitle>
              <CardDescription className="text-soft-grey">Course check-ins and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Courses Played</span>
                  <span className="font-bold">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Regions Visited</span>
                  <span className="font-bold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Top Course Type</span>
                  <span className="font-bold">Links</span>
                </div>
                <div className="pt-2 mt-2 border-t border-soft-grey/30">
                  <Button variant="outline" className="w-full mt-2 rounded-2xl border-primary text-primary hover:text-white hover:bg-primary">
                    Check in at a Course
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapView;
