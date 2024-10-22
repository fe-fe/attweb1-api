import { GoogleGenerativeAI } from "@google/generative-ai";
import { apikey } from "./APIKEY.js";
const genAI = new GoogleGenerativeAI(apikey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const pergunta = document.getElementById("pergunta");
const resposta = document.getElementById("resposta");

const askbtn = document.getElementById("askbtn");
const randbtn = document.getElementById("randbtn");

async function pergunta_random() {
    pergunta.classList.remove("erro");
    const result = await model.generateContent("me de apenas um tema aleatorio para eu te perguntar sobre, retorne 'fale sobre' + tema");
    const p = result.response.candidates[0].content.parts[0].text;
    escrever(p, pergunta);
    return p;
}

async function perguntar(tema) {
    const result = await model.generateContent(`escreva sobre "${tema}" com ate 200 caracteres e sem formatacoes especiais, para que ela seja inserida numa pagina html`);
    return result.response.candidates[0].content.parts[0].text;
}

function escrever(texto, element) {

    element.value = "";
    element.innerText = "";

    for (let i = 0; i < texto.length; i++) {
        var txt;

        if (texto[i] == " " && i < texto.length - 1) {
            txt = " " + texto[i + 1]; // Adiciona o espaço seguido do próximo caractere
            i++; // Pula o próximo caractere
        } else {
            txt = texto[i]; // Apenas o caractere atual
        }

        (function(txt) {
            setTimeout(function() {
                element.value += txt;
                element.innerText += txt;
            }, 5 * i); // Multiplica o tempo pelo índice para garantir intervalos corretos
        })(txt); // Envolve o txt em uma função imediata para garantir que o valor seja capturado corretamente
    }
}

randbtn.addEventListener("click", async () => {
    const randperg = await pergunta_random();
    const result = await perguntar(randperg);
    escrever(result, resposta);
    
})

askbtn.addEventListener("click", async () => {

    if (pergunta.value.length == 0) {
        resposta.innerText = "Pergunte algo para eu poder responder =)";
        pergunta.classList.add("erro");
    } else {
        const result = await perguntar(pergunta.value);
        escrever(result, resposta);
    }

});

pergunta.addEventListener("change", () => {
    pergunta.classList.remove("erro");
})
