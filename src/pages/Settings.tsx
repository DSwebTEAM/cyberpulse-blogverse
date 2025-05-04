
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useApiKeys } from "@/hooks/useApiKeys";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Settings = () => {
  const { hasOpenAiKey, setOpenAiKey, getOpenAiKey, clearKeys } = useApiKeys();
  const [apiKey, setApiKey] = useState(getOpenAiKey() || "");
  const [displayName, setDisplayName] = useState("User");
  const [bio, setBio] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      setOpenAiKey(apiKey.trim());
      toast.success("API key saved successfully");
    } else {
      toast.error("Please enter a valid API key");
    }
  };
  
  const handleClearApiKey = () => {
    clearKeys();
    setApiKey("");
    toast.success("API keys cleared successfully");
  };
  
  const handleSaveProfile = () => {
    // In a real app, this would save to a database
    toast.success("Profile settings saved successfully");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center glow-text">Settings</h1>
          
          <div className="grid gap-8">
            {/* Profile Settings */}
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input 
                    id="displayName" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="bg-muted/50 border border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell others about yourself..."
                    className="bg-muted/50 border border-white/10 min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="cyber-button" onClick={handleSaveProfile}>
                  Save Profile
                </Button>
              </CardFooter>
            </Card>
            
            {/* API Keys */}
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription>Manage your API keys for enhanced features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="openai-key">OpenAI API Key</Label>
                  <Input 
                    id="openai-key" 
                    type="password" 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)} 
                    placeholder="sk-..." 
                    className="bg-muted/50 border border-white/10"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Your API key is stored locally and never sent to our servers.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleClearApiKey}>
                  Clear API Keys
                </Button>
                <Button className="cyber-button" onClick={handleSaveApiKey}>
                  Save API Key
                </Button>
              </CardFooter>
            </Card>
            
            {/* Notification Settings */}
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about new posts and replies
                    </p>
                  </div>
                  <Switch 
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="cyber-button">
                  Save Notification Settings
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
