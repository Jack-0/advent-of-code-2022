package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
	"sort"
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

func convertWordsToInt(input string) string {
	wordToValue := map[string]int{
		"zero":  0,
		"one":   1,
		"two":   2,
		"three": 3,
		"four":  4,
		"five":  5,
		"six":   6,
		"seven": 7,
		"eight": 8,
		"nine":  9,
	}
	type IndexValue struct {
		Index   int
		Value int
	}
	toAppend := []IndexValue{}
	
	for word, value := range wordToValue {
		re := regexp.MustCompile(word)

		indices := re.FindAllStringIndex(input, -1)
		for _, indexPair := range indices {
			_, endIndex := indexPair[0], indexPair[1]
			toAppend = append(toAppend, IndexValue{endIndex, value})
		}
	}		

	sort.SliceStable(toAppend, func(i,j int) bool {
		return toAppend[i].Index < toAppend[j].Index
	})

	index_offset := 0
	for _, pair := range toAppend {
		input = input[:pair.Index+index_offset] + strconv.Itoa(pair.Value) + input[pair.Index + index_offset:]
		index_offset += 1
	}

	return input
}


func main() {
    // file, err := os.Open("day01_example_p2.txt")
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
	lowercase_line := strings.ToLower(line)
	converted_line := convertWordsToInt(lowercase_line)
        values := extractNumbers(converted_line)
        first := values[0]
	last := values[len(values)-1]
        value := concatenateNumbers([]int{first,last})
        total += value
    }

    fmt.Println("total", total)
}
