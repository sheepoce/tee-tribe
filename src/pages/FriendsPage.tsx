
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, UserPlus, Flag, MapPin, ThumbsUp, MessageCircle } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const FriendsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for your friends
  const friends = [
    { id: 1, name: 'John Smith', initials: 'JS', roundsPlayed: 32, recentCourse: 'Titirangi Golf Club', days: 2 },
    { id: 2, name: 'Alice Davis', initials: 'AD', roundsPlayed: 28, recentCourse: 'Gulf Harbour', days: 3 },
    { id: 3, name: 'Mike Wilson', initials: 'MW', roundsPlayed: 45, recentCourse: 'Wairakei Golf Course', days: 7 },
    { id: 4, name: 'Sarah Johnson', initials: 'SJ', roundsPlayed: 15, recentCourse: 'Remuera Golf Club', days: 10 },
  ];

  // Mock feed activity
  const feedActivity = [
    { 
      id: 1, 
      user: 'John Smith', 
      initials: 'JS', 
      action: 'played a round at', 
      target: 'Titirangi Golf Club',
      score: 82,
      time: '2 days ago',
      likes: 5,
      comments: 2
    },
    { 
      id: 2, 
      user: 'Alice Davis', 
      initials: 'AD', 
      action: 'achieved a personal best at', 
      target: 'Gulf Harbour',
      score: 78,
      time: '3 days ago',
      likes: 12,
      comments: 4
    },
    { 
      id: 3, 
      user: 'Mike Wilson', 
      initials: 'MW', 
      action: 'added a new course', 
      target: 'Wairakei Golf Course',
      time: '1 week ago',
      likes: 3,
      comments: 1
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Friends</h1>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Find friends..." 
            className="pl-10 w-full sm:w-[250px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="feed" className="space-y-6">
        <TabsList>
          <TabsTrigger value="feed">Activity Feed</TabsTrigger>
          <TabsTrigger value="friends">Your Tribe</TabsTrigger>
          <TabsTrigger value="find">Find Golfers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Friend Activity</CardTitle>
              <CardDescription>See what your tribe is up to</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {feedActivity.map((activity) => (
                <div key={activity.id} className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary/20 text-primary">{activity.initials}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="font-medium">{activity.user}</span>
                        <span className="text-sm text-muted-foreground">{activity.action}</span>
                        <span className="font-medium">{activity.target}</span>
                      </div>
                      
                      {activity.score && (
                        <div className="flex items-center gap-2 mt-1">
                          <Flag className="h-4 w-4 text-primary" />
                          <span className="font-medium">{activity.score}</span>
                        </div>
                      )}
                      
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                      
                      <div className="flex items-center gap-4 mt-2">
                        <Button variant="ghost" size="sm" className="flex gap-1 h-8">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{activity.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex gap-1 h-8">
                          <MessageCircle className="h-4 w-4" />
                          <span>{activity.comments}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  {activity.id !== feedActivity.length && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="friends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Tribe Members</CardTitle>
              <CardDescription>People you're connected with</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/20 text-primary">{friend.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{friend.name}</div>
                        <div className="text-xs flex items-center gap-1 text-muted-foreground">
                          <Flag className="h-3 w-3" /> {friend.roundsPlayed} rounds
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1 justify-end">
                        <MapPin className="h-3 w-3" />
                        <span>{friend.recentCourse}</span>
                      </div>
                      <div className="text-xs text-right">{friend.days} days ago</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="find" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Find Golfers</CardTitle>
              <CardDescription>Connect with others on TeeTribe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-secondary/20 text-secondary">RL</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Robert Lee</div>
                      <div className="text-xs flex items-center gap-1 text-muted-foreground">
                        <Flag className="h-3 w-3" /> 22 rounds
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="h-8">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add Friend
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-secondary/20 text-secondary">EW</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Emma Walker</div>
                      <div className="text-xs flex items-center gap-1 text-muted-foreground">
                        <Flag className="h-3 w-3" /> 17 rounds
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="h-8">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add Friend
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-secondary/20 text-secondary">TN</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Tom Nelson</div>
                      <div className="text-xs flex items-center gap-1 text-muted-foreground">
                        <Flag className="h-3 w-3" /> 35 rounds
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="h-8">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add Friend
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FriendsPage;
