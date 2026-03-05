import os
import shutil

dir_path = 'public/school-images'
if not os.path.exists(dir_path):
    os.makedirs(dir_path)

files_to_move = [
    ('src/Pages/Schools-images/purusha.png', 'purusha.png'),
    ('src/Pages/Schools-images/prakriti.png', 'prakriti.png'),
    ('src/Pages/Schools-images/kapila.png', 'kapila.png')
]

for src, dest_name in files_to_move:
    dest = os.path.join(dir_path, dest_name)
    if os.path.exists(src):
        try:
            shutil.copy2(src, dest)
            print(f"Copied {src} to {dest}")
        except Exception as e:
            print(f"Error copying {src}: {e}")
    else:
        print(f"Source {src} not found")

