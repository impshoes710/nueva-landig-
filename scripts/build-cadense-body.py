#!/usr/bin/env python3
"""Genera body-content-cadense.html desde la landing principal."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'src/partials/body-content.html'
OUT = ROOT / 'src/partials/body-content-cadense.html'
VARIANTS = ROOT / 'src/data/cadense-variants.json'

IMAGES = [
    '/images/cadense/Gemini_Generated_Image_ukfcmkukfcmkukfc_1200x1200.png',
    '/images/cadense/Gemini_Generated_Image_cken4zcken4zcken_1200x1200.png',
    '/images/cadense/Gemini_Generated_Image_hh26bhhh26bhhh26_1200x1200.png',
    '/images/cadense/Gemini_Generated_Image_h8so07h8so07h8so_1.png',
    '/images/cadense/CADENCE.jpg',
]

MAIN_IMG = IMAGES[0]


def build_size_select(variants_data: dict) -> str:
    blanco = [v for v in variants_data['variants'] if v['color'] == 'Blanco']
    blanco.sort(key=lambda x: int(x['size']))
    options = []
    for i, v in enumerate(blanco):
        selected = ' selected=""' if v['size'] == '37' else ''
        options.append(
            f'<option value="{v["id"]}"{selected}>{v["size"]}</option>'
        )
    return (
        '<select class="w-full appearance-none rounded-lg border border-foreground/20 '
        'bg-foreground/5 py-2.5 pl-3 pr-9 text-sm font-medium outline-none '
        'focus:border-foreground" id="cadense-size-select">'
        + ''.join(options)
        + '</select>'
    )


def main():
    data = json.loads(VARIANTS.read_text())
    out = SRC.read_text()

    # Nombre producto
    replacements = [
        ('Lokal Big | Blanco Camuflado', 'Cadense'),
        ('Lokal Big | Negro Morado', 'Cadense'),
        ('Lokal Big | Blanco', 'Cadense'),
        ('Lokal Big | Negro', 'Cadense'),
        ('Lokal Big | Rojo', 'Cadense'),
        ('Lokal Big', 'Cadense'),
    ]
    for a, b in replacements:
        out = out.replace(a, b)

    # Precios (orden importa)
    out = out.replace('$119,000', '$130,000')
    out = out.replace('$420,000', '$400,000')
    out = out.replace('$149,000', '$130,000')
    out = out.replace('-<!-- -->$61,000', '-<!-- -->$70,000')
    out = out.replace('-$61,000', '-$70,000')
    out = out.replace('$210,000', '$200,000')
    out = out.replace('Cada par a $100,000!', 'Cada par a $120,000!')
    out = re.sub(
        r'(2 pares</p>[\s\S]*?<p class="font-semibold">)\$200,000',
        r'\1$240,000',
        out,
    )

    # Precios numéricos embebidos (island JSON)
    out = out.replace(',149000,', ',130000,')
    out = out.replace(',210000,', ',200000,')
    out = out.replace('[0,149000]', '[0,130000]')
    out = out.replace('[0,210000]', '[0,200000]')

    # Imágenes Lokal → Cadense
    lokal_imgs = sorted(
        set(re.findall(r'https://cdn\.shopify\.com/s/files/1/0948/6296/7074/files/s2_lb_[^"\'&\s]+', out))
    )
    for i, old in enumerate(lokal_imgs):
        new = IMAGES[i % len(IMAGES)]
        out = out.replace(old, new)
        # también sin query
        base = old.split('?')[0]
        out = out.replace(base, new)

    # Reemplazar paths s2_lb en URLs encoded
    out = re.sub(
        r'https://cdn\.shopify\.com/s/files/1/0948/6296/7074/files/s2_lb_[a-z0-9_]+\.png[^"\'&]*',
        MAIN_IMG,
        out,
    )

    # Select de tallas
    select_pattern = re.compile(
        r'<select class="w-full appearance-none rounded-lg border border-foreground/20 '
        r'bg-foreground/5 py-2\.5 pl-3 pr-9 text-sm font-medium outline-none '
        r'focus:border-foreground">.*?</select>',
        re.S,
    )
    new_select = build_size_select(data)
    out, n = select_pattern.subn(new_select, out, count=1)
    if n == 0:
        # fallback: reemplazar options dentro del select existente
        opt_pattern = re.compile(
            r'(<select[^>]*focus:border-foreground"[^>]*>).*?(</select>)',
            re.S,
        )
        out = opt_pattern.sub(r'\1' + ''.join(
            f'<option value="{v["id"]}"{" selected" if v["size"]=="37" else ""}>{v["size"]}</option>'
            for v in sorted(
                [x for x in data['variants'] if x['color'] == 'Blanco'],
                key=lambda x: int(x['size']),
            )
        ) + r'\2', out, count=1)

    # Wrapper para configuración JS
    out = (
        '<div id="landing-root" data-landing="cadense" '
        'data-product-name="Cadense" '
        'data-package-1-total="$130,000" data-package-1-compare="$200,000" '
        'data-package-1-discount="$70,000" data-package-1-percent="35" '
        'data-package-2-total="$240,000" data-package-2-compare="$400,000" '
        'data-package-2-discount="$160,000" data-package-2-percent="40" '
        'data-default-total="$130,000">\n' + out + '\n</div>'
    )

    OUT.write_text(out)
    print(f'Written {OUT} ({len(out)} bytes)')


if __name__ == '__main__':
    main()
