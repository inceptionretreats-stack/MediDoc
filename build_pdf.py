"""Render the blueprint HTML to a polished PDF via headless Chromium (Playwright)."""
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).parent
HTML = ROOT / "Doctor_Platform_Blueprint.html"
PDF = ROOT / "Doctor_Platform_Blueprint.pdf"

footer = """
<div style="font-size:8px; color:#6a8089; width:100%; padding:0 14mm;
            display:flex; justify-content:space-between; font-family:Segoe UI, Arial;">
  <span>Doctor Platform — Master Blueprint</span>
  <span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span>
</div>"""
header = '<div style="font-size:1px;">&nbsp;</div>'

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    pg.goto(HTML.as_uri(), wait_until="networkidle")
    pg.pdf(
        path=str(PDF),
        format="A4",
        print_background=True,
        display_header_footer=True,
        header_template=header,
        footer_template=footer,
        margin={"top": "10mm", "bottom": "14mm", "left": "0mm", "right": "0mm"},
    )
    b.close()

size_kb = PDF.stat().st_size / 1024
print(f"OK -> {PDF}  ({size_kb:.0f} KB)")
