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
        <div className="min-h-screen bg-transparent flex flex-col items-center">
            <div className="flex justify-center items-center min-h-[80vh]">
                <div className="flex-grow flex flex-col justify-center items-center space-y-8 text-black">

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
                </div>
            </div>
        </div>
    );
}
