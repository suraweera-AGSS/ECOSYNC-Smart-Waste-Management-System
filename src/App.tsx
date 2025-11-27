import { useState } from "react";
import { ResidentLogin } from "./components/ResidentLogin";
import { StaffLogin } from "./components/StaffLogin";
import { ResidentDashboard } from "./components/ResidentDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { ReportIssue } from "./components/ReportIssue";
import { TrackingMap } from "./components/TrackingMap";
import { CollectionSchedule } from "./components/CollectionSchedule";

type UserRole = "resident" | "staff" | null;
type View = "login" | "resident-login" | "staff-login" | "resident-dashboard" | "admin-dashboard" | "report" | "tracking" | "schedule";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("resident-login");
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userEmail, setUserEmail] = useState("");

  const handleResidentLogin = (email: string) => {
    setUserEmail(email);
    setUserRole("resident");
    setCurrentView("resident-dashboard");
  };

  const handleStaffLogin = (email: string) => {
    setUserEmail(email);
    setUserRole("staff");
    setCurrentView("admin-dashboard");
  };

  const handleLogout = () => {
    setUserEmail("");
    setUserRole(null);
    setCurrentView("resident-login");
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view as View);
  };

  const renderView = () => {
    switch (currentView) {
      case "resident-login":
        return (
          <ResidentLogin
            onLogin={handleResidentLogin}
            onSwitchToStaff={() => setCurrentView("staff-login")}
          />
        );
      case "staff-login":
        return (
          <StaffLogin
            onLogin={handleStaffLogin}
            onBackToHome={() => setCurrentView("resident-login")}
          />
        );
      case "resident-dashboard":
        return (
          <ResidentDashboard
            userEmail={userEmail}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        );
      case "admin-dashboard":
        return (
          <AdminDashboard
            userEmail={userEmail}
            onLogout={handleLogout}
          />
        );
      case "report":
        return (
          <ReportIssue
            onBack={() => setCurrentView("resident-dashboard")}
          />
        );
      case "tracking":
        return (
          <TrackingMap
            onBack={() => setCurrentView("resident-dashboard")}
          />
        );
      case "schedule":
        return (
          <CollectionSchedule
            onBack={() => setCurrentView("resident-dashboard")}
          />
        );
      default:
        return (
          <ResidentLogin
            onLogin={handleResidentLogin}
            onSwitchToStaff={() => setCurrentView("staff-login")}
          />
        );
    }
  };

  return <div className="min-h-screen">{renderView()}</div>;
}
