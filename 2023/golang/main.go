package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"

	"github.com/jack-0/aoc/2023/golang/day01"
	"github.com/jack-0/aoc/2023/golang/day02"
	"github.com/jack-0/aoc/2023/golang/day03"
)

func GetFilePath(day int, example bool) string {
	dayStr := fmt.Sprintf("day%02d.txt", day)
	if example {
		dayStr = fmt.Sprintf("day%02d-example.txt", day)
	}
	filepath := "./input/" + dayStr
	return filepath
}

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

func Run(
	filePath string,
	Part1 func(*bufio.Scanner) int,
	Part2 func(*bufio.Scanner) int,
) {
	f, err := os.Open(filePath)
	if err != nil {
		fmt.Println(filePath, err)
		return
	}
	defer func(f *os.File) {
		err = f.Close()
		if err != nil {
			fmt.Println(err)
			return
		}
	}(f)

	p1Scanner := bufio.NewScanner(f)
	fmt.Println("p1", Part1(p1Scanner))

	_, err = f.Seek(0, 0)
	if err != nil {
		return
	}

	p1Scanner = bufio.NewScanner(f)
	fmt.Println("p2", Part2(p1Scanner))

	err = p1Scanner.Err()
	if err != nil {
		fmt.Println(err)
	}
}

func main() {
	day, useExample := handleArgs(os.Args[1:])

	filepath := GetFilePath(day, useExample)

	switch day {
	case 1:
		Run(filepath, day01.Part1, day01.Part2)
	case 2:
		Run(filepath, day02.Part1, day02.Part2)
	case 3:
		Run(filepath, day03.Part1, day03.Part2)
	default:
		fmt.Println("Error: No day with value", day, useExample)
		os.Exit(1)
	}
}
