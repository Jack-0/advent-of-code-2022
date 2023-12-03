package main

import (
	"fmt"
	"os"
	"strconv"

	"github.com/jack-0/aoc/2023/golang/days"
	"github.com/jack-0/aoc/2023/golang/util"
)

func handleArgs(args []string) (int, bool) {
	dayOptionIndex := -1
	useExample := false

	for i, arg := range args {
		if arg == "-d" {
			dayOptionIndex = i
		} else if arg == "-e" {
			useExample = true
		}
	}

	var day int
	if dayOptionIndex != -1 && dayOptionIndex+1 < len(args) {
		dayValue, err := strconv.Atoi(args[dayOptionIndex+1])
		if err != nil || dayValue < 1 {
			fmt.Println("Error: Invalid day value")
			os.Exit(1)
		}
		day = dayValue
	} else {
		fmt.Println("Error: Day option (-d) not provided or missing value")
		os.Exit(1)
	}

	return day, useExample
}

func runDayX(solution util.Solutions, useExample bool) {
	if useExample {
		fmt.Println("⚠️  Using example")
	}
	fmt.Println("Part1: ", solution.Part1(useExample))
	fmt.Println("Part2: ", solution.Part2(useExample))
}

func main() {
	day, useExample := handleArgs(os.Args[1:])
	if day == 1 {
		runDayX(days.Day01.GetSolutions(days.Day01{}), useExample)
	}
	if day == 2 {
		runDayX(days.Day02.GetSolutions(days.Day02{}), useExample)
	}
}
