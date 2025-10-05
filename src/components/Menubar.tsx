import { useEffect } from "react";

function Menubar() {
    useEffect(() => {
        document
            .getElementById("openFile")
            ?.addEventListener("change", (event) => {
                let file = (event.target as HTMLInputElement).files?.[0].text();
                file?.then((value) => {
                    let temp = value.split("|").map((question: string) => {
                        return question.split(";");
                    });
                    for(let x = 0; x < value.length; x++){
                        localStorage.setItem(`${x}`,JSON.stringify(temp[x]));
                    }
                    console.log();
                    localStorage.Question = JSON.parse(localStorage.getItem("0") || "")[0];
                    localStorage.Option_1 = JSON.parse(localStorage.getItem("0") || "")[1];
                    localStorage.Option_2 = JSON.parse(localStorage.getItem("0") || "")[2];
                    localStorage.Option_3 = JSON.parse(localStorage.getItem("0") || "")[3];
                    localStorage.Option_4 = JSON.parse(localStorage.getItem("0") || "")[4];
                    localStorage.setItem("Current_Question","1");

                    document.getElementById("Home")?.click();
                });
            });
    }, []);

    return (
        <>
            <nav className="bg-gray-700 *:hover:text-white *:hover:bg-gray-600 w-screen **:p-1 **:rounded-[0.5rem]" id="mainBar">
                <div className="group relative inline-block **:hover:cursor-pointer">
                    <span>File</span>
                    <ul className="list-none *:hover:bg-indigo-700 hidden group-hover:block absolute bg-gray-700 top-full left-0 w-max  z-50">
                        <li>
                            <button
                                type="button"
                                onClick={() =>
                                    document.getElementById("openFile")?.click()
                                }
                            >
                                Open
                            </button>
                        </li>
                        <li>
                            <button type="button">Save</button>
                        </li>
                    </ul>
                </div>
                <button type="button" onClick={()=>{localStorage.clear();document.getElementById("Home")?.click();}}>Rest</button>
                <a href="/" className="hidden" id="Home"></a>
                <input
                    type="file"
                    accept=".quiz"
                    id="openFile"
                    className="hidden"
                    title="openFile"
                />
            </nav>
        </>
    );
}

export default Menubar;
