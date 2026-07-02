import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOKEN_PATH = os.path.expanduser("~/.netlify_token")


def main():
    token = open(TOKEN_PATH).read().strip()
    env = os.environ.copy()
    env["NETLIFY_AUTH_TOKEN"] = token
    result = subprocess.run(
        ["netlify", "deploy", "--prod", "--dir=site"],
        cwd=ROOT,
        env=env,
        text=True,
    )
    sys.exit(result.returncode)


if __name__ == "__main__":
    main()
