#!/usr/bin/env python3
"""Hide the phone status bar (clock, battery, signal, notification icons) at the
top of app screenshots so the marketing shots look clean.

It fills the top strip of each image with the app's own background colour,
sampled from the row just below the strip, so there's no visible seam - the
clock/battery simply disappear into the dark background.

Run on every NEW screenshot before wiring it into the site (and it's safe to
re-run on all of them - filling an already-clean strip is a no-op visually):

    python3 scripts/blackout-statusbar.py                 # all public/shots/*
    python3 scripts/blackout-statusbar.py public/shots/foo.jpg [more...]

For each base image it also processes the .webp and -sm.(jpg|webp) variants.
"""
import glob
import os
import sys
from statistics import median
from PIL import Image

STRIP_FRAC = 0.045  # top fraction of image height covered (status bar region)


def variants(path):
    base, _ = os.path.splitext(path)
    if base.endswith('-sm'):
        base = base[:-3]
    cands = [base + '.jpg', base + '.webp', base + '-sm.jpg', base + '-sm.webp']
    seen, out = set(), []
    for c in cands:
        if c not in seen and os.path.exists(c):
            seen.add(c)
            out.append(c)
    return out


def sample_bg(im, y):
    """Median colour across the central 70% of row y - robust to stray icons."""
    w, _ = im.size
    x0, x1 = int(w * 0.15), int(w * 0.85)
    px = im.load()
    rs, gs, bs = [], [], []
    for x in range(x0, x1, 2):
        r, g, b = px[x, y][:3]
        rs.append(r); gs.append(g); bs.append(b)
    return (int(median(rs)), int(median(gs)), int(median(bs)))


def process(path):
    im = Image.open(path).convert('RGB')
    w, h = im.size
    strip = round(h * STRIP_FRAC)
    bg = sample_bg(im, min(strip + 3, h - 1))
    Image.new('RGB', (w, strip), bg)  # noqa - clarity
    im.paste(bg, (0, 0, w, strip))
    ext = os.path.splitext(path)[1].lower()
    if ext == '.webp':
        im.save(path, 'WEBP', quality=80, method=6)
    else:
        im.save(path, 'JPEG', quality=82, optimize=True, progressive=True)
    return bg


def main(argv):
    if argv:
        targets = argv
    else:
        targets = [f for f in glob.glob('public/shots/*.jpg') if '-sm' not in f]
    done = set()
    for t in targets:
        for v in variants(t):
            if v in done:
                continue
            bg = process(v)
            done.add(v)
            print(f'{v}  filled top {STRIP_FRAC:.0%} with rgb{bg}')
    print(f'processed {len(done)} files')


if __name__ == '__main__':
    main(sys.argv[1:])
