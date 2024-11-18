"use client";

import { IGame } from "@/types";
import { ArrowBigRightIcon } from "lucide-react";
import { useState } from "react";

interface GameCardProps {
    game: IGame;
    index: number;
    page: number;
}

const GameCard = ({ game, index, page}: GameCardProps) => {
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

    const handleMouseEnter = () => {
      const imageUrl = game.box_art_url.replace("{width}x{height}", "400x180");
      setBackgroundImage(imageUrl);
    };

    const handleMouseLeave = () => {
      setBackgroundImage(null);
    };

    return (
      <div
        key={index}
        className="bg-gray-800 rounded-lg h-full w-full relative"  
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="w-full h-full absolute inset-0" 
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : "",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "1s ease",
            opacity: 0.3,
          }}
        />
        <div className="w-full h-[150px] md:h-full p-4"> 
            <p className="text-xl font-bold text-gray-500">/{page + index + 1 < 10 ? `0${page + index + 1}` : page + index + 1}</p>
            <p className="text-white">{game.name}</p>
            <ArrowBigRightIcon className="h-4 w-4 text-white" />
        </div>
      </div>
    );
};

export default GameCard;

