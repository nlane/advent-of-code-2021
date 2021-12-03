package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func readInput(filename string) (input []int) {
	file, err := os.Open(filename)
	if err != nil {
		fmt.Println(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
    for scanner.Scan() {
		i, _ := strconv.Atoi(scanner.Text())
		input = append(input, i)
    }
 
    if err := scanner.Err(); err != nil {
        fmt.Println(err)
    }
	return
}

func main() {
    input := readInput("example.txt")

	fmt.Println(input)
}