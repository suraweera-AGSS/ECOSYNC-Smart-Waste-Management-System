import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { User } from "lucide-react";
import logoImage from "../Logo.png";

interface ResidentLoginProps {
  onLogin: (email: string) => void;
  onSwitchToStaff: () => void;
}

export function ResidentLogin({ onLogin, onSwitchToStaff }: ResidentLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    }
  };

  const handleQuickDemo = () => {
    onLogin("resident@demo.com");
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
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-green-800/70 to-emerald-900/80 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-2xl mb-4">
            <img src={logoImage} alt="EcoSync Logo" className="h-16 w-16" />
          </div>
          <h1 className="text-5xl text-white mb-2">EcoSync</h1>
          <p className="text-green-100">Smart Waste Management System</p>
        </div>

        <Card className="shadow-2xl border-2 border-primary/20">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-3">
              <div className="rounded-full bg-primary/10 p-2">
                <User className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Resident Login</CardTitle>
            <CardDescription>
              Welcome back! Sign in to report issues and track collections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-900 mb-2">
                <span className="block">Quick Demo Login:</span>
                <span className="block mt-1 text-xs">
                  Email: <strong>resident@demo.com</strong> | Password: <strong>demo123</strong>
                </span>
              </p>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="w-full bg-blue-100 border-blue-300 hover:bg-blue-200"
                onClick={handleQuickDemo}
              >
                Quick Demo Login
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <Button type="submit" className="w-full h-11">
                Sign In
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={onSwitchToStaff}
            >
              Staff Login
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button className="text-primary hover:underline">
                Sign up
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
