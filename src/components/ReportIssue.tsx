import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft, Camera, MapPin, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface ReportIssueProps {
  onBack: () => void;
}

export function ReportIssue({ onBack }: ReportIssueProps) {
  const [submitted, setSubmitted] = useState(false);
  const [reportData, setReportData] = useState({
    location: "",
    type: "",
    description: "",
    photo: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setReportData({ location: "", type: "", description: "", photo: null });
    }, 3000);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReportData({ ...reportData, photo: e.target.files[0] });
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

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {submitted ? (
          <Card className="shadow-lg">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 p-4">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl mb-2">Report Submitted Successfully!</h2>
              <p className="text-muted-foreground mb-6">
                Your report has been received and will be processed shortly.
              </p>
              <p className="text-sm text-muted-foreground">
                Report ID: #{Math.floor(Math.random() * 9000) + 1000}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Report Waste Issue</CardTitle>
              <CardDescription>
                Help us maintain a clean community by reporting full bins or waste issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6 bg-blue-50 border-blue-200">
                <AlertDescription className="text-blue-900">
                  Your report will be immediately sent to our waste management team for action
                </AlertDescription>
              </Alert>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Enter street address or landmark"
                      value={reportData.location}
                      onChange={(e) => setReportData({ ...reportData, location: e.target.value })}
                      required
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You can also use your current location
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Issue Type *</Label>
                  <Select
                    value={reportData.type}
                    onValueChange={(value) => setReportData({ ...reportData, type: value })}
                    required
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-bin">Full Garbage Bin</SelectItem>
                      <SelectItem value="overflowing">Overflowing Waste</SelectItem>
                      <SelectItem value="missed-collection">Missed Collection</SelectItem>
                      <SelectItem value="illegal-dumping">Illegal Dumping</SelectItem>
                      <SelectItem value="damaged-bin">Damaged Bin</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide details about the issue..."
                    value={reportData.description}
                    onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
                    required
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Photo (Optional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <label htmlFor="photo" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <Camera className="h-10 w-10 text-muted-foreground" />
                        <p className="text-sm">
                          {reportData.photo ? reportData.photo.name : "Click to upload a photo"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Button type="submit" className="w-full h-11">
                    Submit Report
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Submitted on {new Date().toLocaleString()}
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
