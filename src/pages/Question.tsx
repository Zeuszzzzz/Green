import { useEffect, useState } from "react";
import Menubar from "../components/Menubar";
import { nextQuestion } from "../utils/Questions";
import { Upper } from "../utils/String";

function Question() {
    const [mainBarHeight, setMainBarHeight] = useState(0);
    const [questionData, setQuestionData] = useState({
        Current_Question: "",
        Question: "",
        Option_1: "",
        Option_2: "",
        Option_3: "",
        Option_4: ""
    });

    useEffect(() => {
        if (!localStorage.getItem("Question")) {
            localStorage.setItem("Current_Question","-1")
            localStorage.setItem("Question", "Question");
            localStorage.setItem("Option_1", "2option-1");
            localStorage.setItem("Option_2", "2option-2");
            localStorage.setItem("Option_3", "2option-3");
            localStorage.setItem("Option_4", "2option-4");
        };

        setQuestionData({
            Current_Question: localStorage.Current_Question,
            Question: localStorage.Question,
            Option_1: localStorage.Option_1,
            Option_2: localStorage.Option_2,
            Option_3: localStorage.Option_3,
            Option_4: localStorage.Option_4,
        });

        const bar = document.getElementById("mainBar");
        if (bar) setMainBarHeight(bar.offsetHeight);
    }, []);

    return (
        <>
            <Menubar />
            <form
                action=""
                method="get"
                style={{ height: `calc(100vh - ${mainBarHeight}px)` }}
                className={`flex justify-center items-center flex-col w-screen *:pt-1 *:pb-1 *:rounded-[0.7rem] *:m-1
            [&>*:not(:first-child)]:border-2
            [&>*:not(:first-child)]:hover:cursor-pointer`}
            >
                <label className="font-bold">{questionData.Question}</label>
                <button type="button" className="hover:bg-white" name="Option" id="Option_1" onClick={showAnswer}>
                    {Upper(questionData.Option_1.substring(1))}
                </button>
                <button type="button" className="hover:bg-white" name="Option" id="Option_2" onClick={showAnswer}>
                    {Upper(questionData.Option_2.substring(1))}
                </button>
                <button type="button" className="hover:bg-white" name="Option" id="Option_3" onClick={showAnswer}>
                    {Upper(questionData.Option_3.substring(1))}
                </button>
                <button type="button" className="hover:bg-white" name="Option" id="Option_4" onClick={showAnswer}>
                    {Upper(questionData.Option_4.substring(1))}
                </button>
                <button
                    type="button"
                    className="bg-gray-700 text-white hover:cursor-pointer hidden"
                    onClick={()=>{nextQuestion(); location.reload()}}
                    id="Next"
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
    document.getElementsByName("Option").forEach((btn)=>{
        let answer = localStorage.getItem(btn.id)?.substring(0,1);
        let color = "";
        switch(answer){
            case "0":
                color = "#a37c88";
                break;
            case "1":
                color = "#647253";
                break;
            }
        btn.style.backgroundColor = color;
        let nextQuestion = document.getElementById("Next");
        if(nextQuestion) nextQuestion.style.display = "inline"
    });
}

export default Question;
