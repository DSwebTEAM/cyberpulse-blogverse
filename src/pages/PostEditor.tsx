
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Image } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApiKeys } from "@/hooks/useApiKeys";
import { Input } from "@/components/ui/input";

const PostEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [showApiInput, setShowApiInput] = useState(false);
  const [tempApiKey, setTempApiKey] = useState("");
  const { toast } = useToast();
  const { hasOpenAiKey, getOpenAiKey, setOpenAiKey } = useApiKeys();

  const saveApiKey = () => {
    if (tempApiKey.trim()) {
      setOpenAiKey(tempApiKey.trim());
      setShowApiInput(false);
      setTempApiKey("");
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved securely.",
      });
    }
  };

  const enhanceText = async () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please add some content to enhance",
        variant: "destructive",
      });
      return;
    }

    if (!hasOpenAiKey()) {
      setShowApiInput(true);
      return;
    }

    setIsEnhancing(true);
    
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getOpenAiKey()}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a professional blog post editor. Enhance the text to make it more professional, fix grammar and improve the structure. Keep the same ideas and information but make it more engaging."
            },
            {
              role: "user",
              content: content
            }
          ],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0]?.message?.content) {
        setContent(data.choices[0].message.content.trim());
        toast({
          title: "Success",
          description: "Your content has been enhanced!",
        });
      } else {
        console.error("API response:", data);
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Error enhancing text:", error);
      toast({
        title: "Enhancement failed",
        description: "There was an issue enhancing your text. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSave = () => {
    // Placeholder for saving functionality 
    toast({
      title: "Post saved",
      description: "Your post has been saved as a draft.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center glow-text">Create New Post</h1>
          
          {showApiInput ? (
            <Card className="cyber-card mb-6">
              <CardHeader>
                <CardTitle>Enter OpenAI API Key</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  To use the AI enhancement feature, please enter your OpenAI API key. 
                  This will be stored locally on your device.
                </p>
                <Input
                  type="password"
                  placeholder="sk-..."
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  className="mb-4"
                />
              </CardContent>
              <CardFooter className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowApiInput(false)}>
                  Cancel
                </Button>
                <Button className="cyber-button" onClick={saveApiKey}>
                  Save Key
                </Button>
              </CardFooter>
            </Card>
          ) : null}
          
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle>
                <input
                  type="text"
                  placeholder="Enter post title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-transparent border-b border-cyber-border/50 p-2 text-2xl font-bold focus:outline-none focus:border-cyber-primary"
                />
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <Textarea
                placeholder="Write your post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px] text-lg bg-muted/50 border border-white/10"
              />
            </CardContent>
            
            <CardFooter className="flex flex-wrap gap-3 sm:flex-nowrap sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={enhanceText}
                  disabled={isEnhancing || !content.trim()}
                >
                  <Wand2 className="h-4 w-4" />
                  {isEnhancing ? "Enhancing..." : "Enhance with AI"}
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Add Image
                </Button>
              </div>
              
              <Button 
                className="cyber-button w-full sm:w-auto"
                onClick={handleSave}
                disabled={!title.trim() || !content.trim()}
              >
                Save Draft
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostEditor;
