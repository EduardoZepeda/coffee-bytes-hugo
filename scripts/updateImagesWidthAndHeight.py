import os
import re
import requests
from PIL import Image


def update_image_dimensions(content_dir):
    # Updated regex to capture any figure tag (Cloudinary, local, or other external URLs)
    figure_pattern = re.compile(
        r'({{< figure src="([^"]+)"(.*?)>}})'
    )
    content_info_pattern = re.compile(r"width=(\d+),height=(\d+)")
    cloudinary_pattern = re.compile(r'^https://res\.cloudinary\.com/')
    local_path_pattern = re.compile(r'^images/[^\s]+$|^[^\s/]+\.(jpg|jpeg|png|gif|webp|svg)')

    for root, _, files in os.walk(content_dir):
        for file_name in files:
            if file_name.endswith(".md"):
                filepath = os.path.join(root, file_name)
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()

                updated_content = content
                replacements = []  # Store replacements to apply after iteration

                for match in figure_pattern.finditer(content):
                    full_tag = match.group(
                        1
                    )  # Now captures the entire tag: {{< figure ... >}}
                    src_url = match.group(2)
                    existing_attributes = match.group(3)

                    # Check if width and height already exist in the existing_attributes
                    if (
                        "width=" in existing_attributes
                        and "height=" in existing_attributes
                    ):
                        continue

                    try:
                        width = None
                        height = None

                        # Determine if it's a Cloudinary URL, local path, or other external URL
                        is_cloudinary = cloudinary_pattern.match(src_url)
                        is_local = local_path_pattern.match(src_url)

                        if is_cloudinary:
                            # Use HEAD request for Cloudinary (extract from server-timing header)
                            response = requests.head(src_url, timeout=5)
                            response.raise_for_status()
                            server_timing = response.headers.get("server-timing", "")

                            content_info_match = content_info_pattern.search(server_timing)
                            if content_info_match:
                                width = content_info_match.group(1)
                                height = content_info_match.group(2)

                        elif is_local:
                            # Local image - use Pillow to get dimensions
                            # Resolve relative path: images/xxx -> <post_dir>/images/xxx
                            post_dir = os.path.dirname(filepath)
                            local_image_path = os.path.join(post_dir, src_url)

                            if os.path.exists(local_image_path):
                                with Image.open(local_image_path) as img:
                                    width, height = img.size
                            else:
                                print(f"Local image not found: {local_image_path}")
                                continue

                        else:
                            # Other external URLs - try HEAD request
                            try:
                                response = requests.head(src_url, timeout=5)
                                response.raise_for_status()
                                # Try to get dimensions from Content-Length or other headers
                                content_length = response.headers.get('Content-Length')
                                content_type = response.headers.get('Content-Type', '')
                                
                                # For external images, we may not get exact dimensions via HEAD
                                # Skip if we can't determine dimensions
                                print(f"External image (HEAD only, no dimensions): {src_url}")
                                continue
                            except requests.exceptions.RequestException as e:
                                print(f"Error fetching HEAD for {src_url}: {e}")
                                continue

                        if width and height:
                            # Construct new attributes string
                            new_attributes = f' width="{width}" height="{height}"'

                            # Construct the updated tag. The closing '}}' is now part of the f-string.
                            updated_tag = f'{{{{< figure src="{src_url}"{existing_attributes}{new_attributes} >}}}}'

                            replacements.append((full_tag, updated_tag))

                    except requests.exceptions.RequestException as e:
                        print(f"Error fetching HEAD for {src_url}: {e}")
                    except Exception as e:
                        print(f"An unexpected error occurred for {src_url}: {e}")

                # Apply all collected replacements
                for old_tag, new_tag in replacements:
                    updated_content = updated_content.replace(old_tag, new_tag)

                if updated_content != content:
                    with open(filepath, "w", encoding="utf-8") as f:
                        f.write(updated_content)
                    print(f"Updated {filepath}")


if __name__ == "__main__":
    content_directory = os.getcwd()
    update_image_dimensions(content_directory)
