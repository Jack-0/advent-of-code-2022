package util

import (
	"bufio"
	"errors"
	"fmt"
	"os"
)

func DayToData(day int, example bool) ([]string, error) {

	dayStr := fmt.Sprintf("day%02d.txt", day)
	if example {
		dayStr = fmt.Sprintf("day%02d-example.txt", day)
	}

	filepath := "./input/" + dayStr

	file, err := os.Open(filepath)

	if err != nil {
		fmt.Println("Error reading file", err)
		errMsg := "Invalid filepath '" + filepath + "'"
		return nil, errors.New(errMsg)
	}

	defer file.Close()

	scanner := bufio.NewScanner(file)

	strArray := []string{}
	for scanner.Scan() {
		strArray = append(strArray, scanner.Text())
	}

	return strArray, nil
}
