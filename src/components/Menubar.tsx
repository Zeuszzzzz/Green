import { useEffect, useState } from "react";
import { nextQuestion, randomQuestion } from "../utils/Questions";

function Menubar() {
    const [randomized, setRandomized] = useState(
        localStorage.Randomize === "true"
    );

    useEffect(() => {
        const openFile = document.getElementById("openFile");
        openFile?.addEventListener("change", async (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const text = await file.text();
            const temp = text.split("|").map((q) => q.split(";"));

            temp.forEach((q, i) => localStorage.setItem(String(i), JSON.stringify(q)));

            const bank = Array.from({ length: temp.length }, (_, i) => i);
            localStorage.setItem("Bank", JSON.stringify(bank));

            if (randomized) randomQuestion();
            else nextQuestion();

            document.getElementById("Home")?.click();
        });
    }, [randomized]);

    const reset = () => {
        localStorage.clear();
        document.getElementById("Home")?.click();
    };

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

            <button type="button" onClick={reset}>Reset</button>

            <div className="group relative inline-block">
                <span>Options</span>
                <ul className="list-none hidden group-hover:block absolute bg-gray-700 top-full left-0 w-max z-50 *:hover:bg-indigo-700">
                    <li className="flex items-center gap-2 p-1">
                        <input
                            type="checkbox"
                            id="Randomized?"
                            checked={randomized}
                            onChange={handleRandomizeChange}
                        />
                        <label htmlFor="Randomized?">Randomized</label>
                    </li>
                </ul>
            </div>

            <a href="/" className="hidden" id="Home"></a>
            <input type="file" accept=".quiz" id="openFile" className="hidden" />
        </nav>
    );
}

function handleRandomizeChange (e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.checked;
    localStorage.setItem("Randomize", String(value));

    localStorage.setItem("Current_Question", "-2");

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
