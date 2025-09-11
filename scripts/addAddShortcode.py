import os
import re


def get_md_files():
    """Get an array with every markdown file's location inside the posts folders"""
    mdIndexFiles = []
    for dirpath, subdirs, files in os.walk(
        os.path.join(os.getcwd(), "content", "posts")
    ):
        for x in files:
            if x.endswith(".md"):
                mdIndexFiles.append(os.path.join(dirpath, x))
    return mdIndexFiles


def add_ad_shortocode_before_heading(file_location: str):
    """Add an {{<ad1>}} shortcode before the first subtitle of each entry"""
    with open(file_location, "r") as f:
        content = f.read()
        if "{{<ad1>}}" not in content:
            print(file_location)
    if "{{<ad1>}}" not in content:
        n = 2
        pattern = r"(?<=\n)(## [^\n]*)(?=\n)"
        matches = re.split(pattern, content)
        # Reconstruct the markdown, adding "{{<ad1>}}" before the nth heading
        reconstructed_content = matches[0]  # Add the content before the first heading
        count = 0
        for i in range(1, len(matches), 2):  # Process headings and their content
            count += 1
            if count == n:
                reconstructed_content += "{{<ad1>}}\n\n"  # Add the ad before the heading
            reconstructed_content += matches[i]  # Add the heading
            reconstructed_content += matches[i + 1]  # Add the content under the heading

        with open(file_location, "w") as f:
            f.write(reconstructed_content)


if __name__ == "__main__":
    for file in get_md_files():
        add_ad_shortocode_before_heading(file)
