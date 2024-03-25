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


def get_all_original_indexes():
    mdIndexFiles = []
    for dirpath, subdirs, files in os.walk(
        os.path.join(os.getcwd(), "content", "posts")
    ):
        for x in files:
            if x.endswith("index.md"):
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


# def read_markdown(list):
#     slugged_titles = get_slugged_titles(list)
#     for file in list:
#         with open(file, "r") as f:
#             content = f.read()
#             links = re.findall("\]\(/(.*?)\)", content)
#             for link in links:
#                 highest = [
#                     {
#                         "score": similar(link, slugged_title),
#                         "link": link,
#                         "slugged_title": slugged_title,
#                     }
#                     for slugged_title in slugged_titles
#                 ]
#                 highest.sort(key=lambda x: x["score"], reverse=True)
#                 highest_coincidence = highest[0]
#                 content = content.replace(
#                     highest_coincidence["link"],
#                     "blog/" + highest_coincidence["slugged_title"] + "/",
#                 )

#         with open(file, "w") as f:
#             f.write(content)


def add_aliases_to_markdown_file(markdown_file, aliases):
    post = frontmatter.load(markdown_file)
    aliases.append("/" + slugify(post["title"])) if "/" + slugify(
        post["title"]
    ) not in aliases else aliases
    if "url" in post.keys():
        aliases.append("/" + post["url"]) if "/" + post[
            "url"
        ] not in aliases else aliases
    post["aliases"] = aliases
    return frontmatter.dumps(post)


def add_aliases_to_indexes(indexes):
    for file in indexes:
        markdown_with_aliases = add_aliases_to_markdown_file(
            file, ["/" + os.path.basename(os.path.dirname(file))]
        )
        with open(file, "w") as f:
            f.write(markdown_with_aliases)


def main():
    add_aliases_to_indexes(get_all_original_indexes())


if __name__ == "__main__":
    main()
