"""Reproducibly render a crop-safe 1200 x 630 portfolio Open Graph image.
Requires Pillow. Run from repository root:
    python tools/generate-social-preview.py
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path
import math
W,H,S=1200,630,2
w,h=W*S,H*S
im=Image.new('RGBA',(w,h),(3,48,39,255))
background=ImageDraw.Draw(im,'RGBA')
for y in range(h):
    v=y/h
    background.line([(0,y),(w,y)],fill=(3,int(48+17*v),int(39+8*v),255),width=1)
glow=Image.new('RGBA',(w,h),(0,0,0,0))
gd=ImageDraw.Draw(glow,'RGBA')
gd.ellipse((int(w*.55),-h//3,int(w*1.13),int(h*.7)),fill=(47,125,64,48))
gd.ellipse((-w//3,int(h*.55),int(w*.45),int(h*1.4)),fill=(79,153,65,48))
im=Image.alpha_composite(im,glow.filter(ImageFilter.GaussianBlur(170)))
paint=Image.new('RGBA',(w,h),(0,0,0,0))
D=ImageDraw.Draw(paint,'RGBA')
def rect(a,**kwargs):
    D.rounded_rectangle(tuple(int(x*S) for x in a),**{k:(int(v*S) if k in ('radius','width') else v) for k,v in kwargs.items()})
def line(points,fill,width=1):
    D.line([(int(x*S),int(y*S)) for x,y in points],fill=fill,width=int(width*S),joint='curve')
for x in range(0,W+1,32):line([(x,0),(x,H)],(118,170,125,16))
for y in range(0,H+1,32):line([(0,y),(W,y)],(118,170,125,16))
for dx,dy in [(-135,-80),(-100,-45),(-65,-10)]:
    rect((dx,dy,305+dx,170+dy),radius=17,fill=(123,187,127,24),outline=(154,225,151,95),width=1)
for i,v in enumerate([44,71,61,92,125,101]):
    x=16+i*43
    rect((x,H-40-v,x+33,H-40),radius=3,fill=(66,198,128,62+12*i))
for i,v in enumerate([65,94,103,143,158,202,229]):
    x=920+i*43
    rect((x,228-v*.7,x+31,228),radius=4,fill=(67,181,92,28+i*6))
points=[(916,150),(963,126),(1007,136),(1050,94),(1082,97),(1120,69),(1175,17)]
line(points,(163,237,119,230),3)
for x,y in points:
    D.ellipse(((x-4)*S,(y-4)*S,(x+4)*S,(y+4)*S),fill=(204,248,157,255))
for offset,shade,thickness in [(3,(88,168,107,115),3),(35,(168,245,118,210),3),(72,(78,159,113,95),2)]:
    pts=[]
    for x in range(0,W+4,4):
        y=555+offset*.26+.00027*(x-320)**2-45*math.sin((x+210)/190)-offset*(x/W)*.28
        pts.append((x,y))
    line(pts,shade,thickness)
rect((301,107,899,550),radius=27,fill=(1,29,25,238),outline=(134,183,139,105),width=2)
rect((475,142,725,179),radius=18,fill=(26,84,62,248),outline=(167,231,151,105),width=1)
bold='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
regular='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def draw_text(value,y,size,colour,is_bold=True):
    font=ImageFont.truetype(bold if is_bold else regular,round(size*S))
    box=D.textbbox((0,0),value,font=font)
    D.text(((w-(box[2]-box[0]))//2,int(y*S)),value,font=font,fill=colour)
draw_text('TORONTO  /  PORTFOLIO',153,15,(205,243,167,255))
draw_text('JOEY',211,83,(252,255,249,255))
draw_text('OLIVARI',299,78,(252,255,249,255))
rect((529,403,671,409),radius=3,fill=(185,240,132,255))
draw_text('REPORTING & EXCEL',428,29,(198,244,150,255))
draw_text('Clean reports. Clear decisions.',479,21,(246,250,244,255),False)
output=Path('assets/social-portfolio-2026.jpg')
output.parent.mkdir(parents=True,exist_ok=True)
Image.alpha_composite(im,paint).convert('RGB').resize((W,H),Image.Resampling.LANCZOS).save(output,'JPEG',quality=87,optimize=True,progressive=True,subsampling=0)
print('Rendered',output,'bytes',output.stat().st_size,'dimensions',W,H)
