package day04

import (
	"bufio"
	"strings"
)

func Part1(s *bufio.Scanner) int {
	total := 0
	for s.Scan() {
		decks := strings.Split(strings.Split(s.Text(), ":")[1], "|")
		winningCards := strings.Fields(decks[0])
		myCards := strings.Fields(decks[1])
		myCardMap := make(map[string]int)
		for _, x := range myCards {
			myCardMap[x]++
		}

		roundTotal := 0
		for _, x := range winningCards {
			value, exists := myCardMap[x]

			if exists && value > 0 {
				// roundTotal++
				if roundTotal == 0 {
					roundTotal = 1
				} else {
					roundTotal *= 2
				}
				myCardMap[x]--
			}
		}
		total += roundTotal
	}

	return total
}

func Part2(s *bufio.Scanner) int {
	total := 0
	lineNum := 1

	scratchCards := map[int]int{}

	for s.Scan() {
		scratchCards[lineNum] += 1

		decks := strings.Split(strings.Split(s.Text(), ":")[1], "|")
		winningCards := strings.Fields(decks[0])
		myCards := strings.Fields(decks[1])
		
		myCardMap := make(map[string]int)
		for _, x := range myCards {
			myCardMap[x]++
		}

		roundTotal := 0
		for _, x := range winningCards {
			value, exists := myCardMap[x]
			if exists && value > 0 {
				roundTotal++
				myCardMap[x]--
			}
		}

		for i := 1; i <= roundTotal; i++ {
			scratchCards[lineNum+i] += scratchCards[lineNum]
		}
		
		lineNum++
	}

	for _, x := range scratchCards {
		if x > 0 {
			total += x
		}
	}
	return total
}
