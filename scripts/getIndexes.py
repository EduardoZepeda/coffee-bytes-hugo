import os
import sys
import time
import re
import frontmatter
from slugify import slugify
from difflib import SequenceMatcher


def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()


def get_unstranslated_indexes():
    mdIndexFiles = []
    for dirpath, subdirs, files in os.walk(
        os.path.join(os.getcwd(), "content", "posts")
    ):
        for x in files:
            if x.endswith("index.md") and not "index.en.md" in files:
                mdIndexFiles.append(os.path.join(dirpath, x))
    return mdIndexFiles


def get_translated_indexes():
    mdIndexFiles = []
    for dirpath, subdirs, files in os.walk(
        os.path.join(os.getcwd(), "content", "posts")
    ):
        for x in files:
            if x.endswith("index.en.md"):
                mdIndexFiles.append(os.path.join(dirpath, x))
    return mdIndexFiles


def translate_indexes(indexes, language="es", language_target="en", engine="deepl"):
    for index in indexes:
        os.system(
            f"md-translate {index} -F {language} -T {language_target} -P {engine} -D"
        )
        print("Sleeping: last index, ", index)
        time.sleep(120)


def get_slugged_titles(list):
    titles = []
    for file in list:
        with open(file, "r") as f:
            content = f.read()
            front = frontmatter.loads(content)
            title_slug = slugify(front["title"])
            titles.append(title_slug)
    return titles


def read_markdown(list):
    slugged_titles = get_slugged_titles(list)
    for file in list:
        with open(file, "r") as f:
            content = f.read()
            links = re.findall("\]\(/(.*?)\)", content)
            for link in links:
                highest = [
                    {
                        "score": similar(link, slugged_title),
                        "link": link,
                        "slugged_title": slugged_title,
                    }
                    for slugged_title in slugged_titles
                ]
                highest.sort(key=lambda x: x["score"], reverse=True)
                highest_coincidence = highest[0]
                content = content.replace(
                    highest_coincidence["link"],
                    "blog/" + highest_coincidence["slugged_title"] + "/",
                )

        with open(file, "w") as f:
            f.write(content)


def main():
    # for index in get_indexes():
    #     sys.stdout.write(index + "\n")
    # read_markdown(get_translated_indexes())
    # read_markdown(get_translated_indexes())
    translate_indexes(get_unstranslated_indexes())


if __name__ == "__main__":
    main()
