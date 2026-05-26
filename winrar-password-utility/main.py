import sys
import os
from src import WinRARCracker

def main():
    if len(sys.argv) < 2:
        print("Usage: python main.py <path_to_rar> [min_len] [max_len]")
        sys.exit(1)

    archive_path = sys.argv[1]
    if not os.path.isfile(archive_path):
        print(f"Error: File '{archive_path}' not found.")
        sys.exit(1)

    min_len = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    max_len = int(sys.argv[3]) if len(sys.argv) > 3 else 3

    cracker = WinRARCracker(archive_path, min_length=min_len, max_length=max_len)
    print(f"Starting brute-force (length {min_len}-{max_len})...")
    password = cracker.crack()
    if password:
        print(f"\n[+] Password found: {password}")
    else:
        print("\n[-] Password not found in given range.")

if __name__ == "__main__":
    main()