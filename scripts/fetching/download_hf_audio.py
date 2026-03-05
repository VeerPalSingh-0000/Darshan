import os
import pandas as pd
from huggingface_hub import list_repo_files, hf_hub_download

def extract_audio_direct():
    # Define where the audio should go in your React project
    dest_dir = os.path.join(os.path.dirname(__file__), '../../public/audio/gita')
    os.makedirs(dest_dir, exist_ok=True)
    
    repo_id = "JDhruv14/Bhagavad-Gita_Audio"
    print("Finding dataset files...")
    
    # 1. Look up the database (.parquet) files in the repository
    files = list_repo_files(repo_id, repo_type="dataset")
    parquet_files = [f for f in files if f.endswith('.parquet')]
    
    for p_file in parquet_files:
        print(f"Downloading {p_file} (This may take a moment)...")
        # 2. Download the database file directly
        file_path = hf_hub_download(repo_id=repo_id, filename=p_file, repo_type="dataset")
        
        print("Unpacking audio directly from binary data...")
        # 3. Read the database without using the 'datasets' audio decoder
        df = pd.read_parquet(file_path)
        
        for index, row in df.iterrows():
            # Extract the raw binary bytes of the audio file
            audio_bytes = row['audio']['bytes']
            
            # Figure out the file extension (usually .mp3 or .wav)
            original_filename = row['audio']['path']
            ext = os.path.splitext(original_filename)[1] if original_filename else ".mp3"
            
            # Create a clean filename like Chapter_1_Verse_1.mp3
            shloka_id = str(row.get('shloka_id', f'verse_{index}'))
            if '_' in shloka_id:
                parts = shloka_id.split('_')
                filename = f"Chapter_{parts[0]}_Verse_{parts[1]}{ext}"
            else:
                filename = f"Verse_{shloka_id}{ext}"
                
            output_path = os.path.join(dest_dir, filename)
            
            # Write the raw bytes straight to your hard drive
            with open(output_path, "wb") as f:
                f.write(audio_bytes)
                
            if (index + 1) % 50 == 0:
                print(f"Extracted {index + 1} files...")

if __name__ == "__main__":
    extract_audio_direct()
    print("✅ All audio files successfully extracted without needing FFmpeg!")