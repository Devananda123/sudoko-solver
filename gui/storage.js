document.getElementById("saveBtn").onclick = function(){

const board = getBoard();

localStorage.setItem("sudoku",JSON.stringify(board));

alert("Puzzle Saved!");

};
document.getElementById("loadBtn").onclick = function(){

const data = localStorage.getItem("sudoku");

if(data){

setBoard(JSON.parse(data));

}

};
