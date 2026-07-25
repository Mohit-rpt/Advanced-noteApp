function SearchBar({search,setSearch}) {
    return <div> 
        <input
         type="text"
         value={search}
         onChange={(e) => setSearch(e.target.value)}
         placeholder="🔍 Search your notes..."
         className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
         >
       
        </input>
    </div>
}
export default SearchBar;