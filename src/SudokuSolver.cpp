#include "../include/SudokuSolver.h"

void SudokuSolver::inputBoard()
{
    cout << "Enter Sudoku Puzzle (0 for empty cells):\n";

    for (int i = 0; i < 9; i++)
    {
        for (int j = 0; j < 9; j++)
        {
            cin >> board[i][j];
        }
    }
}

void SudokuSolver::printBoard()
{
    cout << "\nSolved Sudoku:\n\n";

    for (int i = 0; i < 9; i++)
    {
        if (i % 3 == 0 && i != 0)
            cout << "-------------------------\n";

        for (int j = 0; j < 9; j++)
        {
            if (j % 3 == 0 && j != 0)
                cout << "| ";

            cout << board[i][j] << " ";
        }

        cout << endl;
    }
}

bool SudokuSolver::isSafe(int row, int col, int num)
{
    for (int x = 0; x < 9; x++)
    {
        if (board[row][x] == num)
            return false;
    }

    for (int x = 0; x < 9; x++)
    {
        if (board[x][col] == num)
            return false;
    }

    int startRow = row - row % 3;
    int startCol = col - col % 3;

    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            if (board[startRow + i][startCol + j] == num)
                return false;
        }
    }

    return true;
}

bool SudokuSolver::solveSudoku()
{
    for (int row = 0; row < 9; row++)
    {
        for (int col = 0; col < 9; col++)
        {
            if (board[row][col] == 0)
            {
                for (int num = 1; num <= 9; num++)
                {
                    if (isSafe(row, col, num))
                    {
                        board[row][col] = num;

                        if (solveSudoku())
                            return true;

                        board[row][col] = 0;
                    }
                }

                return false;
            }
        }
    }

    return true;
}
