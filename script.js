(function() {
    const API_URL = "http://api.quotable.io/random";

    const quoteDisplayEl = document.getElementById("quoteDisplay");
    const quoteInputEl = document.getElementById("quoteInput");
    const timerEl = document.getElementById("timer");
    const speedEl = document.getElementById("speed");

    quoteInputEl.addEventListener("input", () => {
        const arrQuote = quoteDisplayEl.querySelectorAll("span");
        const arrValue = quoteInputEl.value.split("");
        let correct = true;

        arrQuote.forEach((charSpan, index) => {
            const char = arrValue[index];

            if (!char) {
                charSpan.classList.remove("correct");
                charSpan.classList.remove("incorrect");

                correct = false;
            } else if (char === charSpan.innerText) {
                charSpan.classList.add("correct");
                charSpan.classList.remove("incorrect");
            } else {
                charSpan.classList.remove("correct");
                charSpan.classList.add("incorrect");
                correct = false;
            }
        })

        if (correct && arrValue.length === arrQuote.length) {
            speedEl.textContent = calculateSpeed(arrQuote.length, timerEl.textContent);
            renderNextQuote();
        }
    })

    function getRandomQuote() {
        return fetch(API_URL)
            .then(res => res.json())
            .then(data => data.content)
    }

    function calculateSpeed(length, time) {
        speedEl.textContent = "";
        return `${((length / 5) / (time / 60)).toFixed(2)} wpm`;
    }


    async function renderNextQuote() {
        quoteDisplayEl.innerText = "";

        const quote = await getRandomQuote();
        // quoteDisplayEl.innerText = quote;

        quote.split("").forEach(char => {
            const charSpan = document.createElement("span");
            // charSpan.classList.add("correct");
            charSpan.innerText = char;
            quoteDisplayEl.appendChild(charSpan);
        })

        quoteInputEl.value = "";

        startTimer();
    }

    renderNextQuote();


    let startTime;

    function startTimer() {
        timerEl.innerText = 0;
        startTime = new Date();
        setInterval(() => {
            timerEl.innerText = getTimerTime();
        }, 1000);
    }


    function getTimerTime() {
        // startTime is when the timer started, calculates how much time has passed
        return Math.floor((new Date() - startTime) / 1000);
    }


})();

