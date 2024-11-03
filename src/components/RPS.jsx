import { useEffect, useState } from 'react';
import paper from '../assets/paper.png';
import rock from '../assets/rock.png';
import scissor from '../assets/scissor.png';
import PopupModal from './PopupModal';

export default function RPS() {
    const [userChoice, setUserChoice] = useState("");
    const [gameState, setGameState] = useState(null);
    const [modalState, setModalState] = useState(false);
    const images = [paper, rock, scissor];
    const [image1, setImage1] = useState(images[0]);
    const [image2, setImage2] = useState(images[2]);
    const [points, setPoints] = useState(0);
    let message = '';

    async function gameCode(userChoice) {
        const cpuChoice = Math.floor(Math.random() * 3);
        const choices = {
            rock: 0,
            paper: 1,
            scissor: 2,
        };

        if (userChoice === "") {
            setGameState(-1);
            return;
        }

        const userVal = choices[userChoice.trim().toLowerCase()] ?? -1;

        if (userVal === cpuChoice) 
            setGameState(2);

        if(userVal === 0){
            if(cpuChoice === 1)
                setGameState(0);

            if(cpuChoice === 2){
                setGameState(1);
                setPoints((prevPoints) => prevPoints + 1);
            }
        }

        if(userVal === 1){
            if(cpuChoice === 0){
                setGameState(1);
                setPoints((prevPoints) => prevPoints + 1);
            }

            if(cpuChoice === 2)
                setGameState(0);
        }

        if(userVal === 2){
            if(cpuChoice === 0)
                setGameState(0);

            if(cpuChoice === 1){
                setGameState(1)
                setPoints((prevPoints) => prevPoints + 1);
            }
        }
        
        console.log(userVal, cpuChoice, gameState, points);
        setUserChoice("");
    }

    if(gameState === -1)
        message = "Enter a valid choice: rock, paper, or scissor"

    if (gameState === 1) 
        message = "You win!";

    if (gameState === 0) 
        message = "You lose.";

    if (gameState === 2) 
        message = "It's a tie.";

    useEffect(() => {
        if (gameState === 1 || gameState === 0 || gameState === 2 || gameState === -1) {
            setTimeout(setModalState(true), 500);
        }
    }, [gameState]);

    useEffect(() => {
        const interval1 = setInterval(() => {
            const randImg = Math.floor(Math.random() * 3);
            setImage1(images[randImg]);
        }, 1200);
    
        const interval2 = setInterval(() => {
            const randImg = Math.floor(Math.random() * 3);
            setImage2(images[randImg]);
        }, 1200);
    
        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
        };
    }, [images]);
    
    const handleCloseModal = () => {
        setModalState(false);
        setGameState(null);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="font-mono text-8xl bg-transparent items-center flex justify-center mt-3">
                Rock Paper Scissors
            </div>
            <div className="flex-grow flex flex-col justify-center items-center space-y-8 text-black">
                <div className="flex space-x-4">
                    <img
                        src={image1}
                        className="w-32 h-auto transition-transform duration-500 ease-in-out transform animation-shake"/>
                    <img
                        src={image2}
                        className="w-32 h-auto transition-transform duration-500 ease-in-out transform scale-x-[-1] animation-bounce"/>
                </div>

                <input
                    type="text"
                    id="user_choice"
                    className="w-3/4 md:w-1/2 lg:w-1/3 p-3 bg-white bg-opacity-90 border border-gray-400 text-green-900 text-lg rounded-xl shadow-md focus:ring-4 focus:ring-green-400 focus:border-green-500 placeholder-gray-600 transition duration-300"
                    placeholder="Enter your choice"
                    value={userChoice}
                    onChange={(e) => setUserChoice(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            gameCode(userChoice);
                        }
                    }}/>

                <button
                    className="mt-4 px-6 py-2 bg-green-500 text-white text-lg rounded-xl shadow-md hover:bg-green-600 active:bg-green-700 transition duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                    onClick={() => {
                        setTimeout(() => gameCode(userChoice), 300)
                    }}>
                    Submit
                </button>
                <div 
                    className="text-2xl font-bold text-white bg-green-500 px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105">
                    Your Points: <span className="text-white">{points}</span>
                </div>
            </div>
            {modalState && (
                <PopupModal
                    title="Game Result"
                    message={message}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}