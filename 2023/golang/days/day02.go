package days

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/jack-0/aoc/2023/golang/util"
)

type Day02 util.Solutions

func (d Day02) GetSolutions() util.Solutions {
	return util.Solutions{
		Part1: d.Part1Solution,
		Part2: d.Part2Solution,
	}
}

type Play struct {
	Colour string
	Count int
}

type Game struct {
	Id int
	Games []Play 
}


func MapCountsForGame(game Game) map[string]int {
	colorCounts := make(map[string]int)
	for _, play := range game.Games {
		colorCounts[play.Colour] += play.Count
	}
	return colorCounts
}


func ValidGameSet(game Game) bool {
	for _, play := range game.Games {
		if play.Colour == "red" && play.Count > 12 {
			return false
		}
		if play.Colour == "green" && play.Count > 13 {
			return false
		}
		if play.Colour == "blue" && play.Count > 14 {
			return false
		}
	}
	return true
}


func (d Day02) Part1Solution(useExample bool) int {
	data, err := util.DayToData(2, useExample)
	if err != nil {
		return -1
	}


	games := []Game {}

	for _, line := range data {
		fmt.Println(line)
		gameId := strings.Split(strings.Split(line, ":")[0], "Game ")[1]
		gameStr := strings.Split(strings.Split(line, ":")[1], ";")

		id, _ := strconv.Atoi(gameId)
		plays := []Play{}

		for _, gameLine := range gameStr {
			fmt.Println(gameLine)
			playStr := strings.Split(gameLine, ",")
			for _, playLine := range playStr {
				colour := strings.Split(playLine, " ")[2]
				value, _ := strconv.Atoi(strings.Split(playLine, " ")[1])
				plays = append(plays, Play{Colour: colour, Count: value})
			}
		}
		games = append(games, Game{id, plays})
	}
	total := 0

	for _, game := range games {
		id := game.Id
		fmt.Println("game ", id)
		// colourCounts := MapCountsForGame(game)
		// r := colourCounts["red"]
		// g := colourCounts["green"]
		// b := colourCounts["blue"]
		// if r <= 12 && g <= 13 && b <= 14 {
		// 	total += id
		// } else {
		// 	fmt.Println("NOT included", " r=", r, " g=",g, " b=",b)
		// }
		if ValidGameSet(game) {
			total += game.Id
		}
	}

	return total
}

func (d Day02) Part2Solution(useExample bool) int {
	return -2
}
