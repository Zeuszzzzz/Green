import { nextQuestion, openFile, randomQuestion } from "../utils/Questions";

function Menubar() {

    return (
        <nav
            className="bg-gray-700 w-screen **:p-1 **:rounded-lg **:hover:cursor-pointer *:hover:text-white *:hover:bg-gray-600"
            id="mainBar"
        >
            <div className="group relative inline-block">
                <span>File</span>
                <ul className="list-none hidden group-hover:block absolute bg-gray-700 top-full left-0 w-max z-50 *:hover:bg-indigo-700">
                    <li>
                        <button type="button" onClick={() => document.getElementById("openFile")?.click()}>
                            Open
                        </button>
                    </li>
                    <li><button type="button">Save</button></li>
                </ul>
            </div>

            <button type="button" onClick={()=>{localStorage.clear();document.getElementById("Home")?.click();}}>Reset</button>

            <div className="group relative inline-block">
                <span>Options</span>
                <ul className="list-none hidden group-hover:block absolute bg-gray-700 top-full left-0 w-max z-50 *:hover:bg-indigo-700">
                    <li className="flex items-center gap-2 p-1">
                        <input
                            type="checkbox"
                            id="Randomized?"
                            checked={localStorage.Randomize === "true"}
                            onChange={handleRandomizeChange}
                        />
                        <label htmlFor="Randomized?">Randomized</label>
                    </li>
                </ul>
            </div>

            <a href="/" className="hidden" id="Home"></a>
            <input type="file" accept=".quiz" id="openFile" className="hidden" onChange={openFile} />
        </nav>
    );
}

function handleRandomizeChange (e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.checked;
    localStorage.setItem("Randomize", String(value));

    localStorage.setItem("Current_Question", "-1");

    const allKeys = Object.keys(localStorage).filter((k) => !isNaN(Number(k)));
    if (allKeys.length > 0) {
        const bank = allKeys.map(Number);
        localStorage.setItem("Bank", JSON.stringify(bank));
    }

    if (value) {
        randomQuestion();
    } else {
        nextQuestion();
    }
    window.location.href = "/";
};


export default Menubar;
