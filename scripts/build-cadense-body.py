#!/usr/bin/env python3
"""Genera body-content-cadense.html desde la landing principal (JR_CADENSE / GAB)."""
import json
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'src/partials/body-content.html'
OUT = ROOT / 'src/partials/body-content-cadense.html'
VARIANTS = ROOT / 'src/data/cadense-variants.json'
PRODUCT_URL = 'https://www.gabshoes.com/products/jr_cadense.js'

# Colores e imágenes del producto GAB (orden: Blanco, Gris, Negro, Azul)
COLORS = [
    {'name': 'Blanco', 'file': 'Gemini_Generated_Image_ukfcmkukfcmkukfc_1200x1200.png'},
    {'name': 'Gris', 'file': 'Gemini_Generated_Image_h8so07h8so07h8so_1.png'},
    {'name': 'Negro', 'file': 'Gemini_Generated_Image_cken4zcken4zcken_1200x1200.png'},
    {'name': 'Azul', 'file': 'Gemini_Generated_Image_hh26bhhh26bhhh26_1200x1200.png'},
]

OLD_COLOR_NAMES = [
    'Blanco Camuflado',
    'Negro Morado',
    'Negro Blanco',
    'Rojo',
]

IMG_BASE = '/images/cadense'
CHECK_OVERLAY = (
    '<div class="absolute left-0 top-0 grid h-full w-full place-content-center bg-black/40">'
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" '
    'fill="currentColor" class="remixicon size-8 text-white">'
    '<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path>'
    '</svg></div>'
)


def img_path(filename: str) -> str:
    return f'{IMG_BASE}/{filename}'


def gallery_images() -> list[str]:
    return [img_path(c['file']) for c in COLORS]


def build_color_slide(color: dict, selected: bool = False) -> str:
    overlay = CHECK_OVERLAY if selected else ''
    return (
        f'<div class="swiper-slide w-28! relative cursor-pointer overflow-hidden rounded-lg">'
        f'<img src="{img_path(color["file"])}" alt="{color["name"]}" loading="lazy" '
        f'class="aspect-square h-full w-full object-cover" width="120" height="120"/>'
        f'{overlay}</div>'
    )


def build_color_swiper() -> str:
    slides = [build_color_slide(c, i == 0) for i, c in enumerate(COLORS)]
    inner = ''.join(slides)
    return (
        '<div class="overflow-hidden gutter-sm mb-7 md:px-8!">'
        '<div class="swiper overflow-visible!"><div class="swiper-wrapper">'
        + inner
        + '</div></div></div>'
    )


def build_size_select(variants_data: dict) -> str:
    blanco = [v for v in variants_data['variants'] if v['color'] == 'Blanco']
    blanco.sort(key=lambda x: int(x['size']))
    options = []
    for v in blanco:
        selected = ' selected=""' if v['size'] == '37' else ''
        options.append(f'<option value="{v["id"]}"{selected}>{v["size"]}</option>')
    return (
        '<select class="w-full appearance-none rounded-lg border border-foreground/20 '
        'bg-foreground/5 py-2.5 pl-3 pr-9 text-sm font-medium outline-none '
        'focus:border-foreground" id="cadense-size-select">'
        + ''.join(options)
        + '</select>'
    )


def fetch_variants() -> dict:
    """Actualiza variantes desde GAB si hay red."""
    try:
        raw = urllib.request.urlopen(PRODUCT_URL, timeout=15).read().decode()
        product = json.loads(raw)
        variants = []
        for v in product['variants']:
            color, size = v['option1'], v['option2']
            variants.append({
                'id': v['id'],
                'title': v['title'],
                'color': color,
                'size': size,
            })
        colors = sorted({v['color'] for v in variants})
        sizes = sorted({v['size'] for v in variants}, key=int)
        data = {'variants': variants, 'colors': colors, 'sizes': sizes}
        VARIANTS.write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n')
        return data
    except Exception as e:
        print(f'Warning: could not fetch product JSON ({e}), using local variants')
        return json.loads(VARIANTS.read_text())


def replace_color_swiper(html: str) -> str:
    pattern = re.compile(
        r'<div class="overflow-hidden gutter-sm mb-7 md:px-8!">'
        r'<div class="swiper overflow-visible!"><div class="swiper-wrapper">'
        r'.*?'
        r'</div></div></div>',
        re.S,
    )
    return pattern.sub(build_color_swiper(), html, count=1)


def replace_color_names_in_props(html: str) -> str:
    """Renombra colores antiguos de Lokal → colores GAB en props serializados."""
    mapping = {
        'Blanco Camuflado': 'Gris',
        'Negro Morado': 'Negro',
        'Negro Blanco': 'Azul',
    }
    for old, new in mapping.items():
        html = html.replace(f'colorName&quot;:[0,&quot;{old}&quot;]', f'colorName&quot;:[0,&quot;{new}&quot;]')
        html = html.replace(f'alt="{old}"', f'alt="{new}"')

    # Eliminar quinto color (Rojo) del array colors en props
    rojo_start = html.find(
        ',[0,{&quot;id&quot;:[0,&quot;gid://shopify/Product/9942651928866'
    )
    marker = ']]],&quot;extraTiktokPixels&quot;'
    if rojo_start != -1:
        rojo_end = html.find(marker, rojo_start)
        if rojo_end != -1:
            html = html[:rojo_start] + html[rojo_end:]

    # Corregir imágenes por color en props
    img_by_color = {c['name']: img_path(c['file']) for c in COLORS}
    for color_name, path in img_by_color.items():
        # featuredImage e imageUrl para cada colorName
        parts = path.split('/')
        filename = parts[-1]
        html = re.sub(
            rf'(colorName&quot;:\[0,&quot;{re.escape(color_name)}&quot;\][\s\S]*?'
            rf'featuredImage&quot;:\[0,&quot;)[^&]+',
            rf'\1{path}',
            html,
            count=1,
        )

    return html


def fix_image_urls(html: str) -> str:
    """Normaliza rutas locales y reemplaza imágenes Lokal/GAB."""
    html = re.sub(r'(&amp;quality=70&amp;format=webp)', '', html)
    html = re.sub(r'(\?width=900&amp;quality=70&amp;format=webp)', '', html)

    gallery = gallery_images()
    # Reemplazar URLs shopify Lokal por imágenes locales
    lokal_imgs = sorted(
        set(re.findall(
            r'https://cdn\.shopify\.com/s/files/1/0948/6296/7074/files/s2_lb_[^"\'&\s]+',
            html,
        ))
    )
    for i, old in enumerate(lokal_imgs):
        new = gallery[i % len(gallery)]
        html = html.replace(old, new)
        html = html.replace(old.split('?')[0], new)

    html = re.sub(
        r'https://cdn\.shopify\.com/s/files/1/0948/6296/7074/files/s2_lb_[a-z0-9_]+\.png[^"\'&]*',
        gallery[0],
        html,
    )

    # Reemplazar paths /images/cadense incorrectos por los del producto GAB
    wrong_files = [
        'Gemini_Generated_Image_h8so07h8so07h8so_1.png',
        'Gemini_Generated_Image_hh26bhhh26bhhh26_1200x1200.png',
        'Gemini_Generated_Image_cken4zcken4zcken_1200x1200.png',
        'Gemini_Generated_Image_ukfcmkukfcmkukfc_1200x1200.png',
        'CADENCE.jpg',
    ]
    # No hacer replace global ciego; el swiper ya tiene las rutas correctas

    return html


def replace_gallery_images(html: str) -> str:
    """Asegura que la galería principal muestre las 4 imágenes del producto."""
    gallery = gallery_images()
    # Reemplazar secuencia de swiper-slide en galería móvil (primer bloque de imágenes grandes)
    slide_pattern = re.compile(
        r'(<div class="swiper-slide flex! w-full items-center justify-center overflow-hidden rounded-lg">'
        r'<img[^>]+src=")[^"]+("[^>]+>)',
        re.S,
    )
    slides_found = slide_pattern.findall(html)
    if len(slides_found) >= 4:
        def replacer(match, _counter=[0]):
            idx = _counter[0] % 4
            _counter[0] += 1
            if _counter[0] <= 4:
                return f'{match.group(1)}{gallery[idx - 1]}{match.group(2)}'
            return match.group(0)
        # Solo primeras 4 ocurrencias en galería principal
        count = 0
        def limited_repl(m):
            nonlocal count
            if count < 4:
                src = gallery[count]
                count += 1
                return f'{m.group(1)}{src}{m.group(2)}'
            return m.group(0)
        # Aplicar solo al primer swiper de producto (después del título Cadense)
        parts = html.split('<div class="swiper md:hidden! h-full w-full gutter-sm!">', 1)
        if len(parts) == 2:
            rest = parts[1]
            end = rest.find('</div></div><div class="hidden grid-cols-1')
            if end > 0:
                gallery_block = rest[:end]
                other = rest[end:]
                gallery_block = slide_pattern.sub(limited_repl, gallery_block)
                html = parts[0] + '<div class="swiper md:hidden! h-full w-full gutter-sm!">' + gallery_block + other
    return html


def main():
    data = fetch_variants()
    out = SRC.read_text()

    # Nombre producto
    replacements = [
        ('Lokal Big | Blanco Camuflado', 'JR_CADENSE'),
        ('Lokal Big | Negro Morado', 'JR_CADENSE'),
        ('Lokal Big | Blanco', 'JR_CADENSE'),
        ('Lokal Big | Negro', 'JR_CADENSE'),
        ('Lokal Big | Rojo', 'JR_CADENSE'),
        ('Lokal Big', 'JR_CADENSE'),
        ('Cadense', 'JR_CADENSE'),
    ]
    for a, b in replacements:
        out = out.replace(a, b)

    # Precios GAB: $130.000 / $200.000 (35% off)
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
    out = out.replace(',149000,', ',130000,')
    out = out.replace(',210000,', ',200000,')
    out = out.replace('[0,149000]', '[0,130000]')
    out = out.replace('[0,210000]', '[0,200000]')
    out = out.replace('30<!-- -->% OFF', '35<!-- -->% OFF')

    out = fix_image_urls(out)
    out = replace_color_swiper(out)
    out = replace_color_names_in_props(out)
    out = replace_gallery_images(out)

    # Select de tallas con IDs GAB
    select_pattern = re.compile(
        r'<select class="w-full appearance-none rounded-lg border border-foreground/20 '
        r'bg-foreground/5 py-2\.5 pl-3 pr-9 text-sm font-medium outline-none '
        r'focus:border-foreground"[^>]*>.*?</select>',
        re.S,
    )
    new_select = build_size_select(data)
    out, n = select_pattern.subn(new_select, out, count=1)

    # Wrapper landing
    out = (
        '<div id="landing-root" data-landing="cadense" '
        'data-product-name="JR_CADENSE" '
        'data-package-1-total="$130,000" data-package-1-compare="$200,000" '
        'data-package-1-discount="$70,000" data-package-1-percent="35" '
        'data-package-2-total="$240,000" data-package-2-compare="$400,000" '
        'data-package-2-discount="$160,000" data-package-2-percent="40" '
        'data-default-total="$130,000">\n' + out + '\n</div>'
    )

    OUT.write_text(out)
    print(f'Written {OUT} ({len(out)} bytes)')
    print('Colors:', [c['name'] for c in COLORS])


if __name__ == '__main__':
    main()
