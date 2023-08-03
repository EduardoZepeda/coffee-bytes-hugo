import os
import sys
import time


def get_indexes():
    mdIndexFiles = []
    for dirpath, subdirs, files in os.walk(
        os.path.join(os.getcwd(), "content", "posts")
    ):
        for x in files:
            if x.endswith("index.md") and not "index_translated.md" in files:
                mdIndexFiles.append(os.path.join(dirpath, x))
    return mdIndexFiles


def translate_indexes(indexes, language="es", language_target="en", engine="deepl"):
    for index in indexes:
        os.system(
            f"md-translate {index} -F {language} -T {language_target} -P {engine} -D"
        )
        print("Sleeping: last index, ", index)
        time.sleep(120)


def main():
    # for index in get_indexes():
    #     sys.stdout.write(index + "\n")
    translate_indexes(get_indexes())


if __name__ == "__main__":
    main()
