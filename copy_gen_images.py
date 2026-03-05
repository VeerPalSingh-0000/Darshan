import shutil
import os

src_dir = r"C:\Users\Veer Pal Singh\.gemini\antigravity\brain\0013d5bb-611c-4605-8598-e50f7769fe1f"
dest_dir = r"c:\Users\Veer Pal Singh\Desktop\Darshanam\src\Pages\Schools-images"

mapping = {
    "patanjali_yoga_hero_1772537069761.png": "yoga_hero.png",
    "nyaya_logic_hero_1772537097653.png": "nyaya_hero.png",
    "vaisesika_atomic_hero_1772537115475.png": "vaisesika_hero.png",
    "vedanta_brahman_hero_1772537132781.png": "vedanta_hero.png",
    "mimamsa_ritual_hero_1772537153905.png": "mimamsa_hero.png",
    "buddhism_nirvana_hero_1772537174688.png": "buddhism_hero.png",
    "jainism_ahimsa_hero_1772537194774.png": "jainism_hero.png",
    "carvaka_material_hero_1772537212080.png": "carvaka_hero.png"
}

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

for src_name, dest_name in mapping.items():
    src_path = os.path.join(src_dir, src_name)
    dest_path = os.path.join(dest_dir, dest_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"Copied {src_name} to {dest_name}")
    else:
        print(f"Source {src_path} not found")
