import { useState, useEffect } from "react";

interface FlipWordsProps {
  words: string[];
  interval?: number;
  className?: string;
}

const FlipWords = ({ words, interval = 2500, className = "" }: FlipWordsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsFlipping(false);
      }, 400);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={`inline-block flip-word-container ${className}`}>
      <span className={`flip-word ${isFlipping ? "flip-out" : "flip-in"}`}>
        {words[currentIndex]}
      </span>
    </span>
  );
};

export default FlipWords;
