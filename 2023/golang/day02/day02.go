package day02

import (
	"bufio"
	"strconv"
	"strings"
)

type Play struct {
	Colour string
	Count  int
}

type Game struct {
	Id    int
	Games []Play
}

func MapCountsForGame(game Game) map[string]int {
	colorCounts := make(map[string]int)
	for _, play := range game.Games {
		colorCounts[play.Colour] += play.Count
	}
	return colorCounts
}

func MapMinCubeCount(game Game) map[string]int {
	colorCounts := make(map[string]int)
	for _, play := range game.Games {
		if play.Count > colorCounts[play.Colour] {
			colorCounts[play.Colour] = play.Count
		}
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

func DataToGames(data []string) []Game {
	games := []Game{}
	for _, line := range data {
		gameId := strings.Split(strings.Split(line, ":")[0], "Game ")[1]
		gameStr := strings.Split(strings.Split(line, ":")[1], ";")

		id, _ := strconv.Atoi(gameId)
		plays := []Play{}

		for _, gameLine := range gameStr {
			playStr := strings.Split(gameLine, ",")
			for _, playLine := range playStr {
				colour := strings.Split(playLine, " ")[2]
				value, _ := strconv.Atoi(strings.Split(playLine, " ")[1])
				plays = append(plays, Play{Colour: colour, Count: value})
			}
		}
		games = append(games, Game{id, plays})
	}
	return games
}

func Part1(s *bufio.Scanner) int {

	data := []string{}
	for s.Scan() {
		data = append(data, s.Text())
	}

	games := DataToGames(data)
	total := 0

	for _, game := range games {
		if ValidGameSet(game) {
			total += game.Id
		}
	}

	return total
}

func Part2(s *bufio.Scanner) int {
	data := []string{}
	for s.Scan() {
		data = append(data, s.Text())
	}

	games := DataToGames(data)
	total := 0

	for _, game := range games {
		minCounts := MapMinCubeCount(game)
		r := minCounts["red"]
		g := minCounts["green"]
		b := minCounts["blue"]
		power := r * g * b
		total += power
	}

	return total
}
