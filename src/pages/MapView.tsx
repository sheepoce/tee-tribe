
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Filter, Search, ClipboardCheck, Route, UserCheck, Target } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Map from '@/components/Map';
import { toast } from "@/components/ui/use-toast";
import { CourseSelectionDialog } from '@/components/courses/CourseSelectionDialog';
import { useCourses } from '../hooks/useCourses';
import { Spinner } from '@/components/ui';
import type { Tables } from '../integrations/supabase/types';

type Course = Tables<'courses'>;

const MapView = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeRegion, setActiveRegion] = useState<string>("all");
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: courses, isLoading, error } = useCourses();
  
  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading courses: {error.message}</p>;

  const filteredByRegion = activeRegion === "all" 
    ? courses 
    : courses.filter(course => course.region === activeRegion);

  const filteredCourses = searchQuery === ''
    ? filteredByRegion
    : filteredByRegion.filter(course => 
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  const regionCounts = {
    north: courses.filter(c => c.region === 'north').length,
    south: courses.filter(c => c.region === 'south').length,
  };
  
  const handleSubmitRound = () => {
    setIsCourseDialogOpen(true);
  };
  
  const handleTrackFriends = () => {
    toast({
      title: "Friend Tracking",
      description: "Showing your friends' check-ins on the map",
    });
  };

  const handleCourseSelect = (courseName: string) => {
    const course = courses.find(c => c.name === courseName);
    if (course) {
      setSelectedCourse(course);
      setSearchQuery('');
    }
  };
  
  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">New Zealand Golf Map</h1>
            <p className="text-soft-grey mt-1">Explore 300+ courses across North & South Islands</p>
          </div>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search NZ courses..." 
              className="pl-10 w-full sm:w-[250px]" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery.length > 0 && (
              <Card className="absolute w-full mt-1 max-h-60 overflow-y-auto z-50">
                <ul className="py-2">
                  {filteredCourses.slice(0, 10).map((course) => (
                    <li key={course.id}>
                      <button
                        className="w-full px-4 py-2 text-left hover:bg-muted flex items-center gap-2"
                        onClick={() => handleCourseSelect(course.name)}
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
        
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={handleSubmitRound} 
            className="bg-primary text-white gap-2"
          >
            <ClipboardCheck className="h-4 w-4" />
            Log a Round
          </Button>
          <Button 
            onClick={handleTrackFriends} 
            variant="outline" 
            className="border-secondary-mint text-secondary-mint hover:bg-secondary-mint/10 gap-2"
          >
            <UserCheck className="h-4 w-4" />
            Track Friends
          </Button>
          <Button 
            variant="outline" 
            className="border-soft-grey text-soft-grey hover:bg-soft-grey/10 gap-2 ml-auto"
            onClick={() => toast({ title: "Filters", description: "Course filtering options would appear here" })}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-lg overflow-hidden border h-[500px] bg-dark-surface relative">
            <Tabs value={activeRegion} onValueChange={setActiveRegion} className="absolute top-4 left-4 z-10">
              <TabsList className="bg-card-surface border border-soft-grey/30">
                <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  All NZ
                </TabsTrigger>
                <TabsTrigger value="north" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  North Island
                </TabsTrigger>
                <TabsTrigger value="south" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  South Island
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
              <Button className="bg-primary rounded-full h-12 w-12 p-0 shadow-lg" 
                     onClick={() => toast({ title: "Check In", description: "Check in at this location" })}>
                <Target />
              </Button>
              <Button className="bg-secondary-mint rounded-full h-12 w-12 p-0 shadow-lg text-black"
                     onClick={() => toast({ title: "Navigation", description: "Start navigation to selected course" })}>
                <Route />
              </Button>
            </div>
            
            <Map 
              courses={filteredCourses.map(course => ({
                id: parseInt(course.id),
                name: course.name,
                location: course.address || '',
                region: course.region || 'Other',
                played: false,
                coordinates: course.lat && course.lng ? [course.lng, course.lat] : undefined
              }))}
              onCourseSelect={handleCourseSelect}
              activeRegion={activeRegion}
            />
          </div>
          
          <div className="space-y-6">
            <Card className="bg-card-surface border-soft-grey text-white">
              <CardHeader className="pb-3">
                <CardTitle>New Zealand Courses</CardTitle>
                <CardDescription className="text-soft-grey">TeeTribe's Launch Region</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {filteredCourses.map((course) => (
                  <div 
                    key={course.id}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                      selectedCourse?.id === course.id ? 'bg-primary/10' : 'hover:bg-dark-surface'
                    }`}
                    onClick={() => handleCourseSelect(course.name)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-full ${false ? 'bg-primary/20' : 'bg-soft-grey/20'}`}>
                        <MapPin className={`h-4 w-4 ${false ? 'text-primary' : 'text-soft-grey'}`} />
                      </div>
                      <div>
                        <div className="font-medium">{course.name}</div>
                        <div className="text-xs text-soft-grey">{course.address}</div>
                      </div>
                    </div>
                    {!false && (
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
                <CardTitle>Launch Region Stats</CardTitle>
                <CardDescription className="text-soft-grey">New Zealand Golf Coverage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total NZ Courses</span>
                    <span className="font-bold">{courses.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">North Island</span>
                    <span className="font-bold">{regionCounts.north}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">South Island</span>
                    <span className="font-bold">{regionCounts.south}</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-soft-grey/30">
                    <Button 
                      onClick={handleSubmitRound} 
                      variant="outline" 
                      className="w-full mt-2 rounded-2xl border-primary text-primary hover:text-white hover:bg-primary"
                    >
                      Check in at NZ Course
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <CourseSelectionDialog 
        isOpen={isCourseDialogOpen} 
        onOpenChange={setIsCourseDialogOpen} 
      />
    </>
  );
};

export default MapView;
