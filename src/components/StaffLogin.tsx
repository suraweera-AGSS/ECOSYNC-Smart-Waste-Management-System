import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import logoImage from "../Logo.png";

interface StaffLoginProps {
  onLogin: (email: string) => void;
  onBackToHome: () => void;
}

export function StaffLogin({ onLogin, onBackToHome }: StaffLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    }
  };

  const handleQuickDemo = () => {
    onLogin("staff@demo.com");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1637681262973-a516e647e826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXN0ZSUyMG1hbmFnZW1lbnQlMjByZWN5Y2xpbmd8ZW58MXx8fHwxNzYzNDY3MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <Button
          variant="ghost"
          onClick={onBackToHome}
          className="mb-4 text-white hover:text-white hover:bg-white/20"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-2xl border-2 border-primary/20">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <img src={logoImage} alt="EcoSync Logo" className="h-16 w-16" />
            </div>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <ShieldCheck className="h-12 w-12 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl">Staff Login</CardTitle>
            <CardDescription className="text-base pt-2">
              Authorized Personnel Only
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-amber-50 border-amber-200">
              <AlertDescription className="text-amber-900 text-sm">
                Only registered EcoSync staff members are allowed to access this section.
              </AlertDescription>
            </Alert>

            <Alert className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-900 text-sm">
                <span className="block">Unauthorized access is not permitted.</span>
                <span className="block">Please use your assigned staff credentials.</span>
              </AlertDescription>
            </Alert>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-900 mb-2">
                <span className="block">Quick Demo Login:</span>
                <span className="block mt-1 text-xs">
                  Email: <strong>staff@demo.com</strong> | Password: <strong>admin123</strong>
                </span>
              </p>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="w-full bg-green-100 border-green-300 hover:bg-green-200"
                onClick={handleQuickDemo}
              >
                Quick Demo Login
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="staff-email">Staff Email</Label>
                <Input
                  id="staff-email"
                  type="email"
                  placeholder="Staff Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="staff-password">Staff Password</Label>
                <Input
                  id="staff-password"
                  type="password"
                  placeholder="Staff Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <Button type="submit" className="w-full h-11">
                Sign In as Staff
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground pt-2">
              If you are not staff, please return to the Resident login.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
