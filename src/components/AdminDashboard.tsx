import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {
  LogOut,
  TruckIcon,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  MapPin,
  BarChart3,
} from "lucide-react";

interface EcoSyncAdminDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

export function EcoSyncAdminDashboard({ userEmail, onLogout }: EcoSyncAdminDashboardProps) {
  const [reports, setReports] = useState([
    { id: 1236, location: "127 Main St", type: "Full Bin", status: "Pending", date: "Nov 18, 2025 14:30", assignedTo: null },
    { id: 1235, location: "125 Main St", type: "Overflowing", status: "In Progress", date: "Nov 17, 2025 10:15", assignedTo: "T-001" },
    { id: 1234, location: "123 Main St", type: "Missed Collection", status: "Completed", date: "Nov 15, 2025 08:45", assignedTo: "T-002" },
    { id: 1233, location: "121 Main St", type: "Damaged Bin", status: "Pending", date: "Nov 18, 2025 12:00", assignedTo: null },
  ]);

  const [trucks] = useState([
    { id: "T-001", driver: "John Smith", status: "Active", assigned: 3, completed: 12 },
    { id: "T-002", driver: "Maria Garcia", status: "Active", assigned: 2, completed: 15 },
    { id: "T-003", driver: "David Chen", status: "Returning", assigned: 1, completed: 18 },
    { id: "T-004", driver: "Sarah Johnson", status: "Idle", assigned: 0, completed: 10 },
  ]);

  const stats = {
    totalReports: 45,
    pending: 8,
    inProgress: 12,
    completed: 25,
    activeTrucks: 3,
    totalTrucks: 4,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500";
      case "In Progress": return "bg-blue-500";
      case "Pending": return "bg-amber-500";
      default: return "bg-gray-500";
    }
  };

  const handleAssignTruck = (reportId: number, truckId: string) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId ? { ...r, assignedTo: truckId, status: "In Progress" } : r
      )
    );
  };

  const handleUpdateStatus = (reportId: number, newStatus: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl text-primary font-semibold">
            EcoSync – Smart Waste Management
          </h1>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">{userEmail}</span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                  <p className="text-3xl mt-1">{stats.totalReports}</p>
                </div>
                <div className="rounded-full bg-blue-100 p-3">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-3xl mt-1">{stats.pending}</p>
                </div>
                <div className="rounded-full bg-amber-100 p-3">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-3xl mt-1">{stats.inProgress}</p>
                </div>
                <div className="rounded-full bg-blue-100 p-3">
                  <AlertCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Trucks</p>
                  <p className="text-3xl mt-1">
                    {stats.activeTrucks}/{stats.totalTrucks}
                  </p>
                </div>
                <div className="rounded-full bg-green-100 p-3">
                  <TruckIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* TABS */}
        <Tabs defaultValue="reports" className="space-y-4">
          <TabsList>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="trucks">Trucks</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* REPORTS TAB */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Manage Waste Reports</CardTitle>
                <CardDescription>Assign trucks and update report statuses</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Assigned</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {reports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>#{report.id}</TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              {report.location}
                            </div>
                          </TableCell>

                          <TableCell>{report.type}</TableCell>

                          <TableCell>
                            <Badge variant="secondary" className="flex gap-2 items-center">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(report.status)}`} />
                              {report.status}
                            </Badge>
                          </TableCell>

                          <TableCell className="text-sm text-muted-foreground">
                            {report.date}
                          </TableCell>

                          <TableCell>
                            {report.assignedTo ? (
                              <Badge variant="outline">{report.assignedTo}</Badge>
                            ) : (
                              <span className="text-sm text-muted-foreground">Unassigned</span>
                            )}
                          </TableCell>

                          <TableCell>
                            <div className="flex gap-2">
                              {/* ASSIGN TRUCK */}
                              <Select
                                value={report.assignedTo ?? ""}
                                onValueChange={(value) => handleAssignTruck(report.id, value)}
                              >
                                <SelectTrigger className="h-8 w-24">
                                  <SelectValue placeholder="Assign" />
                                </SelectTrigger>
                                <SelectContent>
                                  {trucks.map((truck) => (
                                    <SelectItem key={truck.id} value={truck.id}>
                                      {truck.id}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              {/* UPDATE STATUS */}
                              <Select
                                value={report.status}
                                onValueChange={(value) => handleUpdateStatus(report.id, value)}
                              >
                                <SelectTrigger className="h-8 w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Pending">Pending</SelectItem>
                                  <SelectItem value="In Progress">In Progress</SelectItem>
                                  <SelectItem value="Completed">Completed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TRUCKS TAB */}
          <TabsContent value="trucks">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trucks.map((truck) => (
                <Card key={truck.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <TruckIcon className="h-5 w-5" />
                        {truck.id}
                      </CardTitle>

                      <Badge
                        variant={
                          (truck.status === "Active" ? "default" : "secondary") as
                            "default" | "secondary"
                        }
                      >
                        {truck.status}
                      </Badge>
                    </div>

                    <CardDescription>Driver: {truck.driver}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Assigned Tasks</p>
                        <p className="text-2xl">{truck.assigned}</p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">Completed Today</p>
                        <p className="text-2xl">{truck.completed}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full" size="sm">
                        <MapPin className="mr-2 h-4 w-4" />
                        View Location
                      </Button>

                      <Button variant="outline" className="w-full" size="sm">
                        Update Route
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ANALYTICS TAB */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Efficiency Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Collection Efficiency</CardTitle>
                  <CardDescription>This week's performance overview</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Reports Completed</span>
                      <span>{stats.completed}/{stats.totalReports}</span>
                    </div>

                    <div className="w-full bg-secondary rounded-full h-3">
                      <div
                        className="bg-green-500 rounded-full h-3"
                        style={{
                          width: `${(stats.completed / stats.totalReports) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 text-center">
                    <div>
                      <p className="text-xl">{stats.pending}</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                    <div>
                      <p className="text-xl">{stats.inProgress}</p>
                      <p className="text-xs text-muted-foreground">In Progress</p>
                    </div>
                    <div>
                      <p className="text-xl">{stats.completed}</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Team Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Truck Performance</CardTitle>
                  <CardDescription>Average daily collections</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {trucks.map((truck) => (
                    <div key={truck.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{truck.id} – {truck.driver}</span>
                        <span>{truck.completed} collections</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2"
                          style={{ width: `${(truck.completed / 20) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Distribution */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Types of Waste Reports
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <p className="text-2xl mb-1">18</p>
                      <p className="text-sm text-muted-foreground">Full Bins</p>
                    </div>

                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <p className="text-2xl mb-1">12</p>
                      <p className="text-sm text-muted-foreground">Overflowing</p>
                    </div>

                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <p className="text-2xl mb-1">8</p>
                      <p className="text-sm text-muted-foreground">Missed</p>
                    </div>

                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <p className="text-2xl mb-1">5</p>
                      <p className="text-sm text-muted-foreground">Damaged</p>
                    </div>

                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <p className="text-2xl mb-1">2</p>
                      <p className="text-sm text-muted-foreground">Other</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Export alias for compatibility
export { EcoSyncAdminDashboard as AdminDashboard };
