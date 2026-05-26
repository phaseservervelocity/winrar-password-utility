package parser

import (
	"bufio"
	"encoding/hex"
	"os"
	"strings"
)

type RARHash struct {
	Salt string
	Hash string
}

func ParseRAR(path string) ([]RARHash, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	var hashes []RARHash

	for scanner.Scan() {
		line := scanner.Text()
		if strings.HasPrefix(line, "$rar5$") {
			parts := strings.Split(line, "*")
			if len(parts) >= 5 {
				hashes = append(hashes, RARHash{
					Salt: parts[2],
					Hash: parts[3],
				})
			}
		}
	}

	return hashes, nil
}

func DecodeHex(s string) ([]byte, error) {
	return hex.DecodeString(s)
}