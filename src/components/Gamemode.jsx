import { Link } from "react-router-dom";
import Button from "./Button";

export default function Gamemode() {
    const gameModes = [
        { name: "Best of 3", targetPoints: 2, mode: "best-of-3" },
        { name: "Best of 5", targetPoints: 3, mode: "best-of-5" },
        { name: "Endless", targetPoints: null, mode: "endless" },
    ];

    return (
        <div className="flex justify-center items-center min-h-screen space-x-8 pb-10">
            {gameModes.map(({ name, targetPoints, mode }) => (
                <Link 
                    to={{
                        pathname: "/game",
                        search: `?mode=${mode}&targetPoints=${targetPoints}`
                    }}
                    key={mode}>
                    <Button>{name}</Button>
                </Link>
            ))}
        </div>
    );
}
