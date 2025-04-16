
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Flag, MapPin, Trophy, User, Settings, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const ProfilePage = () => {
  // Mock user data
  const user = {
    name: "Alex Johnson",
    initials: "AJ",
    handicap: 18.2,
    roundsPlayed: 12,
    coursesPlayed: 8,
    bestScore: 82,
    memberSince: "January 2024"
  };
  
  // Mock badges data
  const badges = [
    { id: 1, name: "First Round", icon: Flag, unlocked: true },
    { id: 2, name: "Course Explorer", icon: MapPin, unlocked: true },
    { id: 3, name: "Social Golfer", icon: User, unlocked: true },
    { id: 4, name: "Scorecard Collector", icon: Flag, unlocked: false },
    { id: 5, name: "Breaking 80", icon: Trophy, unlocked: false }
  ];
  
  // Mock recent rounds data
  const recentRounds = [
    { id: 1, course: "Auckland Golf Club", score: 84, date: "2 days ago" },
    { id: 2, course: "Gulf Harbour Country Club", score: 86, date: "1 week ago" },
    { id: 3, course: "Muriwai Golf Club", score: 89, date: "3 weeks ago" },
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" alt={user.name} />
              <AvatarFallback className="text-xl bg-primary/20 text-primary">{user.initials}</AvatarFallback>
            </Avatar>
            
            <div className="space-y-2 text-center md:text-left flex-1">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <div className="text-muted-foreground">Passionate golfer exploring NZ courses</div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Flag className="h-3 w-3" />
                  <span>Handicap: {user.handicap}</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{user.coursesPlayed} courses played</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Trophy className="h-3 w-3" />
                  <span>Best: {user.bestScore}</span>
                </Badge>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="stats" className="space-y-6">
        <TabsList>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="rounds">Rounds</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stats" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Your golf stats at a glance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-6">
                  <div>
                    <div className="text-3xl font-bold">{user.roundsPlayed}</div>
                    <div className="text-sm text-muted-foreground">Total Rounds</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{user.handicap}</div>
                    <div className="text-sm text-muted-foreground">Handicap</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{user.bestScore}</div>
                    <div className="text-sm text-muted-foreground">Best Score</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{user.coursesPlayed}</div>
                    <div className="text-sm text-muted-foreground">Courses Played</div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="text-sm font-medium mb-2">Average Score Trend</div>
                  <div className="h-[120px] bg-muted/50 rounded flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">Score trend chart will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest rounds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRounds.map((round) => (
                    <div key={round.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{round.course}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{round.date}</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold">{round.score}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" className="w-full flex items-center justify-between">
                  <span>View All Rounds</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Milestones</CardTitle>
              <CardDescription>Your golf journey highlights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Flag className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">First Round Logged</div>
                    <div className="text-sm text-muted-foreground">Jan 15, 2024 - Gulf Harbour Country Club</div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-medium">Personal Best Score</div>
                    <div className="text-sm text-muted-foreground">Feb 28, 2024 - Auckland Golf Club - Score: 82</div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium">5th Course Played</div>
                    <div className="text-sm text-muted-foreground">Mar 12, 2024 - Titirangi Golf Club</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rounds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Round History</CardTitle>
              <CardDescription>All your recorded rounds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRounds.map((round) => (
                  <div key={round.id} className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{round.course}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{round.date}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold">{round.score}</div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
                {/* Additional mock rounds */}
                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Remuera Golf Club</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>1 month ago</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">87</div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Waitakere Golf Club</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>2 months ago</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">91</div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Course Map</CardTitle>
              <CardDescription>All the golf courses you've played</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden border h-[300px] bg-muted relative mb-6">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center p-6">
                    <MapPin className="h-10 w-10 mx-auto mb-2" />
                    <p>Your personal golf course map</p>
                    <p className="text-sm">(Map visualization would be integrated here)</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/20">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">Auckland Golf Club</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Played 3 times</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/20">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">Gulf Harbour Country Club</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Played 2 times</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/20">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">Muriwai Golf Club</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Played 1 time</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/20">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">Remuera Golf Club</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Played 1 time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="badges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>Badges and milestones you've unlocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {badges.map((badge) => {
                  const Icon = badge.icon;
                  
                  return (
                    <div 
                      key={badge.id} 
                      className={`border rounded-lg p-4 flex flex-col items-center justify-center text-center ${
                        badge.unlocked ? '' : 'opacity-50'
                      }`}
                    >
                      <div className={`h-14 w-14 rounded-full flex items-center justify-center mb-2 ${
                        badge.unlocked 
                          ? 'bg-primary/20' 
                          : 'bg-muted'
                      }`}>
                        <Icon className={`h-8 w-8 ${
                          badge.unlocked 
                            ? 'text-primary' 
                            : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="font-medium">{badge.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {badge.unlocked ? 'Unlocked' : 'Locked'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
