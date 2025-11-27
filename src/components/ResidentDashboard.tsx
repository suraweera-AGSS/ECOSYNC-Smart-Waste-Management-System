import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Bell, MapPin, Trash2, TruckIcon, Calendar, LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface ResidentDashboardProps {
  userEmail: string;
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

export function ResidentDashboard({ userEmail, onLogout, onNavigate }: ResidentDashboardProps) {
  const [notifications] = useState([
    { id: 1, message: "Collection scheduled for tomorrow at 8:00 AM", time: "2 hours ago", read: false },
    { id: 2, message: "Your report #1234 has been processed", time: "1 day ago", read: false },
    { id: 3, message: "Special cleanup drive this weekend", time: "2 days ago", read: true },
  ]);

  const [upcomingCollections] = useState([
    { id: 1, type: "General Waste", date: "Nov 19, 2025", time: "8:00 AM" },
    { id: 2, type: "Recyclables", date: "Nov 21, 2025", time: "9:00 AM" },
    { id: 3, type: "Organic Waste", date: "Nov 23, 2025", time: "8:30 AM" },
  ]);

  const [myReports] = useState([
    { id: 1234, location: "123 Main St", status: "Completed", date: "Nov 15, 2025" },
    { id: 1235, location: "125 Main St", status: "In Progress", date: "Nov 17, 2025" },
    { id: 1236, location: "127 Main St", status: "Pending", date: "Nov 18, 2025" },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500";
      case "In Progress": return "bg-blue-500";
      case "Pending": return "bg-amber-500";
      default: return "bg-gray-500";
    }
  };

  const NavContent = () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Signed in as</p>
        <p className="truncate">{userEmail}</p>
      </div>
      <div className="border-t pt-4 space-y-2">
        <Button variant="ghost" className="w-full justify-start" onClick={() => onNavigate("dashboard")}>
          <TruckIcon className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button variant="ghost" className="w-full justify-start" onClick={() => onNavigate("report")}>
          <Trash2 className="mr-2 h-4 w-4" />
          Report Issue
        </Button>
        <Button variant="ghost" className="w-full justify-start" onClick={() => onNavigate("tracking")}>
          <MapPin className="mr-2 h-4 w-4" />
          Track Trucks
        </Button>
        <Button variant="ghost" className="w-full justify-start" onClick={() => onNavigate("schedule")}>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule
        </Button>
      </div>
      <Button variant="outline" className="mt-auto" onClick={onLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <NavContent />
              </SheetContent>
            </Sheet>
            <h1 className="text-2xl text-primary">EcoCollect</h1>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">{userEmail}</span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("report")}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-red-100 p-3 mb-3">
                  <Trash2 className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="mb-1">Report Issue</h3>
                <p className="text-sm text-muted-foreground">Report full bins</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("tracking")}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-blue-100 p-3 mb-3">
                  <TruckIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-1">Track Trucks</h3>
                <p className="text-sm text-muted-foreground">Real-time location</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("schedule")}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-green-100 p-3 mb-3">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mb-1">Schedule</h3>
                <p className="text-sm text-muted-foreground">Collection times</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-purple-100 p-3 mb-3 relative">
                  <Bell className="h-8 w-8 text-purple-600" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </div>
                <h3 className="mb-1">Notifications</h3>
                <p className="text-sm text-muted-foreground">Updates & alerts</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Collections */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Collections</CardTitle>
              <CardDescription>Scheduled pickups in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingCollections.map((collection) => (
                  <div key={collection.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm">{collection.type}</p>
                        <p className="text-xs text-muted-foreground">{collection.time}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{collection.date}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* My Reports */}
          <Card>
            <CardHeader>
              <CardTitle>My Reports</CardTitle>
              <CardDescription>Track your submitted reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(report.status)}`}></div>
                      <div>
                        <p className="text-sm">Report #{report.id}</p>
                        <p className="text-xs text-muted-foreground">{report.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{report.status}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{report.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Notifications
                <Badge variant="secondary">{notifications.filter(n => !n.read).length} new</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`flex items-start gap-3 p-3 rounded-lg ${notification.read ? 'bg-secondary/30' : 'bg-primary/5 border border-primary/20'}`}
                  >
                    <Bell className={`h-5 w-5 mt-0.5 ${notification.read ? 'text-muted-foreground' : 'text-primary'}`} />
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
