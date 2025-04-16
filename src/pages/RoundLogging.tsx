
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flag, Camera, Clock, Calendar, Share2 } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const RoundLogging = () => {
  const [formData, setFormData] = useState({
    course: '',
    date: '',
    score: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Round data submitted:', formData);
    // Reset form or show success message
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Log Your Round</h1>
      </div>

      <Tabs defaultValue="manual" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Enter Manually</TabsTrigger>
          <TabsTrigger value="scan">Scan Scorecard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual" className="space-y-6">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Round Details</CardTitle>
                <CardDescription>Enter information about your round</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Golf Course</Label>
                  <Input 
                    id="course" 
                    name="course" 
                    placeholder="Select or enter course name" 
                    value={formData.course}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date Played</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input 
                        id="date" 
                        name="date" 
                        type="date" 
                        className="pl-10"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </div>
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
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes & Highlights</Label>
                  <Input 
                    id="notes" 
                    name="notes" 
                    placeholder="Best shots, challenges, etc." 
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Save Round</Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Rounds</CardTitle>
              <CardDescription>Your latest golf adventures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">Auckland Golf Club</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 2 days ago
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">84</div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Share</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">Gulf Harbour Country Club</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 1 week ago
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">86</div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Share</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scan Your Scorecard</CardTitle>
              <CardDescription>Take a photo of your scorecard to automatically log your round</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-1">Upload Scorecard</h3>
                <p className="text-sm text-muted-foreground mb-4">Take a photo or upload an image of your scorecard</p>
                <Button className="mb-2">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
                <Button variant="outline">Upload from Gallery</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Make sure the scorecard is clearly visible with good lighting
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoundLogging;
