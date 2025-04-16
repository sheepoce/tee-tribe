
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Trophy, MapPin, Users, ChevronRight, Flag } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to TeeTribe</h1>
      </div>
      
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Trophy className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Rounds</div>
            <p className="text-xs text-muted-foreground">
              played in the last 30 days
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm py-2 border-b">
                <span>Auckland Golf Club</span>
                <span className="text-muted-foreground">2 days ago</span>
              </div>
              <div className="flex items-center justify-between text-sm py-2 border-b">
                <span>Gulf Harbour Country Club</span>
                <span className="text-muted-foreground">1 week ago</span>
              </div>
              <div className="flex items-center justify-between text-sm py-2">
                <span>Muriwai Golf Club</span>
                <span className="text-muted-foreground">3 weeks ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Stats</CardTitle>
            <Target className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">18.2</div>
                <p className="text-xs text-muted-foreground">Current Handicap</p>
              </div>
              <div>
                <div className="text-2xl font-bold">82</div>
                <p className="text-xs text-muted-foreground">Best Score</p>
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Total Rounds</p>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">View all stats</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <MapPin className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Trophy className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">First Round</div>
                  <p className="text-xs text-muted-foreground">You've started your journey!</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-secondary/20 p-2 rounded-full">
                  <MapPin className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Course Explorer</div>
                  <p className="text-xs text-muted-foreground">Played 5 different courses</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-accent/20 p-2 rounded-full">
                  <Users className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-medium">Social Golfer</div>
                  <p className="text-xs text-muted-foreground">Added 3 friends to your tribe</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Friend Activity</CardTitle>
            <CardDescription>See where your friends are playing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-medium text-primary">JS</span>
                </div>
                <div>
                  <div className="font-medium">John Smith</div>
                  <p className="text-sm text-muted-foreground">Played a round at Titirangi Golf Club</p>
                  <span className="text-xs text-muted-foreground">Yesterday</span>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <span className="font-medium text-secondary">AD</span>
                </div>
                <div>
                  <div className="font-medium">Alice Davis</div>
                  <p className="text-sm text-muted-foreground">Shot a personal best (78) at Gulf Harbour</p>
                  <span className="text-xs text-muted-foreground">3 days ago</span>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="font-medium text-accent">MW</span>
                </div>
                <div>
                  <div className="font-medium">Mike Wilson</div>
                  <p className="text-sm text-muted-foreground">Added Wairakei Golf Course to their played list</p>
                  <span className="text-xs text-muted-foreground">1 week ago</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
