
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Flag, Camera, Clock, Calendar as CalendarIcon, Share2, ChevronRight, ChevronLeft } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { CourseSelectionDialog } from "@/components/courses/CourseSelectionDialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const RoundLogging = () => {
  const [formData, setFormData] = useState({
    course: '',
    date: new Date(),
    score: '',
    notes: ''
  });
  
  const [activeTab, setActiveTab] = useState<string>("scorecard");
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);
  const [currentHole, setCurrentHole] = useState(1);
  
  // Hole-by-hole data
  const [holeData, setHoleData] = useState(Array(18).fill({}).map(() => ({
    strokes: '',
    putts: '',
    fairwayHit: false,
    greenHit: false,
    notes: ''
  })));
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleHoleDataChange = (index: number, field: string, value: any) => {
    const newHoleData = [...holeData];
    newHoleData[index] = { ...newHoleData[index], [field]: value };
    setHoleData(newHoleData);
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, date }));
    }
  };

  const handleOpenCourseDialog = () => {
    setIsCourseDialogOpen(true);
  };
  
  const handleCourseSelect = (courseId: number) => {
    // In a real app, we would fetch course details based on this ID
    setActiveCourse(`Course ${courseId}`);
    setFormData(prev => ({ ...prev, course: `Course ${courseId}` }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Round data submitted:', formData);
    
    if (activeTab === "manual") {
      console.log('Hole data:', holeData);
    }
    
    toast({
      title: "Round Logged Successfully",
      description: `Your ${formData.score} at ${formData.course} has been saved.`,
    });
  };
  
  const totalScore = holeData.reduce((total, hole) => 
    total + (parseInt(hole.strokes) || 0), 0);

  const nextHole = () => {
    if (currentHole < 18) {
      setCurrentHole(currentHole + 1);
    }
  };
  
  const prevHole = () => {
    if (currentHole > 1) {
      setCurrentHole(currentHole - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Log Your Round</h1>
      </div>

      <Card className="bg-card-surface border-soft-grey text-white">
        <CardHeader>
          <CardTitle>How would you like to enter your round?</CardTitle>
          <CardDescription className="text-soft-grey">Choose the method that works best for you</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            defaultValue="scorecard" 
            className="grid gap-4"
            onValueChange={(value) => setActiveTab(value)}
          >
            <div className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer ${activeTab === 'scorecard' ? 'border-primary bg-primary/10' : 'border-soft-grey/30'}`}>
              <RadioGroupItem value="scorecard" id="scorecard" />
              <Label htmlFor="scorecard" className="flex flex-col flex-1 cursor-pointer">
                <span className="font-semibold">Scan Scorecard</span>
                <span className="text-soft-grey text-sm">Take a photo of your physical scorecard</span>
              </Label>
              <Camera className="h-5 w-5 text-primary" />
            </div>
            
            <div className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer ${activeTab === 'total' ? 'border-primary bg-primary/10' : 'border-soft-grey/30'}`}>
              <RadioGroupItem value="total" id="total" />
              <Label htmlFor="total" className="flex flex-col flex-1 cursor-pointer">
                <span className="font-semibold">Enter Total Score</span>
                <span className="text-soft-grey text-sm">Just the final number for quick logging</span>
              </Label>
              <Flag className="h-5 w-5 text-primary" />
            </div>
            
            <div className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer ${activeTab === 'manual' ? 'border-primary bg-primary/10' : 'border-soft-grey/30'}`}>
              <RadioGroupItem value="manual" id="manual" />
              <Label htmlFor="manual" className="flex flex-col flex-1 cursor-pointer">
                <span className="font-semibold">Manual Hole Entry (Advanced)</span>
                <span className="text-soft-grey text-sm">Track detailed stats for each hole</span>
              </Label>
              <Flag className="h-5 w-5 text-primary" />
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {activeTab === 'scorecard' && (
        <Card className="bg-card-surface border-soft-grey text-white">
          <CardHeader>
            <CardTitle>Scan Your Scorecard</CardTitle>
            <CardDescription className="text-soft-grey">Take a photo of your scorecard to automatically log your round</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
              <Camera className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium mb-1">Upload Scorecard</h3>
              <p className="text-sm text-muted-foreground mb-4">Take a photo or upload an image of your scorecard</p>
              <Button className="mb-2 bg-primary text-white">
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>
              <Button variant="outline" className="border-soft-grey text-soft-grey hover:bg-soft-grey/10">
                Upload from Gallery
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Make sure the scorecard is clearly visible with good lighting
            </p>
            
            <div className="mt-6 pt-6 border-t border-soft-grey/30">
              <Button 
                onClick={handleOpenCourseDialog} 
                variant="outline" 
                className="w-full border-primary text-primary hover:text-white hover:bg-primary"
              >
                {activeCourse ? activeCourse : "Select Golf Course"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'total' && (
        <Card className="bg-card-surface border-soft-grey text-white">
          <CardHeader>
            <CardTitle>Enter Round Details</CardTitle>
            <CardDescription className="text-soft-grey">Quick entry for your golf round</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="course">Golf Course</Label>
              <Button 
                onClick={handleOpenCourseDialog} 
                variant="outline" 
                className="w-full justify-start border-soft-grey text-soft-grey hover:bg-soft-grey/10"
              >
                {formData.course || "Select or enter course name"}
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date Played</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className="w-full justify-start border-soft-grey text-soft-grey hover:bg-soft-grey/10"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card-surface border-soft-grey" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={handleDateSelect}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="score">Total Score</Label>
              <Input 
                id="score" 
                name="score" 
                type="number"
                placeholder="Enter your score" 
                value={formData.score}
                onChange={handleChange}
                className="border-soft-grey bg-dark-surface text-white"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes & Highlights</Label>
              <Textarea 
                id="notes" 
                name="notes" 
                placeholder="Best shots, challenges, etc." 
                value={formData.notes}
                onChange={handleChange}
                className="border-soft-grey bg-dark-surface text-white"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-soft-grey/30 pt-6">
            <Button variant="outline" className="border-soft-grey text-soft-grey hover:bg-soft-grey/10">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-primary text-white">
              Save Round
            </Button>
          </CardFooter>
        </Card>
      )}

      {activeTab === 'manual' && (
        <Card className="bg-card-surface border-soft-grey text-white">
          <CardHeader>
            <CardTitle>Hole-by-Hole Entry</CardTitle>
            <CardDescription className="text-soft-grey">
              Track detailed stats for each hole
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course-select">Golf Course</Label>
                <Button 
                  onClick={handleOpenCourseDialog} 
                  variant="outline" 
                  className="w-full justify-start border-soft-grey text-soft-grey hover:bg-soft-grey/10"
                >
                  {formData.course || "Select or enter course name"}
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label>Date Played</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-soft-grey text-soft-grey hover:bg-soft-grey/10"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-card-surface border-soft-grey" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={handleDateSelect}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="rounded-lg border border-soft-grey/30 bg-card-surface p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Hole {currentHole}</h3>
                <div className="text-sm text-primary font-medium">
                  Par 4
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="strokes" className="text-sm">Strokes</Label>
                  <Input
                    id="strokes"
                    type="number"
                    className="border-soft-grey bg-dark-surface text-white mt-1"
                    value={holeData[currentHole - 1].strokes}
                    onChange={(e) => handleHoleDataChange(currentHole - 1, 'strokes', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="putts" className="text-sm">Putts</Label>
                  <Input
                    id="putts"
                    type="number"
                    className="border-soft-grey bg-dark-surface text-white mt-1"
                    value={holeData[currentHole - 1].putts}
                    onChange={(e) => handleHoleDataChange(currentHole - 1, 'putts', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Button
                  variant={holeData[currentHole - 1].fairwayHit ? "default" : "outline"}
                  className={holeData[currentHole - 1].fairwayHit ? "bg-primary text-white" : "border-soft-grey text-soft-grey hover:bg-soft-grey/10"}
                  onClick={() => handleHoleDataChange(currentHole - 1, 'fairwayHit', !holeData[currentHole - 1].fairwayHit)}
                >
                  Fairway Hit
                </Button>
                <Button
                  variant={holeData[currentHole - 1].greenHit ? "default" : "outline"}
                  className={holeData[currentHole - 1].greenHit ? "bg-primary text-white" : "border-soft-grey text-soft-grey hover:bg-soft-grey/10"}
                  onClick={() => handleHoleDataChange(currentHole - 1, 'greenHit', !holeData[currentHole - 1].greenHit)}
                >
                  Green in Regulation
                </Button>
              </div>
              
              <div className="mb-4">
                <Label htmlFor="hole-notes" className="text-sm">Notes</Label>
                <Textarea
                  id="hole-notes"
                  placeholder="Notes for this hole..."
                  className="border-soft-grey bg-dark-surface text-white mt-1"
                  value={holeData[currentHole - 1].notes}
                  onChange={(e) => handleHoleDataChange(currentHole - 1, 'notes', e.target.value)}
                />
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <Button
                  onClick={prevHole}
                  disabled={currentHole === 1}
                  variant="outline"
                  className="border-soft-grey text-soft-grey hover:bg-soft-grey/10"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <div className="text-sm text-soft-grey">
                  {currentHole} / 18
                </div>
                <Button
                  onClick={nextHole}
                  disabled={currentHole === 18}
                  variant="outline"
                  className="border-soft-grey text-soft-grey hover:bg-soft-grey/10"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
            
            <div className="rounded-lg border border-soft-grey/30 bg-card-surface p-4 mb-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Round Summary</h3>
                <div className="text-xl font-bold text-primary">
                  {totalScore || '--'}
                </div>
              </div>
              <p className="text-xs text-soft-grey mt-1">
                Complete all holes to see your final score
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-soft-grey/30 pt-6">
            <Button variant="outline" className="border-soft-grey text-soft-grey hover:bg-soft-grey/10">
              Save as Draft
            </Button>
            <Button onClick={handleSubmit} className="bg-primary text-white">
              Submit Round
            </Button>
          </CardFooter>
        </Card>
      )}

      <CourseSelectionDialog 
        isOpen={isCourseDialogOpen} 
        onOpenChange={setIsCourseDialogOpen} 
      />
    </div>
  );
};

export default RoundLogging;
