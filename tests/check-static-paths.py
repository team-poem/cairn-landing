"""실제 정적 산출물의 HTML/CSS 참조가 배포 위치에 존재하는지 확인한다."""
from html.parser import HTMLParser
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urljoin, urlsplit

root = Path(sys.argv[1]).resolve()
prefix = sys.argv[2] if len(sys.argv) > 2 else ''
page = root / prefix.lstrip('/') / 'index.html'
errors = []
checked = set()


def check(url, context):
    if not url or url.startswith(('#', 'data:', 'blob:', 'mailto:', 'tel:')):
        return
    parts = urlsplit(url)
    if parts.scheme or parts.netloc:
        return
    resolved = unquote(urlsplit(urljoin(context, url)).path)
    if prefix and not resolved.startswith(prefix + '/'):
        errors.append(f'접두사 누락: {context} -> {url}')
    target = root / resolved.lstrip('/')
    if target.is_dir():
        target /= 'index.html'
    if not target.is_file():
        errors.append(f'없는 파일: {context} -> {url}')
    checked.add(resolved)


class References(HTMLParser):
    def __init__(self, context):
        super().__init__()
        self.context = context

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ('script', 'img', 'source', 'video', 'audio', 'iframe'):
            check(attrs.get('src'), self.context)
        if tag == 'link' and attrs.get('rel') != 'canonical':
            check(attrs.get('href'), self.context)


if not page.is_file():
    raise SystemExit(f'정적 HTML 없음: {page}')
for html in page.parent.rglob('*.html'):
    References('/' + html.relative_to(root).as_posix()).feed(html.read_text())
for css in root.rglob('*.css'):
    context = '/' + css.relative_to(root).as_posix()
    for quote, url in re.findall(r'url\(\s*([\'\"]?)(.*?)\1\s*\)', css.read_text()):
        check(url, context)
for required in ('index.rsc', '404.html'):
    if not (page.parent / required).is_file():
        errors.append(f'정적 산출물 없음: {required}')
if prefix:
    redirect = (root / 'index.html').read_text()
    if "location.replace('/cairn-engine/' + location.search + location.hash)" not in redirect:
        errors.append('기존 루트 주소의 쿼리·해시 보존 리다이렉트 없음')
    if not re.fullmatch(r'[0-9a-f]{40}\n', (page.parent / 'source-sha.txt').read_text()):
        errors.append('배포 커밋 표시가 잘못됨')
if errors:
    raise SystemExit('\n'.join(sorted(set(errors))))
print(f'정적 페이지와 {len(checked)}개 에셋 참조 정상: {prefix or "/"}')
