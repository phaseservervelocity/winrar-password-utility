package main

import (
	"fmt"
	"log"
	"os"

	"github.com/user/winrar-password-utility/cracker"
	"github.com/user/winrar-password-utility/parser"
)

func main() {
	if len(os.Args) < 3 {
		log.Fatal("Usage: winrar-password-utility <archive.rar> <wordlist.txt>")
	}

	archivePath := os.Args[1]
	wordlistPath := os.Args[2]

	hashes, err := parser.ParseRAR(archivePath)
	if err != nil {
		log.Fatalf("Failed to parse RAR: %v", err)
	}

	passwords, err := cracker.LoadWordlist(wordlistPath)
	if err != nil {
		log.Fatalf("Failed to load wordlist: %v", err)
	}

	found := cracker.Crack(hashes, passwords)
	if found != "" {
		fmt.Printf("Password found: %s\n", found)
	} else {
		fmt.Println("Password not found in wordlist.")
	}
}