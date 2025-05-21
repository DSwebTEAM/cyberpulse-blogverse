
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Loader2, Globe, FileSpreadsheet, Text, CheckCircle, Info } from "lucide-react";
import { toast } from "sonner";
import DotLottiePlayer from "./DotLottiePlayer";

interface AiToolsProps {
  content: string;
  title: string;
  onUpdateContent?: (newContent: string) => void;
  onUpdateTitle?: (newTitle: string) => void;
  hasOpenAiKey: boolean;
  onRequestApiKey: () => void;
}

export const AiTools = ({
  content,
  title,
  onUpdateContent,
  onUpdateTitle,
  hasOpenAiKey,
  onRequestApiKey,
}: AiToolsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTool, setLoadingTool] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState("hi");
  const [translatedContent, setTranslatedContent] = useState("");
  const [summaryLength, setSummaryLength] = useState("short");
  const [summarizedContent, setSummarizedContent] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);

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
        description: "Please add some content to translate."
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

  // Summarization using Hugging Face API
  const summarizeContent = async () => {
    if (!content.trim()) {
      toast("Cannot summarize empty content", {
        description: "Please add some content to summarize."
      });
      return;
    }

    if (!hasOpenAiKey) {
      onRequestApiKey();
      return;
    }

    setIsLoading(true);
    setLoadingTool("summarize");
    
    try {
      // We'll use OpenAI API since it's already set up in the app
      // In a real implementation, you would use Hugging Face API
      const prompt = `Summarize the following text in a ${summaryLength} summary (${
        summaryLength === "short" ? "1-2 sentences" : 
        summaryLength === "medium" ? "1 paragraph" : 
        "3-4 paragraphs"
      }):\n\n${content}`;

      // For now, we'll simulate the API call
      setTimeout(() => {
        // This is a placeholder - in real app, you'd make the actual API call
        const fakeSummary = `This is a ${summaryLength} summary of the content. ` + 
          (summaryLength === "short" ? "It captures the main idea." : 
          summaryLength === "medium" ? "It captures the main ideas and some supporting details in a concise paragraph. The text is simplified while maintaining key information." : 
          "This detailed summary provides comprehensive coverage of the content with multiple paragraphs. It includes main ideas, supporting details, and important nuances from the original text. This format preserves more context and information than shorter summaries.");
        
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

  // Replace content with translation
  const useTranslatedContent = () => {
    if (translatedContent && onUpdateContent) {
      onUpdateContent(translatedContent);
      toast("Content updated", {
        description: "The translated content has replaced the original text"
      });
      setTranslatedContent("");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">AI Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="translate" className="space-y-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="translate">
              <Globe className="h-4 w-4 mr-2" />
              Translate
            </TabsTrigger>
            <TabsTrigger value="summary">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Summarize
            </TabsTrigger>
            <TabsTrigger value="more">
              <Info className="h-4 w-4 mr-2" />
              More
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
                  <Globe className="mr-2 h-4 w-4" />
                  Translate Content
                </>
              )}
            </Button>

            {translatedContent && (
              <div className="space-y-4 mt-4 border-t pt-4">
                <Label>Translation Result:</Label>
                <Textarea 
                  value={translatedContent}
                  readOnly
                  className="min-h-[100px]"
                />
                <Button onClick={useTranslatedContent} variant="outline" className="w-full">
                  Use This Translation
                </Button>
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
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
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

          <TabsContent value="more" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" disabled={isLoading || !content.trim()} className="flex items-center gap-2">
                <Text className="h-4 w-4" />
                Explain This
              </Button>
              
              <Button variant="outline" disabled={isLoading || !content.trim()} className="flex items-center gap-2">
                <Text className="h-4 w-4" />
                Rephrase
              </Button>
              
              <Button variant="outline" disabled={isLoading || !content.trim()} className="flex items-center gap-2 col-span-1 md:col-span-2">
                <CheckCircle className="h-4 w-4" />
                Check Grammar & Spelling
              </Button>
            </div>
            
            <div className="border-t pt-4 text-sm text-muted-foreground">
              <p>More AI features coming soon:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Text Explanation</li>
                <li>Content Rephrasing</li>
                <li>Grammar & Spell Check</li>
              </ul>
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
