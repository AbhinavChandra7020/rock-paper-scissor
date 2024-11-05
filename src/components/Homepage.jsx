import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import Button from "./Button";
import paper from '../assets/paper.png';
import rock from '../assets/rock.png';
import scissor from '../assets/scissor.png';

export default function Homepage() {
    const images = [paper, rock, scissor];
    const [image1, setImage1] = useState(images[0]);
    const [image2, setImage2] = useState(images[2]);

    useEffect(() => {
        const interval1 = setInterval(() => {
            const randImg = Math.floor(Math.random() * 3);
            setImage1(images[randImg]);
        }, 800);
    
        const interval2 = setInterval(() => {
            const randImg = Math.floor(Math.random() * 3);
            setImage2(images[randImg]);
        }, 800);
    
        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
        };
    }, [images]);

    return (
        <div className="min-h-screen bg-transparent flex flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-8 text-black">
                <div className="flex space-x-4 min-h-[8rem]">
                    <img
                        src={image1}
                        className="w-32 h-32 object-contain transition-transform duration-500 ease-in-out"
                    />
                    <img
                        src={image2}
                        className="w-32 h-32 object-contain transition-transform duration-500 ease-in-out scale-x-[-1]"
                    />
                </div>

                <Link to="/gamemode">
                    <Button>Start Game</Button>
                </Link>

                <div className="w-full max-w-md p-6 bg-green-100 rounded-lg shadow-lg space-y-4">
                    <h2 className="text-2xl font-semibold mb-2 text-green-800">How To Play</h2>
                    <ol className="list-decimal list-inside text-lg text-green-700 space-y-2">
                        <li>Click on Start Game.</li>
                        <li>Select your Gamemode.</li>
                        <li>Choose rock, paper, or scissors, and click on Submit.</li>
                        <li>Your choice will be against a CPU and points will be awarded accordingly.</li>
                        <li>The one with the highest points wins!</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}