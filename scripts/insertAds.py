import os
import re
from pathlib import Path

def is_in_code_block(content, position):
    """Check if the given position is inside a markdown code block"""
    # Check for code fences before the position
    code_fences_before = list(re.finditer(r'```|~~~', content[:position]))
    
    # Count how many code fences are before the position
    fence_count = 0
    for fence in code_fences_before:
        fence_count += 1
    
    # If odd number of fences, we're inside a code block
    return fence_count % 2 == 1

def process_file(file_path):
    """Process a single markdown file to insert ad tags"""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Find all {{<ad1>}} positions
        ad_positions = [match.start() for match in re.finditer(r'\{\{<ad>\}\}', content)]
        
        if not ad_positions:
            return False
        
        modified = False
        new_content = content
        
        # Process each {{<ad1>}} occurrence
        for pos in reversed(ad_positions):  # Reverse to maintain correct positions when inserting
            # Find the position after the current {{<ad1>}}
            start_pos = pos + len('{{<ad1>}}')
            
            # Count paragraphs after the {{<ad1>}}
            paragraphs = []
            current_pos = start_pos

            paragraphs_before = []
            # Find up to 8 paragraphs before the ad tag
            for _ in range(8):
                # Look for previous paragraph (double newline)
                para_start = new_content.rfind('\n\n', 0, current_pos)
                if para_start == -1:
                    break
                
                paragraphs_before.append(para_start)
                current_pos = para_start
            
            # Insert {{<ad0>}} before the 8th paragraph if found and not in code block
            if len(paragraphs_before) >= 8:
                insert_pos = paragraphs_before[7]  # Position before the 8th paragraph back
                if not is_in_code_block(new_content, insert_pos):
                    new_content = new_content[:insert_pos] + '\n\n{{<ad0>}}' + new_content[insert_pos:]
                    modified = True
                    # Adjust all subsequent positions since we inserted content
                    pos += len('\n\n{{<ad0>}}')

            # restart current position to {{<add>}}
            current_pos = start_pos

            # Find up to 10 paragraphs after the ad tag
            for _ in range(10):
                # Look for next paragraph (double newline)
                para_end = new_content.find('\n\n', current_pos)
                if para_end == -1:
                    break
                
                # Include the paragraph content
                para_end += 2  # Include the double newline
                paragraphs.append((current_pos, para_end))
                current_pos = para_end
            
             # Insert {{<ad2>}} after 6 paragraphs if they exist and not in code block
            if len(paragraphs) >= 6:
                insert_pos = paragraphs[5][1]  # Position after 4th paragraph
                if not is_in_code_block(new_content, insert_pos):
                    new_content = new_content[:insert_pos] + '{{<ad2>}}\n\n' + new_content[insert_pos:]
                    modified = True
                    
                    # Adjust positions for ad3 insertion
                    paragraphs = []  # Reset paragraphs
                    current_pos = insert_pos + len('{{<ad2>}}\n\n')
                    
                    # Find next 6-7 paragraphs after ad2
                    for _ in range(7):
                        para_end = new_content.find('\n\n', current_pos)
                        if para_end == -1:
                            break
                        para_end += 2
                        paragraphs.append((current_pos, para_end))
                        current_pos = para_end
                    
                   # Insert {{<ad3>}} after 6-7 paragraphs
                    if len(paragraphs) >= 6:
                        insert_pos = paragraphs[5][1]  # Position after 6th paragraph
                        
                        # If in code block, find next position outside code block
                        original_insert_pos = insert_pos
                        while is_in_code_block(new_content, insert_pos) and insert_pos < len(new_content):
                            # Find next paragraph end after current position
                            next_para_end = new_content.find('\n\n', insert_pos + 1)
                            if next_para_end == -1:
                                break
                            insert_pos = next_para_end + 2
                        
                        # Only insert if we found a valid position and didn't go too far
                        if (insert_pos <= original_insert_pos + 500 and  # Reasonable distance
                            not is_in_code_block(new_content, insert_pos)):
                            new_content = new_content[:insert_pos] + '{{<ad3>}}\n\n' + new_content[insert_pos:]
                            modified = True
        
        if modified:
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f"Processed: {file_path}")
            return True
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
    
    return False

def main():
    """Main function to process all matching files"""
    folder_path = input("Enter folder path (or press Enter for current directory): ").strip()
    
    if not folder_path:
        folder_path = "."
    
    folder_path = Path(folder_path)
    
    if not folder_path.exists():
        print(f"Error: Folder '{folder_path}' does not exist!")
        return
    
    # Find all .es.md and .en.md files recursively
    pattern = "**/*.{es.md,en.md}"
    files = []
    for ext in ['*.es.md', '*.en.md']:
        files.extend(folder_path.rglob(ext))
    
    if not files:
        print("No .es.md or .en.md files found!")
        return
    
    print(f"Found {len(files)} files to process...")
    
    processed_count = 0
    for file_path in files:
        if process_file(file_path):
            processed_count += 1
    
    print(f"\nProcessing complete! Modified {processed_count} files.")

if __name__ == "__main__":
    main()