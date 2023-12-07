package util

import (
	"bufio"
	"strings"
)

func DataTo2DArray(s *bufio.Scanner) (arr [][]string) {
	for s.Scan() {
		temp := make([]string, 0)
		for _, x := range strings.Split(s.Text(), "") {
			temp = append(temp, x)
		}
		arr = append(arr, temp)
	}
	return
}
