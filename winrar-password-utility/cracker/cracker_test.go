package cracker

import (
	"crypto/sha256"
	"testing"

	"github.com/user/winrar-password-utility/parser"
	"golang.org/x/crypto/pbkdf2"
)

func TestCrackFound(t *testing.T) {
	salt := []byte{0x01, 0x02, 0x03}
	password := "testpass123"
	hash := pbkdf2.Key([]byte(password), salt, 32768, 32, sha256.New)

	hashes := []parser.RARHash{
		{Salt: "010203", Hash: fmt.Sprintf("%x", hash)},
	}
	passwords := []string{"wrong", "testpass123", "other"}

	result := Crack(hashes, passwords)
	if result != "testpass123" {
		t.Errorf("Expected testpass123, got %s", result)
	}
}

func TestCrackNotFound(t *testing.T) {
	salt := []byte{0x0a, 0x0b, 0x0c}
	password := "secret99"
	hash := pbkdf2.Key([]byte(password), salt, 32768, 32, sha256.New)

	hashes := []parser.RARHash{
		{Salt: "0a0b0c", Hash: fmt.Sprintf("%x", hash)},
	}
	passwords := []string{"wrong1", "wrong2"}

	result := Crack(hashes, passwords)
	if result != "" {
		t.Errorf("Expected empty, got %s", result)
	}
}