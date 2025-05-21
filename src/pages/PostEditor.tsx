
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Image, CheckCircle, Check, FileSpreadsheet, Sparkles, Loader2 } from "lucide-react";
import { toast as sonnerToast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApiKeys } from "@/hooks/useApiKeys";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const PostEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("tutorials");
  const [seoDescription, setSeoDescription] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceType, setEnhanceType] = useState("");
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

  const enhanceText = async (enhanceType = "enhance") => {
    if (!content.trim() && enhanceType !== "generate-title") {
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
    setEnhanceType(enhanceType);
    
    let prompt = "";
    let inputContent = content;
    
    // Define prompts for different enhancement types
    switch (enhanceType) {
      case "enhance":
        prompt = "You are a professional blog post editor. Enhance the text to make it more professional, fix grammar and improve the structure. Keep the same ideas and information but make it more engaging.";
        break;
      case "grammar":
        prompt = "Fix the grammar, spelling, and punctuation in this text without changing the meaning or tone:";
        break;
      case "summarize":
        prompt = "Create a concise summary of the following text that captures the main points in 2-3 sentences:";
        break;
      case "generate-title":
        prompt = `Generate 3 catchy, SEO-friendly title suggestions for a blog post about ${tags || "technology"}${content ? " with the following content: " + content.substring(0, 200) + "..." : ""}`;
        inputContent = content || "Tech blog post";
        break;
      case "seo":
        prompt = `Generate a SEO-friendly meta description (under 160 characters) for a blog post with this title: "${title || "Blog post"}" and this content: "${content.substring(0, 300)}..."`;
        break;
      default:
        prompt = "Enhance this text and make it more professional:";
    }
    
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
              content: prompt
            },
            {
              role: "user",
              content: inputContent
            }
          ],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0]?.message?.content) {
        const enhancedContent = data.choices[0].message.content.trim();
        
        // Update different fields based on the enhancement type
        switch (enhanceType) {
          case "generate-title":
            setTitle(enhancedContent.split("\n")[0].replace(/^\d+\.\s+|"/g, ''));
            break;
          case "summarize":
            sonnerToast("Summary generated", {
              description: enhancedContent,
              duration: 10000,
            });
            break;
          case "seo":
            setSeoDescription(enhancedContent);
            break;
          default:
            setContent(enhancedContent);
        }
        
        sonnerToast(`${enhanceType === "grammar" ? "Grammar fixed" : enhanceType === "generate-title" ? "Titles generated" : enhanceType === "summarize" ? "Summary created" : enhanceType === "seo" ? "SEO description created" : "Content enhanced"}!`);
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Error enhancing text:", error);
      sonnerToast("Enhancement failed", {
        description: "There was an issue enhancing your text. Please try again later.",
      });
    } finally {
      setIsEnhancing(false);
      setEnhanceType("");
    }
  };

  const handleSave = () => {
    // Placeholder for saving functionality 
    sonnerToast("Post saved", {
      description: "Your post has been saved as a draft.",
    });
  };

  const handlePublish = () => {
    if (!title.trim()) {
      sonnerToast("Title required", {
        description: "Please add a title to your post.",
      });
      return;
    }
    
    if (!content.trim()) {
      sonnerToast("Content required", {
        description: "Please add content to your post.",
      });
      return;
    }
    
    // Placeholder for publishing functionality
    sonnerToast("Post published", {
      description: "Your post has been published successfully.",
    });
  };

  const categories = [
    { value: "system-updates", label: "System Updates" },
    { value: "tech-facts", label: "Tech Facts" },
    { value: "tutorials", label: "Tutorials" },
    { value: "news", label: "News" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
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
          
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:max-w-md mx-auto">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-6">
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle>
                    <Input
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
                
                <CardFooter className="flex flex-wrap gap-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        disabled={isEnhancing}
                      >
                        <Wand2 className="h-4 w-4" />
                        AI Enhance
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">AI Enhancement Options</h4>
                        <div className="space-y-2">
                          <Button 
                            variant="outline" 
                            className="w-full justify-start" 
                            onClick={() => enhanceText("enhance")}
                            disabled={isEnhancing || !content.trim()}
                          >
                            {isEnhancing && enhanceType === "enhance" ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Sparkles className="h-4 w-4 mr-2" />
                            )}
                            Make Professional
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="w-full justify-start" 
                            onClick={() => enhanceText("grammar")}
                            disabled={isEnhancing || !content.trim()}
                          >
                            {isEnhancing && enhanceType === "grammar" ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <CheckCircle className="h-4 w-4 mr-2" />
                            )}
                            Fix Grammar
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="w-full justify-start" 
                            onClick={() => enhanceText("summarize")}
                            disabled={isEnhancing || !content.trim()}
                          >
                            {isEnhancing && enhanceType === "summarize" ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <FileSpreadsheet className="h-4 w-4 mr-2" />
                            )}
                            Summarize
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="w-full justify-start" 
                            onClick={() => enhanceText("generate-title")}
                            disabled={isEnhancing}
                          >
                            {isEnhancing && enhanceType === "generate-title" ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Wand2 className="h-4 w-4 mr-2" />
                            )}
                            Generate Title
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="w-full justify-start" 
                            onClick={() => enhanceText("seo")}
                            disabled={isEnhancing || !content.trim()}
                          >
                            {isEnhancing && enhanceType === "seo" ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Check className="h-4 w-4 mr-2" />
                            )}
                            Generate SEO Description
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Button variant="outline" className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Add Image
                  </Button>
                  
                  <div className="ml-auto flex gap-3">
                    <Button 
                      variant="outline"
                      onClick={handleSave}
                    >
                      Save Draft
                    </Button>
                    
                    <Button 
                      className="cyber-button"
                      onClick={handlePublish}
                    >
                      Publish
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle>Post Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select 
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-muted/50 border border-white/10 rounded-md p-2"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input 
                      id="tags"
                      placeholder="tech, software, tutorial"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="bg-muted/50 border border-white/10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="seo-description">SEO Description</Label>
                    <Textarea 
                      id="seo-description"
                      placeholder="Enter SEO description for your post (or use AI to generate one)"
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      className="bg-muted/50 border border-white/10"
                    />
                    <p className="text-xs text-muted-foreground">
                      {seoDescription.length}/160 characters (recommended)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostEditor;
