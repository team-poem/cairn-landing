"""실제 export HTML·Pages 패키지의 검색 계약을 검사한다 (외부 라이브러리 없음)."""
import json
from html.parser import HTMLParser
from pathlib import Path
import sys
from urllib.robotparser import RobotFileParser
import xml.etree.ElementTree as ET

root = Path(sys.argv[1])
prefix = sys.argv[2] if len(sys.argv) > 2 else ''
site = root / prefix.lstrip('/')
base = 'https://team-poem.github.io/cairn-engine/'
urls = {'en': base, 'ko': base + 'ko/'}
guide_urls = {'en': base + 'agentic-testing/', 'ko': base + 'ko/agentic-testing/'}


class Document(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.lang = None
        self.meta = {}
        self.links = []
        self.anchors = []
        self.graphs = []
        self.visible = []
        self.h1 = 0
        self.in_title = False
        self.title = ''
        self.hidden = 0
        self.script_type = None
        self.script = ''
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'html':
            self.lang = attrs.get('lang')
        if tag == 'meta':
            self.meta[attrs.get('name', attrs.get('property'))] = attrs.get('content')
        if tag == 'link':
            self.links.append(attrs)
        if tag == 'a':
            self.anchors.append(attrs)
        if tag == 'title':
            self.in_title = True
        if tag == 'h1':
            self.h1 += 1
        if tag in ('script', 'style'):
            self.hidden += 1
        if tag == 'script':
            self.script_type = attrs.get('type')
            self.script = ''

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        if tag == 'script':
            if self.script_type == 'application/ld+json':
                self.graphs.append(json.loads(self.script))
            self.script_type = None
        if tag in ('script', 'style'):
            self.hidden -= 1

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.script_type == 'application/ld+json':
            self.script += data
        if not self.hidden:
            self.visible.append(data)


def require(condition, message):
    if not condition:
        raise SystemExit(message)


for lang, filename in [('en', 'index.html'), ('ko', 'ko/index.html' if prefix else 'ko.html')]:
    path = site / filename
    require(path.is_file(), f'{lang} 정적 HTML 누락: {path}')
    doc = Document(path.read_text())
    require(doc.lang == lang, f'{lang}: html lang 불일치')
    require(doc.title == doc.meta.get('og:title') == doc.meta.get('twitter:title'), f'{lang}: 제목 불일치')
    require(('에이전틱 테스팅' if lang == 'ko' else 'agentic testing') in doc.title, f'{lang}: 제목 현지화 누락')
    require(doc.h1 == 1, f'{lang}: h1은 하나여야 합니다')
    canonical = [link['href'] for link in doc.links if link.get('rel') == 'canonical']
    require(canonical == [urls[lang]], f'{lang}: canonical 불일치 {canonical}')
    alternates = {link.get('hreflang'): link.get('href') for link in doc.links if link.get('rel') == 'alternate'}
    require(alternates == {**urls, 'x-default': urls['en']}, f'{lang}: hreflang 불일치')
    require(doc.meta.get('og:url') == urls[lang], f'{lang}: OG URL 불일치')
    require(doc.meta.get('og:locale') == ('ko_KR' if lang == 'ko' else 'en_US'), f'{lang}: OG 언어 불일치')
    require(doc.meta.get('description') == doc.meta.get('og:description') == doc.meta.get('twitter:description'), f'{lang}: 설명 불일치')
    require(bool(doc.meta.get('google-site-verification')), f'{lang}: 소유권 태그 누락')
    for key in ('robots', 'googlebot'):
        require('noindex' not in doc.meta.get(key, ''), f'{lang}: 색인 금지')
    text = ' '.join(doc.visible)
    phrase = '테스트 케이스를 설명하면' if lang == 'ko' else 'Find a path.'
    require(phrase in text, f'{lang}: JS 실행 전 본문 없음')
    language_links = {a.get('hreflang'): a.get('href') for a in doc.anchors if a.get('hreflang')}
    require(language_links == {'en': prefix + '/', 'ko': prefix + '/ko/'}, f'{lang}: 언어 전환 크롤링 링크 누락')
    require(len(doc.graphs) == 1, f'{lang}: JSON-LD 누락/중복')
    graph = doc.graphs[0]
    require(graph.get('@context') == 'https://schema.org', f'{lang}: schema context 오류')
    entities = {node['@type']: node for node in graph['@graph']}
    require({'Organization', 'WebSite', 'WebPage', 'SoftwareApplication', 'HowTo'} <= entities.keys(), f'{lang}: 엔티티 누락')
    webpage = entities['WebPage']
    require(webpage['url'] == urls[lang] and webpage['inLanguage'] == lang, f'{lang}: WebPage 불일치')
    require(entities['HowTo']['inLanguage'] == lang, f'{lang}: HowTo 언어 불일치')
    require(len(entities['HowTo']['step']) == 4, f'{lang}: 경로 흐름 누락')
    require(entities['SoftwareApplication']['description'] in text, f'{lang}: 구조화 설명과 본문 불일치')
    require('speakable' not in webpage, f'{lang}: 뉴스용 speakable 제거 필요')
    image = doc.meta.get('og:image', '')
    require(image.startswith(base) and (site / image.removeprefix(base)).is_file(), f'{lang}: OG 이미지 누락')

for lang, route in [('en', 'agentic-testing'), ('ko', 'ko/agentic-testing')]:
    path = site / (route + '/index.html' if prefix else route + '.html')
    require(path.is_file(), f'{lang}: 안내 정적 HTML 누락 {path}')
    doc = Document(path.read_text())
    text = ' '.join(doc.visible)
    require(doc.lang == lang and doc.h1 == 1, f'{lang}: 안내 언어·제목 오류')
    require(doc.title == doc.meta.get('og:title') == doc.meta.get('twitter:title'), f'{lang}: 안내 제목 불일치')
    require(doc.meta.get('description') == doc.meta.get('og:description') == doc.meta.get('twitter:description'), f'{lang}: 안내 설명 불일치')
    require([link['href'] for link in doc.links if link.get('rel') == 'canonical'] == [guide_urls[lang]], f'{lang}: 안내 canonical 오류')
    require({link.get('hreflang'): link.get('href') for link in doc.links if link.get('rel') == 'alternate'} == {**guide_urls, 'x-default': guide_urls['en']}, f'{lang}: 안내 hreflang 오류')
    require(doc.meta.get('og:url') == guide_urls[lang], f'{lang}: 안내 OG URL 오류')
    require(len(doc.graphs) == 1, f'{lang}: 안내 JSON-LD 누락·중복')
    entities = {node['@type']: node for node in doc.graphs[0]['@graph']}
    require({'WebPage', 'TechArticle', 'FAQPage', 'BreadcrumbList'} <= entities.keys(), f'{lang}: 안내 엔티티 누락')
    require(entities['WebPage']['url'] == guide_urls[lang], f'{lang}: 안내 WebPage가 랜딩 주소를 가리킴')
    for question in entities['FAQPage']['mainEntity']:
        require(question['name'] in text and question['acceptedAnswer']['text'] in text, f'{lang}: 화면에 없는 FAQ 구조화 데이터')
    require('appContext' in text and 'maxModelCalls' in text and '2.9.2' in text, f'{lang}: 검증 범위·기능 본문 누락')
    home = Document((site / ('index.html' if lang == 'en' else ('ko/index.html' if prefix else 'ko.html'))).read_text())
    require(any(a.get('href') == prefix + '/' + route + '/' for a in home.anchors), f'{lang}: 랜딩에서 안내로 가는 링크 누락')

ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'x': 'http://www.w3.org/1999/xhtml'}
entries = ET.parse(site / 'sitemap.xml').getroot().findall('s:url', ns)
require({e.findtext('s:loc', namespaces=ns) for e in entries} == set(urls.values()) | set(guide_urls.values()), '사이트맵 canonical 불일치')
for entry in entries:
    alternate = {link.attrib['hreflang']: link.attrib['href'] for link in entry.findall('x:link', ns)}
    group = guide_urls if entry.findtext('s:loc', namespaces=ns) in guide_urls.values() else urls
    require(alternate == {**group, 'x-default': group['en']}, '사이트맵 hreflang 불일치')
robots_path = root / 'robots.txt'
require(robots_path.is_file(), '루트 robots.txt 누락')
robots = RobotFileParser()
robots.parse(robots_path.read_text().splitlines())
require(base + 'sitemap.xml' in (robots.site_maps() or []), 'robots sitemap 선언 누락')
for agent in ('Googlebot', 'bingbot', 'OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot'):
    require(all(robots.can_fetch(agent, url) for url in [*urls.values(), *guide_urls.values()]), f'{agent}: 접근 차단')
require(urls['ko'] in (site / 'llms.txt').read_text(), 'llms 한국어 주소 불일치')
print('SEO 검증 통과: EN/KO 랜딩·안내 정적 본문·FAQ 일치, canonical, hreflang, OG, JSON-LD, sitemap, robots, llms')
