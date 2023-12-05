package util

import (
	"bufio"
	"strings"
)

func DataTo2DArray(s *bufio.Scanner) (arr [][]string) {
	for s.Scan() {
		temp := make([]string, 0)
		for _, v := range strings.Split(s.Text(), "") {
			temp = append(temp, v)
		}
		arr = append(arr, temp)
	}
	return
}
