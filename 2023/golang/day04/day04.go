package day04

import (
	"bufio"
	"fmt"
	"strconv"
	"strings"
)

func stringToNumArr(str []string) []int {
	var numbers []int
	for _, s := range str {
		n, err := strconv.Atoi(s)
		if err == nil {
			numbers = append(numbers, n)
		}
	}
	return numbers
}

func Part1(s *bufio.Scanner) int {
	total := 0
	for s.Scan() {
		line := s.Text()
		// unclean way of organising the data
		winningCards := stringToNumArr(strings.Split(strings.Split(strings.Split(line, ":")[1], "|")[0], " "))
		myCards := stringToNumArr(strings.Split(strings.Split(line, "|")[1], " "))

		roundTotal := 0
		for _, mc := range myCards {
			for _, wc := range winningCards {
				if mc == wc {
					if roundTotal == 0 {
						roundTotal = 1
					} else {
						roundTotal = roundTotal * 2
					}
				}
			}
		}
		total += roundTotal
		fmt.Println(winningCards, myCards, roundTotal)
	}
	return total
}

func Part2(s *bufio.Scanner) int {
	return -1
}
