import { useEffect, useState } from "react";
import Menubar from "../components/Menubar";

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
                <button type="button" className="hover:bg-white" name="Option_1" onClick={correctOrNot}>
                    {questionData.Option_1.substring(1)}
                </button>
                <button type="button" className="hover:bg-white" name="Option_2" onClick={correctOrNot}>
                    {questionData.Option_2.substring(1)}
                </button>
                <button type="button" className="hover:bg-white" name="Option_3" onClick={correctOrNot}>
                    {questionData.Option_3.substring(1)}
                </button>
                <button type="button" className="hover:bg-white" name="Option_4" onClick={correctOrNot}>
                    {questionData.Option_4.substring(1)}
                </button>
                <a href="/Correct" className="hidden" id="Correct"></a>
                <a href="/Wrong" className="hidden" id="Wrong"></a>
            </form>
        </>
    );
}

function correctOrNot(event: React.MouseEvent<HTMLButtonElement>){
    const btn = event.currentTarget;
    
    
    console.log(localStorage.getItem(btn.name)?.substring(0,1));
    switch(localStorage.getItem(btn.name)?.substring(0,1)){
        case "0":
            document.getElementById("Wrong")?.click();
            break;
        case "1":
            document.getElementById("Correct")?.click();
            break;
        default:
            location.reload();
    }
}

export default Question;
