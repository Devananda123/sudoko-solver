let startTime = 0;
let timerInterval = null;

function startTimer(){

    if(timerInterval!==null)
        return;

    startTime = Date.now();

    timerInterval = setInterval(function(){

        let elapsed=((Date.now()-startTime)/1000).toFixed(1);

        document.getElementById("timer").textContent=
        elapsed+" s";

    },100);

}

function stopTimer(){

    clearInterval(timerInterval);

    timerInterval=null;

}

function resetTimer(){

    stopTimer();

    document.getElementById("timer").textContent="0.0 s";

}
