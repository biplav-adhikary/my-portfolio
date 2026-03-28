"""
Generate optimized WebP images and base64 LQIP (Low-Quality Image Placeholders)
from the source PNGs in src/assets/png/.

Outputs:
  - src/assets/optimized/*.webp       (quality 80, max 1920px wide)
  - src/assets/optimized/lqip.ts      (tiny base64 data-URIs for blur-up)
"""

import os
import base64
from io import BytesIO
from pathlib import Path
from PIL import Image

SRC_DIR = Path(__file__).resolve().parent.parent / "src" / "assets" / "png"
OUT_DIR = Path(__file__).resolve().parent.parent / "src" / "assets" / "optimized"
OUT_DIR.mkdir(parents=True, exist_ok=True)

MAX_WIDTH = 1920
WEBP_QUALITY = 80
LQIP_WIDTH = 32  # tiny — will be CSS-blurred anyway

lqip_entries: list[str] = []

for png_path in sorted(SRC_DIR.glob("*.png")):
    stem = png_path.stem  # e.g. "hero_cloud_shapes"
    print(f"Processing {png_path.name}...")

    img = Image.open(png_path).convert("RGBA")

    # --- Full-size WebP ---
    w, h = img.size
    if w > MAX_WIDTH:
        ratio = MAX_WIDTH / w
        img_resized = img.resize((MAX_WIDTH, int(h * ratio)), Image.LANCZOS)
    else:
        img_resized = img

    webp_path = OUT_DIR / f"{stem}.webp"
    img_resized.save(webp_path, "WEBP", quality=WEBP_QUALITY)
    webp_kb = webp_path.stat().st_size / 1024
    print(f"  -> {webp_path.name}: {webp_kb:.0f} KB ({img_resized.size[0]}x{img_resized.size[1]})")

    # --- LQIP (tiny base64) ---
    lqip_ratio = LQIP_WIDTH / w
    lqip_img = img.resize((LQIP_WIDTH, max(1, int(h * lqip_ratio))), Image.LANCZOS)
    buf = BytesIO()
    lqip_img.save(buf, "WEBP", quality=20)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    data_uri = f"data:image/webp;base64,{b64}"
    lqip_entries.append(f'  "{stem}": "{data_uri}",')
    print(f"  -> LQIP: {len(b64)} chars base64")

# --- Write lqip.ts ---
lqip_ts = OUT_DIR / "lqip.ts"
lines = [
    "/** Auto-generated LQIP (Low-Quality Image Placeholders). Do not edit. */",
    "export const lqip: Record<string, string> = {",
    *lqip_entries,
    "};",
    "",
]
lqip_ts.write_text("\n".join(lines), encoding="utf-8")
print(f"\nWrote {lqip_ts}")
print("Done!")
