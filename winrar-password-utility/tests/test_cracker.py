import unittest
import tempfile
import os
from src.cracker import WinRARCracker

class TestWinRARCracker(unittest.TestCase):
    def test_init_defaults(self):
        cracker = WinRARCracker("test.rar")
        self.assertEqual(cracker.min_length, 1)
        self.assertEqual(cracker.max_length, 4)

    def test_init_custom(self):
        cracker = WinRARCracker("test.rar", min_length=2, max_length=3, charset="ab")
        self.assertEqual(cracker.min_length, 2)
        self.assertEqual(cracker.max_length, 3)
        self.assertEqual(cracker.charset, "ab")

    def test_crack_no_archive(self):
        cracker = WinRARCracker("nonexistent.rar")
        result = cracker.crack(extract_to=tempfile.mkdtemp())
        self.assertIsNone(result)

if __name__ == "__main__":
    unittest.main()