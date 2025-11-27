import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, TruckIcon, MapPin, Clock, Navigation } from "lucide-react";

interface TrackingMapProps {
  onBack: () => void;
}

export function TrackingMap({ onBack }: TrackingMapProps) {
  const [trucks] = useState([
    {
      id: "T-001",
      driver: "John Smith",
      status: "Active",
      location: "Main Street Area",
      eta: "15 minutes",
      progress: 65,
      route: "Route A - General Waste",
    },
    {
      id: "T-002",
      driver: "Maria Garcia",
      status: "Active",
      location: "Downtown District",
      eta: "30 minutes",
      progress: 45,
      route: "Route B - Recyclables",
    },
    {
      id: "T-003",
      driver: "David Chen",
      status: "Returning",
      location: "En route to depot",
      eta: "10 minutes",
      progress: 95,
      route: "Route C - Organic Waste",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500";
      case "Returning": return "bg-blue-500";
      case "Idle": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

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

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <Card className="lg:col-span-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Live Truck Tracking
              </CardTitle>
              <CardDescription>Real-time GPS location of collection trucks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg h-[500px] flex items-center justify-center relative overflow-hidden">
                {/* Map placeholder with truck markers */}
                <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                
                {/* Simulated truck markers */}
                <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-green-400 opacity-75"></div>
                    <div className="relative inline-flex rounded-full h-8 w-8 bg-green-500 items-center justify-center shadow-lg">
                      <TruckIcon className="h-4 w-4 text-white" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg whitespace-nowrap text-xs">
                      T-001
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 right-1/3 transform translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-green-400 opacity-75"></div>
                    <div className="relative inline-flex rounded-full h-8 w-8 bg-green-500 items-center justify-center shadow-lg">
                      <TruckIcon className="h-4 w-4 text-white" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg whitespace-nowrap text-xs">
                      T-002
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-1/4 left-2/3 transform -translate-x-1/2 translate-y-1/2">
                  <div className="relative">
                    <div className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-blue-400 opacity-75"></div>
                    <div className="relative inline-flex rounded-full h-8 w-8 bg-blue-500 items-center justify-center shadow-lg">
                      <TruckIcon className="h-4 w-4 text-white" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg whitespace-nowrap text-xs">
                      T-003
                    </div>
                  </div>
                </div>

                <div className="text-center z-10">
                  <MapPin className="h-16 w-16 text-primary/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Interactive map showing real-time truck locations
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    GPS tracking enabled
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Returning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <span>Idle</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Truck List */}
          <div className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Active Trucks</CardTitle>
                <CardDescription>{trucks.length} trucks on route</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {trucks.map((truck) => (
                  <Card key={truck.id} className="border-2">
                    <CardContent className="pt-4 pb-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TruckIcon className="h-5 w-5 text-primary" />
                            <span>{truck.id}</span>
                          </div>
                          <Badge variant="secondary" className="gap-1">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(truck.status)}`}></div>
                            {truck.status}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-muted-foreground text-xs">Location</p>
                              <p>{truck.location}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-muted-foreground text-xs">ETA</p>
                              <p>{truck.eta}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Route Progress</span>
                            <span>{truck.progress}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary rounded-full h-2 transition-all"
                              style={{ width: `${truck.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground">{truck.route}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
