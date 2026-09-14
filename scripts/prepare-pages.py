"""/cairn-engine 빌드를 조직 Pages 루트에 맞춰 포장한다."""
import os
from pathlib import Path
import re
import shutil

source = Path('dist/client')
output = Path('dist/pages')
prefix = 'cairn-engine'
sha = os.environ.get('SOURCE_SHA', '')
if not re.fullmatch(r'[0-9a-f]{40}', sha):
    raise SystemExit('SOURCE_SHA에 배포할 40자리 커밋 SHA가 필요합니다.')
for name in ('index.html', 'index.rsc', '404.html'):
    if not (source / name).is_file():
        raise SystemExit(f'정적 페이지가 없습니다: {name}')
if not (source / prefix / '_next/static').is_dir():
    raise SystemExit('NEXT_PUBLIC_BASE_PATH=/cairn-engine으로 먼저 빌드하세요.')
if output.exists():
    shutil.rmtree(output)
output.mkdir(parents=True)
# Vinext가 접두사를 붙인 번들과 루트에 복사한 public 파일을 합친다.
shutil.copytree(source / prefix, output / prefix)
for item in source.iterdir():
    if item.name == prefix:
        continue
    target = output / prefix / item.name
    if item.is_dir():
        shutil.copytree(item, target)
    else:
        shutil.copy2(item, target)
(output / prefix / 'source-sha.txt').write_text(sha + '\n')
(output / '.nojekyll').touch()
(output / 'index.html').write_text('''<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cairn · Poem</title>
<link rel="canonical" href="https://team-poem.github.io/cairn-engine/">
<script>location.replace('/cairn-engine/' + location.search + location.hash);</script>
<noscript><meta http-equiv="refresh" content="0;url=/cairn-engine/"></noscript>
</head><body><a href="/cairn-engine/">Continue to Cairn</a></body></html>
''')
(output / '404.html').write_text('''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Page not found · Cairn</title></head>
<body><h1>Page not found</h1><a href="/cairn-engine/">Go to Cairn</a></body></html>
''')
print(f'Pages 산출물: {output}/{prefix}/ (source {sha})')
