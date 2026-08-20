#ifndef SUDOKUSOLVER_H
#define SUDOKUSOLVER_H

#include <iostream>

using namespace std;

class SudokuSolver
{
private:
    int board[9][9];

public:
    void inputBoard();
    void printBoard();
    bool isSafe(int row, int col, int num);
    bool solveSudoku();
};

#endif
