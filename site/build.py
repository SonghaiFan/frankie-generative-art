#!/usr/bin/env python3
"""Build an independent bilingual introduction using source metadata and real assets."""
import argparse, html, json, re, shutil
from pathlib import Path
H=html.escape

def source_samples(repo):
 result=[]
 for ident,filename in [('constructivism','constructivism.png'),('color_field','color-field.png'),('sublime','sublime.png')]:
  for path in (repo/'visual_styles').glob('*.ts'):
   match=re.search(r'id:\s*"'+ident+r'"(?P<fields>.*?)sketch:',path.read_text(),re.S)
   if match:
    fields=match['fields'];name=re.search(r'name:\s*("(?:[^"\\]|\\.)*")',fields)
    tags=re.search(r'styleTags:\s*(\[[^\]]*\])',fields)
    result.append({'id':ident,'name':json.loads(name[1]),'tags':json.loads(tags[1]),'image':filename});break
  else:raise ValueError('Missing style: '+ident)
 return result

def build(repo,out):
 cfg=json.loads((repo/'site/project.json').read_text());content=json.loads((repo/'site/content.json').read_text());samples=source_samples(repo)
 out.mkdir(parents=True,exist_ok=True);media=out/'media';media.mkdir(exist_ok=True)
 for name in ['style.css','demo.js']:shutil.copy(repo/'site'/name,out/name)
 for src,name in [('docs/readme/assets/frankie.svg','signature.svg'),('docs/readme/banner.png','banner.png'),('site/assets/archive-current.png','archive.png'),('site/assets/selection-current.png','selection.png')]+[('docs/readme/assets/'+s['image'],s['image']) for s in samples]:shutil.copy(repo/src,media/name)
 (out/'.nojekyll').touch()
 for lang,c in content.items():
  zh=lang=='zh';pre='../' if zh else './';dest=out/'zh' if zh else out;dest.mkdir(exist_ok=True)
  rows=lambda xs:''.join('<article><h3>'+H(a)+'</h3><p>'+H(b)+'</p></article>' for a,b in xs)
  controls=''.join(f'<button type="button" data-anchor="{s["id"]}" aria-pressed="false"><img src="{pre}media/{s["image"]}" alt="{H(s["name"])}" width="640" height="640" loading="lazy"><span>{H(s["name"])}</span></button>' for s in samples)
  gallery=''.join(f'<figure><a href="{pre}media/{name}"><img src="{pre}media/{name}" alt="{H(caption)}" width="1468" height="1247" loading="lazy"></a><figcaption>{H(caption)}</figcaption></figure>' for name,caption in zip(['archive.png','selection.png'],c['captions']))
  data=json.dumps({'samples':samples,'empty':c['demo_empty'],'selected':c['demo_selected']},ensure_ascii=False).replace('<','\u003c')
  page=f'''<!doctype html><html lang="{'zh-CN' if zh else 'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Frankie Generative Art | {'生成式艺术档案' if zh else 'Explore, reflect, create'}</title><meta name="description" content="{H(c['intro'])}"><meta name="theme-color" content="#080808"><link rel="canonical" href="{cfg['pages_url']+('zh/' if zh else '')}"><link rel="alternate" hreflang="en" href="{cfg['pages_url']}"><link rel="alternate" hreflang="zh-CN" href="{cfg['pages_url']}zh/"><meta property="og:type" content="website"><meta property="og:title" content="Frankie Generative Art"><meta property="og:description" content="{H(c['intro'])}"><meta property="og:url" content="{cfg['pages_url']+('zh/' if zh else '')}"><meta property="og:image" content="{cfg['pages_url']}media/banner.png"><link rel="stylesheet" href="{pre}style.css"></head><body><a class="skip" href="#main">{'跳至内容' if zh else 'Skip to content'}</a>
<header class="shell"><a class="brand" href="{pre}"><span>Frankie</span> Art Archive</a><nav aria-label="{'页面导航' if zh else 'Page navigation'}"><a href="#process">{c['nav'][0]}</a><a href="#anchors">{c['nav'][1]}</a><a href="#screens">{c['nav'][2]}</a><a href="{pre}" lang="en" {'aria-current="page"' if not zh else ''}>EN</a><a href="{pre}zh/" lang="zh-CN" {'aria-current="page"' if zh else ''}>中文</a></nav></header>
<main id="main" class="shell"><section class="hero"><div><h1>{H(c['headline']).replace(chr(10),'<br>')}</h1><p class="lead">{H(c['intro'])}</p><a class="button" href="{cfg['app_url']}">{H(c['open'])} ↗</a></div><figure><img src="{pre}media/selection.png" alt="{H(c['hero_caption'])}" width="1468" height="1247" fetchpriority="high"><figcaption>{H(c['hero_caption'])}</figcaption></figure></section>
<section id="process" class="section"><h2>{H(c['concept_title'])}</h2><p class="lead narrow">{H(c['concept'])}</p><div class="features">{rows(c['features'])}</div></section>
<section id="anchors" class="section"><h2>{H(c['demo_title'])}</h2><p class="narrow">{H(c['demo_intro'])}</p><div class="anchor-grid">{controls}</div><div class="selection-bar"><p id="selection-status" aria-live="polite">{H(c['demo_empty'])}</p><button id="clear" type="button">{H(c['demo_clear'])}</button></div><p class="small narrow">{H(c['demo_note'])}</p><noscript><p>{'选择演示需要 JavaScript；完整应用入口位于页面顶部。' if zh else 'Enable JavaScript for the selection demo. The full app is linked above.'}</p></noscript></section>
<section class="section code"><div><h2>{H(c['code_title'])}</h2><p>{H(c['code_text'])}</p><p class="small">{H(c['code_note'])}</p><a href="https://p5js.org/reference/p5/draw/">{'p5.js 官方 draw() 参考' if zh else 'p5.js draw() reference'} ↗</a></div><figure class="art-study"><img src="{pre}media/constructivism.png" alt="{'项目实际 Constructivism 绘图的静态画面' if zh else 'A still from the project’s actual Constructivism sketch'}" width="640" height="640" loading="lazy"><figcaption>{'项目内置绘图程序的画面，不是 AI 生成结果。' if zh else 'A built-in project sketch, not an AI-generated result.'}</figcaption></figure></section>
<section id="use" class="section"><h2>{H(c['workflow_title'])}</h2><ol class="steps">{''.join('<li><h3>'+H(a)+'</h3><p>'+H(b)+'</p></li>' for a,b in c['steps'])}</ol></section>
<section id="screens" class="section"><h2>{H(c['gallery_title'])}</h2><div class="gallery">{gallery}</div></section>
<section id="start" class="section"><h2>{H(c['start_title'])}</h2><p class="lead narrow">{H(c['runtime'])}</p><div class="limits">{rows(c['limits'])}</div><details><summary>{H(c['local'])}</summary><pre><code>npm ci\nnpm run dev</code></pre><p>{H(c['local_note'])}</p></details><p><a href="https://github.com/{cfg['repository']}/blob/{cfg['branch']}/site/GUIDE.md">{H(c['guide'])} ↗</a></p></section></main>
<footer class="shell"><a href="https://github.com/SonghaiFan"><img src="{pre}media/signature.svg" width="100" height="38" alt="Frankie"></a><span>{H(c['footer'])}</span><a href="https://github.com/{cfg['repository']}">{H(c['source'])} ↗</a></footer><script id="anchor-data" type="application/json">{data}</script><script src="{pre}demo.js" defer></script></body></html>'''
  (dest/'index.html').write_text(page)
 print(out)
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--out',default='_site');a=ap.parse_args();build(Path(__file__).resolve().parents[1],Path(a.out).resolve())
