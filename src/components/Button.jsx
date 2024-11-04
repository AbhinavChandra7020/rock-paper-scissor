
export default function Button({onClick, children, className = '', ...props}){
    return (
        <button
            className = {`mt-4 px-6 py-2 bg-green-500 text-white text-lg rounded-xl shadow-md hover:bg-green-600 active:bg-green-700 transition duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-5${className}`}
            onClick = {onClick}
            {...props}
        >
            {children}
        </button>
    );
}