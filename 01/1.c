#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
  char inputBuffer[1000000] = {};

  FILE *inputFile = fopen("input.txt", "r");
  size_t fileSize = fread(inputBuffer, sizeof(char), sizeof(inputBuffer), inputFile);

  // parse columns
  int leftColumn[1000] = {};
  int rightColumn[1000] = {};
  int lines = 0;
  {
    int charIndex = 0;
    char curNum[10] = {};
    while (charIndex < fileSize) {
      // get first num
      while (inputBuffer[charIndex] != ' ') {
        curNum[strlen(curNum)] = inputBuffer[charIndex];
        charIndex++;
      }
      leftColumn[lines] = atoi(curNum);
      // skip spaces
      while (inputBuffer[charIndex] == ' ') {
        charIndex++;
      }
      // get second num
      while (inputBuffer[charIndex] != '\n' && inputBuffer[charIndex] != '\0') {
        curNum[strlen(curNum)] = inputBuffer[charIndex];
        charIndex++;
      }
      rightColumn[lines] = atoi(curNum);
      memset(curNum, 0, sizeof(curNum));
      // skip newline
      charIndex++;
      lines++;
    }
  }

  // sort columns
  for (int i = 0; i < lines; i++) {
    for (int j = i + 1; j < lines; j++) {
      if (leftColumn[i] > leftColumn[j]) {
        int temp = leftColumn[i];
        leftColumn[i] = leftColumn[j];
        leftColumn[j] = temp;
      }
      if (rightColumn[i] > rightColumn[j]) {
        int temp = rightColumn[i];
        rightColumn[i] = rightColumn[j];
        rightColumn[j] = temp;
      }
    }
  }

  // calculate absolute difference
  int absoluteDifference = 0;
  for (int i = 0; i < lines; i++) {
    absoluteDifference += abs(leftColumn[i] - rightColumn[i]);
  }

  printf("Absolute difference: %d\n", absoluteDifference);
}
