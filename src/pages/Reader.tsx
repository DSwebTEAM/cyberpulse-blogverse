
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AiReader from "@/components/AiReader";
import { featuredPosts } from "@/data/mockData";

const Reader = () => {
  // For demo purposes, we'll use the first featured post
  const post = featuredPosts[0];
  
  const fullContent = `
    ${post.excerpt}
    
    In the rapidly evolving landscape of technology, artificial intelligence continues to reshape how we interact with digital systems. This post explores the implications of these advancements and how they're changing our daily lives.
    
    Machine learning algorithms have become increasingly sophisticated, enabling systems to recognize patterns, make predictions, and even generate creative content. From recommendation engines that suggest what we might want to watch or buy, to voice assistants that can understand and respond to our questions, AI is becoming an integral part of our digital experience.
    
    These developments raise important questions about privacy, ethics, and the future of work. As machines become capable of performing tasks that once required human intelligence, we must consider how this will impact employment across various sectors. Furthermore, the collection and use of data to train these systems presents challenges regarding consent and surveillance.
    
    Despite these concerns, the potential benefits of AI are substantial. In healthcare, AI can help diagnose diseases earlier and develop personalized treatment plans. In environmental science, it can model complex systems to better predict climate change. And in education, it can adapt learning experiences to individual students' needs and abilities.
    
    As we navigate this technological transformation, it's essential that we engage in thoughtful discussions about how to harness the power of AI while mitigating its risks. By doing so, we can work toward a future where technology enhances human potential rather than diminishing it.
  `;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl">{post.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>By {post.author}</span>
                <span className="mx-2">•</span>
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.category}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-auto rounded-lg object-cover max-h-[400px]"
                />
              </div>
              
              <div className="prose dark:prose-invert max-w-none space-y-4">
                {fullContent.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="leading-7">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8">
            <AiReader content={fullContent} title={post.title} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reader;
