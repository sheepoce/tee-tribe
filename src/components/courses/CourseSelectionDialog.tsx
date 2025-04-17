
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data - will be replaced with actual course data
const NEW_ZEALAND_COURSES = [
  { id: 1, name: 'Auckland Golf Club', location: 'Auckland', region: 'North Island' },
  { id: 2, name: 'Christchurch Golf Club', location: 'Christchurch', region: 'South Island' },
  // Add more courses
];

interface CourseSelectionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CourseSelectionDialog({ isOpen, onOpenChange }: CourseSelectionDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredCourses = NEW_ZEALAND_COURSES.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCourseSelect = (courseId: number) => {
    navigate(`/rounds/new/${courseId}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select a Course</DialogTitle>
          <DialogDescription>
            Find a course to log your round
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search courses" 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="max-h-[300px] overflow-y-auto">
          {filteredCourses.map(course => (
            <div 
              key={course.id} 
              className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md cursor-pointer"
              onClick={() => handleCourseSelect(course.id)}
            >
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">{course.name}</div>
                  <div className="text-xs text-muted-foreground">{course.location}</div>
                </div>
              </div>
            </div>
          ))}
          {filteredCourses.length === 0 && (
            <div className="text-center text-muted-foreground py-4">
              No courses found
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
