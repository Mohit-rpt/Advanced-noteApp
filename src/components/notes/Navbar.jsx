function Navbar({darkMode,setDarkMode}){
    return(
        <nav className="bg-blue-600 text-white p-4 p-6 shadow-md flex justify-center">
            <h1 className="text-2xl font-bold ">
                📝 Note Keeper
            </h1>
           <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition ml-4"
            >
            {darkMode ? "☀️" : "🌙"}
            </button>
        </nav>
    )
}

export default Navbar;

