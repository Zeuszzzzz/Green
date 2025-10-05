import { useEffect, useState } from "react";
import Menubar from "../components/Menubar";
import { nextQuestion } from "../utils/Questions";

function Wrong() {
    const [mainBarHeight, setMainBarHeight] = useState(0);
    useEffect(() => {
        const bar = document.getElementById("mainBar");
        if (bar) setMainBarHeight(bar.offsetHeight);
    }, []);

    return (
        <>
            <Menubar />
            <div
                className="flex flex-col items-center justify-center"
                style={{ height: `calc(100vh - ${mainBarHeight}px)` }}
            >
                <h1>Wrong</h1>
                <button
                    type="button"
                    className="bg-gray-700 text-white hover:cursor-pointer rounded-[0.2rem]"
                    onClick={next}
                >
                    Next Question
                </button>
                <a href="/" className="hidden" id="Home"></a>
            </div>
        </>
    );
}

function next() {
    nextQuestion();
    document.getElementById("Home")?.click();
}

export default Wrong;
