document.getElementById("generateBtn").onclick = function () {

    let randomPuzzle =
        puzzles[Math.floor(Math.random() * puzzles.length)];

    for(let r=0;r<9;r++){

        for(let c=0;c<9;c++){

            if(randomPuzzle[r][c]==0){

    cells[r*9+c].value="";
    cells[r*9+c].classList.remove("given");
    cells[r*9+c].classList.remove("wrong");
    cells[r*9+c].classList.add("user");

    cells[r*9+c].readOnly=false;

}else{

    cells[r*9+c].value=randomPuzzle[r][c];

    cells[r*9+c].classList.add("given");
    cells[r*9+c].classList.remove("user");
    cells[r*9+c].classList.remove("wrong");

    cells[r*9+c].readOnly=true;

}

        }

    }

    steps = 0;
    updateSteps();
lives = 3;
    updateLives();
}

