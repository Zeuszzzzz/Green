import { useEffect, useState } from "react";
import Menubar from "../components/Menubar";
import { shuffleArray } from "../utils/Array";
import { nextQuestion, randomQuestion } from "../utils/Questions";
import { Upper } from "../utils/String";

function Question() {
    const [mainBarHeight, setMainBarHeight] = useState(0);
    const [questionData, setQuestionData] = useState({
        Randomize: "",
        Current_Question: "",
        Question: "",
        Option_1: "",
        Option_2: "",
        Option_3: "",
        Option_4: "",
    });

    useEffect(() => {
        if (!localStorage.getItem("Question")) {
            localStorage.setItem("Current_Question", "-1");
            localStorage.setItem("Question", "Question");
            localStorage.setItem("Option_1", "0option-1");
            localStorage.setItem("Option_2", "0option-2");
            localStorage.setItem("Option_3", "0option-3");
            localStorage.setItem("Option_4", "0option-4");
        }

        setQuestionData({
            Randomize: localStorage.Randomize ?? "false",
            Current_Question: localStorage.Current_Question ?? "-1",
            Question: localStorage.Question ?? "",
            Option_1: localStorage.Option_1 ?? "",
            Option_2: localStorage.Option_2 ?? "",
            Option_3: localStorage.Option_3 ?? "",
            Option_4: localStorage.Option_4 ?? "",
        });

        const bar = document.getElementById("mainBar");
        if (bar) setMainBarHeight(bar.offsetHeight);
        
        
    }, []);

    const handleNext = () => {
        if (questionData.Randomize === "true") randomQuestion();
        else nextQuestion();
        location.reload();
    };
    
    return (
        <>
            <Menubar />
            <form
                style={{ height: `calc(100vh - ${mainBarHeight}px)` }}
                className="flex flex-col justify-center items-center w-screen *:pt-1 *:pb-1 *:rounded-xl *:m-1 [&>*:not(:first-child)]:border-2 [&>*:not(:first-child)]:hover:cursor-pointer"
            >
                <label className="font-bold">{questionData.Question}</label>

                {shuffleArray([1,2,3,4]).map((n) => (
                    <button
                        key={n}
                        type="button"
                        id={`Option_${n}`}
                        name="Option"
                        onClick={showAnswer}
                        className="hover:bg-white"
                    >
                        {Upper(
                            questionData[`Option_${n}` as keyof typeof questionData].substring(1)
                        )}
                    </button>
                ))}

                <button
                    type="button"
                    id="Next"
                    onClick={handleNext}
                    className="bg-gray-700 text-white hover:cursor-pointer hidden"
                >
                    Next Question
                </button>

                <a href="/Correct" className="hidden" id="Correct"></a>
                <a href="/Wrong" className="hidden" id="Wrong"></a>
            </form>
        </>
    );
}

function showAnswer(){
    document.getElementsByName("Option").forEach((btn) => {
        const el = btn as HTMLButtonElement;
        const prefix = localStorage.getItem(el.id)?.[0];
        const color = prefix === "1" ? "#647253" : "#a37c88";
        el.style.backgroundColor = color;
    });
    document.getElementById("Next")?.classList.remove("hidden");
};

export default Question;
