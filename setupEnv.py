import argparse
import json
from os import environ
import os.path
import sys

def main():
    
    parser = argparse.ArgumentParser(description='Converts environment variables to JavaScript file')

    parser.add_argument("OUTPUT",nargs=1,help="Path to output the JavaScript environment file to")
    args = parser.parse_args()


    stringOut = 'window.env={'

    environ_json = ([f'"{key}":{json.dumps(environ[key])}' for key in environ])
    stringOut += ",".join(environ_json)

    stringOut += "};"

    if args.OUTPUT[0] == "-":
        print(stringOut)
    else:
        output = os.path.abspath(args.OUTPUT[0])
        open(output,"w").write(stringOut)

if __name__ == "__main__":
    main()
