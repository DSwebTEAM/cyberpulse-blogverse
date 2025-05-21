
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Loader2, FileText, Volume2, Translate, BookText, PlayCircle, PauseCircle, StopCircle } from "lucide-react";
import { toast } from "sonner";
import DotLottiePlayer from "./DotLottiePlayer";

interface AiReaderProps {
  content: string;
  title?: string;
}

export const AiReader = ({ content, title }: AiReaderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTool, setLoadingTool] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState("hi");
  const [translatedContent, setTranslatedContent] = useState("");
  const [summarizedContent, setSummarizedContent] = useState("");
  const [summaryLength, setSummaryLength] = useState("short");
  const [explainedContent, setExplainedContent] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Available languages for translation
  const languages = [
    { value: "hi", label: "Hindi" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "zh", label: "Chinese" },
    { value: "ja", label: "Japanese" },
    { value: "ru", label: "Russian" },
    { value: "ar", label: "Arabic" },
  ];
  
  // Translation using LibreTranslate API
  const translateContent = async () => {
    if (!content.trim()) {
      toast("Cannot translate empty content", {
        description: "There is no content to translate."
      });
      return;
    }

    setIsLoading(true);
    setLoadingTool("translate");
    
    try {
      const response = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: content,
          source: "en",
          target: selectedLanguage,
          format: "text",
          api_key: "" // Use your API key if you have one, or keep empty for public API
        }),
      });

      const data = await response.json();
      
      if (data.translatedText) {
        setTranslatedContent(data.translatedText);
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 3000);
        toast("Translation completed", {
          description: `Content translated to ${languages.find(l => l.value === selectedLanguage)?.label || selectedLanguage}`
        });
      } else {
        throw new Error(data.error || "Translation failed");
      }
    } catch (error) {
      console.error("Translation error:", error);
      toast("Translation failed", {
        description: "There was an issue with the translation service. Please try again later."
      });
    } finally {
      setIsLoading(false);
      setLoadingTool("");
    }
  };

  // Summarization using AI service
  const summarizeContent = async () => {
    if (!content.trim()) {
      toast("Cannot summarize empty content", {
        description: "There is no content to summarize."
      });
      return;
    }

    setIsLoading(true);
    setLoadingTool("summarize");
    
    try {
      // This is a placeholder for the real API call - you'd replace this with your actual Hugging Face API call
      setTimeout(() => {
        // Simulate different summary lengths
        const fakeSummary = summaryLength === "short" 
          ? "This is a short summary of the article highlighting only the key points."
          : summaryLength === "medium" 
            ? "This is a medium-length summary that covers the main points with some detail. It explains the content concisely while keeping important information."
            : "This is a detailed summary that provides comprehensive coverage with multiple paragraphs. It includes main ideas, supporting details, and context to give a thorough understanding of the original content. The summary preserves nuance and explains relationships between concepts.";
        
        setSummarizedContent(fakeSummary);
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 3000);
        toast("Summary created", {
          description: `${summaryLength.charAt(0).toUpperCase() + summaryLength.slice(1)} summary has been generated`
        });
        setIsLoading(false);
        setLoadingTool("");
      }, 1500);
    } catch (error) {
      console.error("Summarization error:", error);
      toast("Summarization failed", {
        description: "There was an issue generating the summary. Please try again later."
      });
      setIsLoading(false);
      setLoadingTool("");
    }
  };
  
  // Explanation using AI service
  const explainContent = async () => {
    if (!content.trim()) {
      toast("Cannot explain empty content", {
        description: "There is no content to explain."
      });
      return;
    }

    setIsLoading(true);
    setLoadingTool("explain");
    
    try {
      // This is a placeholder for the real API call - you'd replace this with your actual API call
      setTimeout(() => {
        setExplainedContent(
          "This explanation breaks down the content in simple terms:\n\n" +
          "1. Key Concepts: The text discusses important technological concepts and their applications.\n\n" +
          "2. Main Arguments: It presents several viewpoints on how these technologies can be used.\n\n" +
          "3. Technical Terms: Any specialized terminology has been simplified here for better understanding.\n\n" +
          "4. Practical Applications: The content refers to real-world uses of the discussed technology."
        );
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 3000);
        toast("Explanation created", {
          description: "Content has been explained in simpler terms"
        });
        setIsLoading(false);
        setLoadingTool("");
      }, 1500);
    } catch (error) {
      console.error("Explanation error:", error);
      toast("Explanation failed", {
        description: "There was an issue generating the explanation. Please try again later."
      });
      setIsLoading(false);
      setLoadingTool("");
    }
  };

  // Text-to-speech functionality
  const readAloud = () => {
    if (!content.trim()) {
      toast("Cannot read empty content", {
        description: "There is no content to read."
      });
      return;
    }

    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(content);
    
    // Set speech properties
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    
    utterance.onstart = () => {
      setIsPlaying(true);
      toast("Reading content", {
        description: "Text-to-speech started"
      });
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      toast("Reading completed", {
        description: "Text-to-speech finished"
      });
    };
    
    utterance.onerror = () => {
      setIsPlaying(false);
      toast("Reading failed", {
        description: "There was an issue with text-to-speech. Please try again."
      });
    };
    
    // If there is an ongoing speech, cancel it first
    window.speechSynthesis.cancel();
    
    // Start the new speech
    window.speechSynthesis.speak(utterance);
  };

  // Stop text-to-speech
  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    toast("Reading stopped", {
      description: "Text-to-speech has been stopped"
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">AI Reader Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="translate" className="space-y-4">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="translate">
              <Translate className="h-4 w-4 mr-2" />
              Translate
            </TabsTrigger>
            <TabsTrigger value="summary">
              <FileText className="h-4 w-4 mr-2" />
              Summarize
            </TabsTrigger>
            <TabsTrigger value="explain">
              <BookText className="h-4 w-4 mr-2" />
              Explain
            </TabsTrigger>
            <TabsTrigger value="read">
              <Volume2 className="h-4 w-4 mr-2" />
              Read Aloud
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="translate" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Translate to:</Label>
              <Select 
                value={selectedLanguage} 
                onValueChange={setSelectedLanguage}
                disabled={isLoading}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={translateContent} 
              disabled={isLoading || !content.trim()}
              className="w-full"
            >
              {isLoading && loadingTool === "translate" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  <Translate className="mr-2 h-4 w-4" />
                  Translate Content
                </>
              )}
            </Button>

            {translatedContent && (
              <div className="space-y-2 mt-4 border-t pt-4">
                <Label>Translation Result:</Label>
                <div className="bg-muted/50 p-4 rounded-md border text-sm">
                  {translatedContent}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="summary" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="summary-length">Summary Length:</Label>
              <Select 
                value={summaryLength} 
                onValueChange={setSummaryLength}
                disabled={isLoading}
              >
                <SelectTrigger id="summary-length">
                  <SelectValue placeholder="Select summary length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (1-2 sentences)</SelectItem>
                  <SelectItem value="medium">Medium (1 paragraph)</SelectItem>
                  <SelectItem value="detailed">Detailed (3-4 paragraphs)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={summarizeContent} 
              disabled={isLoading || !content.trim()}
              className="w-full"
            >
              {isLoading && loadingTool === "summarize" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Summarizing...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Summary
                </>
              )}
            </Button>

            {summarizedContent && (
              <div className="space-y-2 mt-4 border-t pt-4">
                <Label>Summary Result:</Label>
                <div className="bg-muted/50 p-4 rounded-md border text-sm">
                  {summarizedContent}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="explain" className="space-y-4">
            <Button 
              onClick={explainContent} 
              disabled={isLoading || !content.trim()}
              className="w-full"
            >
              {isLoading && loadingTool === "explain" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Explaining...
                </>
              ) : (
                <>
                  <BookText className="mr-2 h-4 w-4" />
                  Explain Content
                </>
              )}
            </Button>

            {explainedContent && (
              <div className="space-y-2 mt-4 border-t pt-4">
                <Label>Explanation Result:</Label>
                <div className="bg-muted/50 p-4 rounded-md border text-sm">
                  {explainedContent}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="read" className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-2">
                <Button 
                  onClick={readAloud} 
                  disabled={!content.trim()}
                  className="flex-1"
                  variant={isPlaying ? "outline" : "default"}
                >
                  {isPlaying ? (
                    <>
                      <PauseCircle className="mr-2 h-4 w-4" />
                      Pause Reading
                    </>
                  ) : (
                    <>
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Read Aloud
                    </>
                  )}
                </Button>
                
                {isPlaying && (
                  <Button 
                    onClick={stopReading}
                    variant="destructive"
                    className="w-24"
                  >
                    <StopCircle className="mr-2 h-4 w-4" />
                    Stop
                  </Button>
                )}
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>The text will be read aloud using your browser's text-to-speech capabilities.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {isLoading && (
          <div className="mt-4">
            <Label className="text-xs text-muted-foreground mb-1 block">Processing...</Label>
            <Progress value={65} className="h-1" />
          </div>
        )}
        
        {showAnimation && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="w-[300px] h-[300px]">
              <DotLottiePlayer
                src="https://lottie.host/d295e2f3-73f4-4fd8-aa9f-b984d6953fbe/xlw38xhvYC.lottie"
                background="transparent"
                speed={1}
                style={{width: '300px', height: '300px'}}
                autoplay
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AiReader;
