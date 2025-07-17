import frontmatter
from pathlib import Path
import re
import os
import unicodedata


post_category_relation = {}


def remove_accents(input_str):
    nfkd_form = unicodedata.normalize("NFKD", input_str)
    return "".join([c for c in nfkd_form if not unicodedata.combining(c)])


def slugify(text):
    """Convert text to a slug (lowercase, replace spaces with hyphens, remove special chars)"""
    text = text.lower().strip().replace("?", "")
    text = remove_accents(text)
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    text = re.sub(r"^-+|-+$", "", text)
    return text


def populate_post_category_dict():
    for md_file in Path("content/posts/").rglob("*.md"):
        if not md_file.name.endswith("_index.md"):
            try:
                with open(md_file, "r") as f:
                    post = frontmatter.load(f)
                    first_category = post.metadata["categories"][0]
                    title = post.metadata.get("title", "")
                    url = post.metadata.get("url", "")
                    if title:
                        post_category_relation[slugify(title)] = first_category
                    if url:
                        url_array = url.split("/")
                        final_url = [x for x in url_array if x != ""]
                        if len(final_url) >= 1:
                            post_category_relation[final_url[-1]] = first_category
            except FileNotFoundError:
                continue


def get_parent_from_post_directory(dir: str, content_dir="content"):
    posts_dir = Path(content_dir) / "posts"
    for category_dir in posts_dir.iterdir():
        if category_dir.is_dir():
            for post_dir in category_dir.iterdir():
                if post_dir.is_dir() and post_dir.name == dir:
                    return post_dir.parent.name


def get_current_category(old_dir: str, lang="es", content_dir="content"):
    try:
        with open(
            f"{content_dir}/posts/{old_dir}/index.{lang}.md", "r", encoding="utf-8"
        ) as f:
            post = frontmatter.load(f)
            first_category = post.metadata["categories"][0]
            return first_category
    except FileNotFoundError:
        return get_parent_from_post_directory(old_dir)


def update_links(content, post_dir_name, category_slug, lang):
    """Update links in content with precise match handling"""

    # Process Hugo {{< ref >}} shortcodes
    def update_ref(match):
        prefix = match.group(1)
        posts_prefix = match.group(2)
        old_dir = match.group(3)
        rest_path = match.group(4)
        suffix = match.group(5)
        new_category = get_current_category(old_dir)
        # Add your custom logic here if needed
        return f"{prefix}/posts/{slugify(new_category)}/{old_dir}{rest_path}{suffix}"

    content = re.sub(
        r'(\{\{<\s*ref\s+path=")(/posts/)([^/]+)(/[^"]+)("\s*(lang="[a-z]+")?\s*>\}\})',
        update_ref,
        content,
    )

    # Process markdown URLs (/en/some-path)
    def update_url(match):
        prefix_char = match.group(1)  # Could be (, ", ', or whitespace
        lang_prefix = match.group(2)  # /en or /es
        old_path = match.group(3)
        trailing_slash = match.group(4)

        # DYNAMIC HANDLING POINT - modify this logic as needed
        new_path = old_path  # Default case (no change)

        # Example dynamic logic:
        if old_path.startswith("special-"):
            new_path = f"custom/{old_path}"
        else:
            new_category = post_category_relation.get(old_path, "")
            if new_category:
                new_path = f"{new_category}/{old_path}"
            else:
                new_path = f"{category_slug}/{old_path}"
        return f"{prefix_char}{lang_prefix}/{new_path}/"

    content = re.sub(
        r'([(\'"\s]|href=)(/[a-z]{2})/([^/")\s]+)(/?)', update_url, content
    )

    return content


def process_posts(content_dir="content"):
    populate_post_category_dict()
    posts_dir = Path(content_dir) / "posts"
    # Process each post directory
    for post_dir in posts_dir.iterdir():
        if not post_dir.is_dir() or post_dir.name.startswith("."):
            continue

        print(f"\nProcessing: {post_dir.name}")

        # Check for markdown files
        md_files = list(post_dir.glob("*.md"))  # Get ALL .md files
        if not md_files:
            print(f"No markdown files found in {post_dir}, skipping")
            continue

        # Process the first index.*.md file to get frontmatter
        index_md_files = [f for f in md_files if f.name.startswith("index.")]
        if not index_md_files:
            print(f"No index.*.md file found in {post_dir}, skipping")
            continue

        try:
            with open(index_md_files[0], "r", encoding="utf-8") as f:
                post = frontmatter.load(f)
        except Exception as e:
            print(f"Error reading {index_md_files[0]}: {e}")
            continue

        if "categories" not in post.metadata or not post.metadata["categories"]:
            print(f"No categories found for {post_dir}, skipping")
            continue

        # Get first category and slugify it
        first_category = post.metadata["categories"][0]
        category_slug = slugify(first_category)
        category_dir = posts_dir / category_slug
        # Create category directory if it doesn't exist
        category_dir.mkdir(exist_ok=True)
        empty_index_md = category_dir / "_index.md"
        empty_index_md.touch()
        # Skip if already in correct category
        if post_dir.parent == category_dir:
            print(f"Already in correct category: {category_dir}")
            continue

        # Get title for alias
        title = post.metadata.get("title", post_dir.name)
        title_slug = slugify(title)

        # Update ALL markdown files in directory
        for md_file in md_files:
            try:
                print(f"Updating: {md_file.name}")
                with open(md_file, "r", encoding="utf-8") as f:
                    content = f.read()
                    post = frontmatter.loads(content)
                # Create alias path
                md_title = post.metadata.get("title", post_dir.name)
                local_lang = md_file.name.split(".")[-2]
                local_title = slugify(md_title)
                alias_path = f"/{local_lang}/{local_title}/"
                first_category = post.metadata["categories"][0]
                # For index files, update aliases
                if md_file.name.startswith("index."):
                    # Handle aliases - ensure it's a list
                    if "aliases" not in post.metadata:
                        post.metadata["aliases"] = []
                    elif isinstance(post.metadata["aliases"], str):
                        post.metadata["aliases"] = [post.metadata["aliases"]]

                    # Add new alias if not already present
                    if alias_path not in post.metadata["aliases"]:
                        post.metadata["aliases"].append(alias_path)

                # Update links in content for ALL markdown files
                updated_content = update_links(
                    post.content, post_dir.name, category_slug, local_lang
                )
                post.content = updated_content

                # Write back the file
                with open(md_file, "w", encoding="utf-8") as f:
                    f.write(frontmatter.dumps(post))
            except Exception as e:
                print(f"Error processing {md_file}: {e}")
                continue

        # Move the directory to the category folder
        new_path = category_dir / post_dir.name

        try:
            if new_path.exists():
                print(f"Warning: {new_path} already exists, merging contents")
                # Move individual items to existing directory
                for item in post_dir.iterdir():
                    dest = new_path / item.name
                    if dest.exists():
                        print(f"Conflict: {dest} already exists, skipping")
                        continue
                    os.system(f"git mv {str(item)} {str(dest)}")
                # Remove now-empty source directory
                post_dir.rmdir()
            else:
                # Standard case - move entire directory
                os.system(f"git mv {str(post_dir)} {str(new_path)}")

            print(f"Successfully moved to: {new_path}")
        except Exception as e:
            print(f"Error moving directory: {e}")
            continue


if __name__ == "__main__":
    process_posts()
    print(rela)
