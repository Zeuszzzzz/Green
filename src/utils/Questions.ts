export function nextQuestion() {
    const current = Number(localStorage.Current_Question ?? -1) + 1;
    localStorage.Current_Question = String(current);

    const q = JSON.parse(localStorage.getItem(String(current)) || "[]");
    if (!q.length) return;

    localStorage.Question = q[0];
    for (let i = 1; i <= 4; i++) {
        localStorage.setItem(`Option_${i}`, q[i]);
    }
}

export function randomQuestion() {
    if (!localStorage.Bank) return;

    const bank: number[] = JSON.parse(localStorage.Bank);
    if (bank.length === 0) return;

    const index = Math.floor(Math.random() * bank.length);
    const num = bank[index];

    const q = JSON.parse(localStorage.getItem(String(num)) || "[]");
    if (!q.length) return;

    localStorage.Question = q[0];
    for (let i = 1; i <= 4; i++) {
        localStorage.setItem(`Option_${i}`, q[i]);
    }

    bank.splice(index, 1);
    localStorage.Bank = JSON.stringify(bank);
    localStorage.Current_Question = String(num);
}

export async function openFile(){
    const file = (document.getElementById("openFile") as HTMLInputElement).files?.[0];
    if (!file) return;
    const text = await file.text();
    const temp = text.split("|").map((q) => q.split(";"));
    temp.forEach((q, i) => localStorage.setItem(String(i), JSON.stringify(q)));
    
    const bank = Array.from({ length: temp.length }, (_, i) => i);
    localStorage.setItem("Bank", JSON.stringify(bank));

    if (localStorage.Randomize === "true") randomQuestion();
    else nextQuestion();
    document.getElementById("Home")?.click();
}