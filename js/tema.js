const temabt = document.getElementById("temabt");
const tema = document.getElementById("tema");
const bg = document.getElementById("bg");

var pos = 0;

const temas = [
    ["☄️", "sky"],
    ["🍇", "grape"],
    ["🍒", "cherry"],
    ["🧇", "waffle"],

]

temabt.innerText = temas[pos][0];
tema.href = `/css/themes/${temas[pos][1]}-theme.css`;
bg.href = `/css/themes/${temas[pos][1]}-bg.css`;


temabt.addEventListener("click", () => {

    if (pos != 3) {
        pos++;
    } else {
        pos = 0;
    }

    console.log(pos);
    tema.href = `/css/themes/${temas[pos][1]}-theme.css`;
    bg.href = `/css/themes/${temas[pos][1]}-bg.css`;
    temabt.innerText = temas[pos][0];  

})