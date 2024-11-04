import { useState } from 'react';
import paper from '../assets/paper.png';
import rock from '../assets/rock.png';
import scissor from '../assets/scissor.png';
import PopupModal from './PopupModal';
import Button from './Button';

export default function RPS() {
    const [userChoice, setUserChoice] = useState("");
    const [cpuChoice, setCpuChoice] = useState("");
    const [gameState, setGameState] = useState(null);
    const [modalState, setModalState] = useState(false);
    const images = { rock, paper, scissor };
    const [points, setPoints] = useState(0);
    let message = '';

    let previousOutcome = null; 

    async function gameCode(choice) {
        const choices = ["rock", "paper", "scissor"];
        const choicesMap = { rock: 0, paper: 1, scissor: 2 };
        
        
        let cpuChoiceIndex;
        if (previousOutcome === 0) {
            
            cpuChoiceIndex = Math.floor(Math.random() * 3);
        } else if (previousOutcome === 1) {
            cpuChoiceIndex = Math.random() < 0.6 ? choicesMap[cpuChoice] : Math.floor(Math.random() * 3);
        } else if (previousOutcome === -1) {
            cpuChoiceIndex = (choicesMap[choice] + 1) % 3;
        } else {
            cpuChoiceIndex = Math.floor(Math.random() * 3);
        }

        const cpuSelection = choices[cpuChoiceIndex];
        setCpuChoice(cpuSelection);

        if (!["rock", "paper", "scissor"].includes(choice)) {
            setGameState(-1);
            setModalState(true);
            return;
        }

        const userVal = choicesMap[choice];
        const cpuVal = choicesMap[cpuSelection];

        if (userVal === cpuVal) {
            setGameState(2);
            previousOutcome = 0; 
        } else if ((userVal === 0 && cpuVal === 1) || (userVal === 1 && cpuVal === 2) || (userVal === 2 && cpuVal === 0)) {
            setGameState(0); 
            previousOutcome = 1;
        } else {
            setGameState(1); 
            setPoints((prevPoints) => prevPoints + 1);
            previousOutcome = -1;
        }

        setModalState(true);
    }

    if (gameState === -1) message = "Enter a valid choice: rock, paper, or scissor";
    else if (gameState === 1) message = "You win!";
    else if (gameState === 0) message = "You lose.";
    else if (gameState === 2) message = "It's a tie.";

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
                <div className="flex space-x-4 h-32">
                    <img
                        src={images[userChoice] || rock}  
                        className="w-32 h-32 object-contain transition-transform duration-500 ease-in-out transform"
                    />
                    <img
                        src={images[cpuChoice] || rock}
                        className="w-32 h-32 object-contain transition-transform duration-500 ease-in-out transform scale-x-[-1]"
                    />
                </div>
                <div className="space-x-4 pb-2">
                    <Button onClick={() => setUserChoice("rock")}>Rock ✊</Button>
                    <Button onClick={() => setUserChoice("paper")}>Paper ✋</Button>
                    <Button onClick={() => setUserChoice("scissor")}>Scissor ✌</Button>
                </div>
                <Button onClick={() => gameCode(userChoice)}>Submit Choice</Button>

                <div className="bg-green-800 bg-opacity-60 text-white text-xl font-semibold py-3 px-6 rounded-lg shadow-md mt-4">
                    Your Choice: <span className="capitalize">{userChoice || "None"}</span>
                </div>

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
