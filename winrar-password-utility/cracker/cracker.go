package cracker

import (
	"bufio"
	"crypto/sha256"
	"fmt"
	"os"

	"github.com/user/winrar-password-utility/parser"
	"golang.org/x/crypto/pbkdf2"
)

func LoadWordlist(path string) ([]string, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var passwords []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		passwords = append(passwords, scanner.Text())
	}
	return passwords, scanner.Err()
}

func Crack(hashes []parser.RARHash, passwords []string) string {
	for _, h := range hashes {
		salt, _ := parser.DecodeHex(h.Salt)
		expectedHash, _ := parser.DecodeHex(h.Hash)

		for _, pwd := range passwords {
			derived := pbkdf2.Key([]byte(pwd), salt, 32768, 32, sha256.New)
			if string(derived) == string(expectedHash) {
				return pwd
			}
		}
	}
	return ""
}

func verifyHash(password string, salt []byte, expected []byte) bool {
	derived := pbkdf2.Key([]byte(password), salt, 32768, 32, sha256.New)
	return string(derived) == string(expected)
}