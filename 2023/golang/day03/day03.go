package day03

import (
	"bufio"
	"fmt"
	"strconv"
	"unicode"

	"github.com/jack-0/aoc/2023/golang/util"
)

func getNeighbors(xStart, xEnd, y int, data [][]string) (neighbors []string) {
	for i := y - 1; i <= y+1; i++ {
		for j := xStart - 1; j <= xEnd; j++ {
			if i == y && (j >= xStart && j <= xEnd-1) {
				continue
			}
			if i >= 0 && i < len(data) && j >= 0 && j < len(data[i]) {
				neighbors = append(neighbors, data[i][j])
			}
		}
	}
	return
}


func Part1(s *bufio.Scanner) int {
	data := util.DataTo2DArray(s)
	total := 0

	for i := 0; i < len(data); i++ { // y 
		numStr := ""
		numStartIdx := 0
		for j := 0; j < len(data[i]); j++ { // x
			charValue := rune(data[i][j][0])
			
			// keep appending digits
			isDigit := unicode.IsDigit(charValue)
			if  isDigit {
				if numStr == "" {
					numStartIdx = j
				}
				numStr += data[i][j]
			}
			
			// if the loop index is no longer on a digit,
			// check numStr neighbors if we have a numStr
			if !isDigit || j == len(data[i])-1 {
				if numStr != "" {
					neighbors := getNeighbors(numStartIdx, j, i, data)
						fmt.Println("y=", i, "value=", numStr, neighbors)
					for _, n := range neighbors {
						if n != "." && !unicode.IsDigit(rune(n[0])) {
							value, _ := strconv.Atoi(numStr)
							total += value
						}
					}
				}
				numStr = ""
			}
		}
	}
	return total
}

func Part2(s *bufio.Scanner) int {
	return -1
}
