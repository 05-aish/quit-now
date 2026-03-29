function Pagination({ currentpage, setcurrentPage, totalPages }) {           
    return(
        <div className="flex flex-row mt-4 justify-between w-full max-w-lg">
            <button 
            onClick={() => setcurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentpage === 1}>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="gray"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
            </button>

            <button 
            onClick={() => {
                setcurrentPage(prev => prev < totalPages ? prev + 1 : prev)
            }}
            disabled={currentpage >= totalPages}
            className=""
            ><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="gray"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
            </button>
        </div>
    );
};
export default Pagination;