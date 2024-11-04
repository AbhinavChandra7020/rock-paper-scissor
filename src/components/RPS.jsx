import { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom'; 
import paper from '../assets/paper.png';
import rock from '../assets/rock.png';
import scissor from '../assets/scissor.png';
import PopupModal from './PopupModal';
import Button from './Button';

export default function RPS() {
    const { mode, targetPoints } = useLoaderData();
    const navigate = useNavigate(); 
    const [userChoice, setUserChoice] = useState("");
    const [cpuChoice, setCpuChoice] = useState("");
    const [gameState, setGameState] = useState(null);
    const [modalState, setModalState] = useState(false);
    const [endMatchModal, setEndMatchModal] = useState(false); 
    const images = { rock, paper, scissor };
    const [points, setPoints] = useState(0);
    const [cpuPoints, setCpuPoints] = useState(0);
    const [matchMessage, setMatchMessage] = useState(''); 

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
            setCpuPoints((prevPoints) => prevPoints + 1);
            previousOutcome = 1;
        } else {
            setGameState(1); 
            setPoints((prevPoints) => prevPoints + 1);
            previousOutcome = -1;
        }

        setModalState(true);
    }

    useEffect(() => {
        if (mode !== "endless" && (points >= targetPoints || cpuPoints >= targetPoints)) {
            setModalState(false); 
            const resultMessage = points > cpuPoints ? "Player wins the match!🥳🎉" : "CPU wins the match!😔";
            setMatchMessage(resultMessage);
            setEndMatchModal(true); 
        }
    }, [points, cpuPoints, targetPoints, mode]);

    if (gameState === -1) message = "Enter a valid choice: rock, paper, or scissor";
    else if (gameState === 1) message = "You win!";
    else if (gameState === 0) message = "You lose.";
    else if (gameState === 2) message = "It's a tie.";

    const handleCloseModal = () => {
        setModalState(false);
        setGameState(null);
    };

    const handlePlayAgain = () => {
        setPoints(0);
        setCpuPoints(0);
        setMatchMessage('');
        setEndMatchModal(false);
    };

    const handleChooseGamemode = () => {
        navigate('/gamemode'); 
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow flex flex-col justify-center items-center space-y-8 text-black">
                <div className="flex h-32 items-center space-x-20">
                    <div className="flex flex-col items-center">
                        <div className="bg-green-700 text-white text-lg font-bold py-1 px-3 rounded-lg shadow-md mb-2">
                            Player
                        </div>
                        <img
                            src={images[userChoice] || rock}
                            className="w-32 h-32 object-contain transition-transform duration-500 ease-in-out transform"/>
                        <div className="mt-2 text-white font-semibold bg-green-500 px-4 py-1 rounded-full shadow">
                            Points: {points}
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="bg-green-700 text-white text-lg font-bold py-1 px-3 rounded-lg shadow-md mb-2">
                            CPU
                        </div>
                        <img
                            src={images[cpuChoice] || rock}
                            className="w-32 h-32 object-contain transition-transform duration-500 ease-in-out transform scale-x-[-1]"/>
                        <div className="mt-2 text-white font-semibold bg-green-500 px-4 py-1 rounded-full shadow">
                            Points: {cpuPoints}
                        </div>
                    </div>
                </div>

                <div className="space-x-4 pb-2 pt-2">
                    <Button onClick={() => setUserChoice("rock")}>Rock ✊</Button>
                    <Button onClick={() => setUserChoice("paper")}>Paper ✋</Button>
                    <Button onClick={() => setUserChoice("scissor")}>Scissor ✌</Button>
                </div>
                <Button onClick={() => gameCode(userChoice)}>Submit Choice</Button>

                <div className="bg-green-800 bg-opacity-60 text-white text-xl font-semibold py-3 px-6 rounded-lg shadow-md mt-4">
                    Your Choice: <span className="capitalize">{userChoice || "None"}</span>
                </div>

                <Button onClick={handleChooseGamemode} className="mt-2">Change Gamemode</Button>
            </div>
            {modalState && (
                <PopupModal
                    title={matchMessage || "Game Result"}
                    message={matchMessage || message}
                    onClose={handleCloseModal}/>
            )}
            {endMatchModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <div className="text-2xl font-semibold mb-4">
                            {matchMessage}
                        </div>
                        <div className="space-x-4">
                            <Button onClick={handlePlayAgain}>
                                Play Again
                            </Button>

                            <Button onClick={handleChooseGamemode}>
                                Choose Another Gamemode
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
