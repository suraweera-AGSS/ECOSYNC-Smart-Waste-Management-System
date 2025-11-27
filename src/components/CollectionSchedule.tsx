import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Calendar, Clock, Trash2, Recycle, Leaf } from "lucide-react";

interface CollectionScheduleProps {
  onBack: () => void;
}

export function CollectionSchedule({ onBack }: CollectionScheduleProps) {
  const schedule = [
    {
      day: "Monday",
      date: "Nov 18, 2025",
      collections: [
        { type: "General Waste", time: "8:00 AM - 10:00 AM", icon: Trash2, color: "text-gray-600", bgColor: "bg-gray-100" },
      ],
    },
    {
      day: "Tuesday",
      date: "Nov 19, 2025",
      collections: [
        { type: "General Waste", time: "8:00 AM - 10:00 AM", icon: Trash2, color: "text-gray-600", bgColor: "bg-gray-100" },
      ],
    },
    {
      day: "Wednesday",
      date: "Nov 20, 2025",
      collections: [
        { type: "General Waste", time: "8:00 AM - 10:00 AM", icon: Trash2, color: "text-gray-600", bgColor: "bg-gray-100" },
        { type: "Recyclables", time: "2:00 PM - 4:00 PM", icon: Recycle, color: "text-blue-600", bgColor: "bg-blue-100" },
      ],
    },
    {
      day: "Thursday",
      date: "Nov 21, 2025",
      collections: [
        { type: "General Waste", time: "8:00 AM - 10:00 AM", icon: Trash2, color: "text-gray-600", bgColor: "bg-gray-100" },
      ],
    },
    {
      day: "Friday",
      date: "Nov 22, 2025",
      collections: [
        { type: "General Waste", time: "8:00 AM - 10:00 AM", icon: Trash2, color: "text-gray-600", bgColor: "bg-gray-100" },
        { type: "Organic Waste", time: "1:00 PM - 3:00 PM", icon: Leaf, color: "text-green-600", bgColor: "bg-green-100" },
      ],
    },
    {
      day: "Saturday",
      date: "Nov 23, 2025",
      collections: [
        { type: "Recyclables", time: "9:00 AM - 11:00 AM", icon: Recycle, color: "text-blue-600", bgColor: "bg-blue-100" },
      ],
    },
    {
      day: "Sunday",
      date: "Nov 24, 2025",
      collections: [],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              Collection Schedule
            </CardTitle>
            <CardDescription>
              View your weekly waste collection schedule
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="space-y-4">
          {schedule.map((day, index) => (
            <Card key={index} className="shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{day.day}</CardTitle>
                    <CardDescription>{day.date}</CardDescription>
                  </div>
                  {day.collections.length === 0 && (
                    <Badge variant="secondary">No Collection</Badge>
                  )}
                  {day.day === "Tuesday" && (
                    <Badge className="bg-green-500">Tomorrow</Badge>
                  )}
                  {day.day === "Monday" && (
                    <Badge className="bg-blue-500">Today</Badge>
                  )}
                </div>
              </CardHeader>
              {day.collections.length > 0 && (
                <CardContent>
                  <div className="space-y-3">
                    {day.collections.map((collection, collIndex) => {
                      const Icon = collection.icon;
                      return (
                        <div
                          key={collIndex}
                          className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg"
                        >
                          <div className={`rounded-full ${collection.bgColor} p-3`}>
                            <Icon className={`h-6 w-6 ${collection.color}`} />
                          </div>
                          <div className="flex-1">
                            <p>{collection.type}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {collection.time}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Set Reminder
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>Collection Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Trash2 className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <p>General Waste</p>
                <p className="text-sm text-muted-foreground">
                  Non-recyclable household waste, food packaging, etc.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Recycle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p>Recyclables</p>
                <p className="text-sm text-muted-foreground">
                  Paper, cardboard, plastic bottles, glass, metal cans
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <Leaf className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p>Organic Waste</p>
                <p className="text-sm text-muted-foreground">
                  Food scraps, yard waste, compostable materials
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
