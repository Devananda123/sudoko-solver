#include "../include/SudokuSolver.h"

int main()
{
    SudokuSolver solver;

    solver.inputBoard();

    if (solver.solveSudoku())
    {
        solver.printBoard();
    }
    else
    {
        cout << "No solution exists!" << endl;
    }

    return 0;
}
