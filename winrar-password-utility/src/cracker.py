import itertools
import string
import os
from pyunpack import Archive
from tqdm import tqdm

class WinRARCracker:
    def __init__(self, archive_path, min_length=1, max_length=4, charset=None):
        self.archive_path = archive_path
        self.min_length = min_length
        self.max_length = max_length
        self.charset = charset or string.ascii_lowercase + string.digits

    def _extract_with_password(self, password, extract_to):
        try:
            Archive(self.archive_path).extractall(extract_to, password=password)
            return True
        except Exception:
            return False

    def crack(self, extract_to="extracted"):
        total = sum(len(self.charset) ** l for l in range(self.min_length, self.max_length + 1))
        pbar = tqdm(total=total, desc="Cracking", unit="pw")

        for length in range(self.min_length, self.max_length + 1):
            for combo in itertools.product(self.charset, repeat=length):
                password = ''.join(combo)
                pbar.update(1)
                if self._extract_with_password(password, extract_to):
                    pbar.close()
                    return password
        pbar.close()
        return None