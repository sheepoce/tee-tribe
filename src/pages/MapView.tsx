
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Filter, Search, ClipboardCheck, Route, UserCheck, Target } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Map from '@/components/Map';
import { toast } from "@/components/ui/use-toast";

const MapView = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<string>("all");
  
  // Mock data for NZ courses with regions
  const newZealandGolfCourses = [
    { id: 1, name: 'Auckland Golf Club', location: 'Auckland', region: 'north', played: true },
    { id: 2, name: 'Gulf Harbour Country Club', location: 'Whangaparaoa', region: 'north', played: true },
    { id: 3, name: 'Muriwai Golf Club', location: 'Muriwai', region: 'north', played: true },
    { id: 4, name: 'Titirangi Golf Club', location: 'Titirangi', region: 'north', played: false },
    { id: 5, name: 'Remuera Golf Club', location: 'Remuera', region: 'north', played: false },
    { id: 6, name: 'Christchurch Golf Club', location: 'Christchurch', region: 'south', played: false },
    { id: 7, name: 'Millbrook Resort', location: 'Queenstown', region: 'south', played: true },
    { id: 8, name: 'Paraparaumu Beach Golf Club', location: 'Paraparaumu', region: 'north', played: false },
    { id: 9, name: 'Wairakei Golf Course', location: 'Taupo', region: 'north', played: false },
    { id: 10, name: 'The Hills', location: 'Arrowtown', region: 'south', played: false },
  ];
  
  const filteredCourses = activeRegion === "all" 
    ? newZealandGolfCourses 
    : newZealandGolfCourses.filter(course => course.region === activeRegion);
  
  const regionCounts = {
    north: newZealandGolfCourses.filter(c => c.region === 'north').length,
    south: newZealandGolfCourses.filter(c => c.region === 'south').length,
  };
  
  const handleSubmitRound = () => {
    if (selectedCourse) {
      toast({
        title: "Round Submission Started",
        description: `Starting a new round submission for ${selectedCourse}`,
      });
      // Navigate to round submission page or open modal
      // This would be implemented based on the app's navigation structure
    } else {
      toast({
        title: "No Course Selected",
        description: "Please select a course first to submit a round",
        variant: "destructive",
      });
    }
  };
  
  const handleTrackFriends = () => {
    toast({
      title: "Friend Tracking",
      description: "Showing your friends' check-ins on the map",
    });
    // This would activate a filter to show friends' check-ins
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Zealand Golf Map</h1>
          <p className="text-soft-grey mt-1">Explore 300+ courses across North & South Islands</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search NZ courses..." className="pl-10 w-full sm:w-[250px]" />
        </div>
      </div>
      
      {/* Action Buttons - Added for round submissions and tracking */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSubmitRound} className="bg-primary text-white gap-2">
          <ClipboardCheck className="h-4 w-4" />
          Submit Round
        </Button>
        <Button onClick={handleTrackFriends} variant="outline" className="border-secondary-mint text-secondary-mint hover:bg-secondary-mint/10 gap-2">
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
          
          {/* Quick Action Floating Buttons */}
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
            courses={filteredCourses}
            onCourseSelect={setSelectedCourse}
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
              <CardTitle>Launch Region Stats</CardTitle>
              <CardDescription className="text-soft-grey">New Zealand Golf Coverage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total NZ Courses</span>
                  <span className="font-bold">300+</span>
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
  );
};

export default MapView;
