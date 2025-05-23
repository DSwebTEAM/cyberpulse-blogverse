
import React, { useEffect, useRef } from 'react';

interface DotLottiePlayerProps {
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  style?: React.CSSProperties;
  className?: string;
  background?: string;
  speed?: number;
}

// Define the dotlottie-player element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-player': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          background?: string;
          speed?: string;
          loop?: boolean | '';
          autoplay?: boolean | '';
          controls?: boolean | '';
        },
        HTMLElement
      >;
    }
  }
}

const DotLottiePlayer: React.FC<DotLottiePlayerProps> = ({
  src,
  autoplay = true,
  loop = true,
  style = { width: '300px', height: '300px' },
  className = '',
  background = 'transparent',
  speed = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the dotlottie player script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs';
    script.type = 'module';
    document.body.appendChild(script);

    // Clean up
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the player element
    const player = document.createElement('dotlottie-player');
    player.setAttribute('src', src);
    player.setAttribute('background', background);
    player.setAttribute('speed', speed.toString());
    
    if (autoplay) player.setAttribute('autoplay', '');
    if (loop) player.setAttribute('loop', '');
    
    // Apply styles
    Object.assign(player.style, style);
    
    // Add class if provided
    if (className) player.className = className;
    
    // Append to container
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(player);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [src, autoplay, loop, style, className, background, speed]);

  return <div ref={containerRef}></div>;
};

export default DotLottiePlayer;
