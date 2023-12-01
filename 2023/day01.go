package main

import (
	"bufio"
	"fmt"
	"os"
        "strconv"
        "regexp"
)

func eachLine(line string){
    fmt.Println(line)
}

func extractNumbers(input string) []int {
	re := regexp.MustCompile("\\d")
	matches := re.FindAllString(input, -1)
	var result []int
	for _, match := range matches {
		num, err := strconv.Atoi(match)
		if err == nil {
		    result = append(result, num)
		} else {
                    fmt.Println("fail")
                }
	}
	return result
}

func concatenateNumbers(nums []int) int {
	result := 0
	for _, num := range nums {
		result = result*10 + num
	}
	return result
}



func main() {
    // file, err := os.Open("day01_example.txt")
    file, err := os.Open("day01.txt")

    if err != nil {
        fmt.Println("Error reading file", err)
        return
    }

    defer file.Close()

    scanner := bufio.NewScanner(file);

    total := 0

    for scanner.Scan() {
        line := scanner.Text()
        // eachLine(line)
        values := extractNumbers(line)
        first := values[0]
	last := values[len(values)-1]
        value := concatenateNumbers([]int{first,last})
        total += value
    }

    fmt.Println(total)
}
