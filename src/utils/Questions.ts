
export function nextQuestion() {
    localStorage.Current_Question = Number.parseInt(localStorage.Current_Question)+1;
    let num = localStorage.Current_Question;
    localStorage.Question = JSON.parse(localStorage.getItem(num) || "")[0];
    for (let x = 1; x < 5; x++) {
        localStorage.setItem(`Option_${x}`,JSON.parse(localStorage.getItem(num) || "")[x]);
    }
}