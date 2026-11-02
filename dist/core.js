export const samples={
lamp:{name:'竹编夜灯',material:'竹编、木质底座',size:'高 22 cm',facts:'手工竹编；暖色灯光；USB 供电',copy:'东方神秘力量，治愈你的失眠，送礼倍有面儿。',asset:'lamp',en:{title:'A little warmth, woven by hand.',name:'Handwoven Bamboo Lamp',material:'Bamboo weave, wooden base',facts:['Handwoven bamboo shade','Warm-toned light','USB powered'],body:'A handwoven bamboo lamp with a wooden base and warm-toned light. A small detail for your evening space.',back:'手工竹编灯罩搭配木质底座与暖色灯光，为晚间空间添一处细节。'},ja:{title:'手仕事の灯りを、日々のそばに。',name:'竹編みのナイトライト',material:'竹編み・木製ベース',facts:['手編みの竹製シェード','暖色の光','USB給電'],body:'手編みの竹製シェードと木製ベース。暖色の光が、いつもの空間にそっと寄り添います。',back:'手工竹编灯罩与木质底座，以暖色光陪伴日常空间。'}},
cup:{name:'山水陶瓷茶杯',material:'陶瓷',size:'容量 180 ml',facts:'山水纹样；附礼盒；单杯装',copy:'大师级山水茶杯，全球第一，买它就是有品位。',asset:'cup',en:{title:'A landscape in the palm of your hand.',name:'Landscape Ceramic Teacup',material:'Ceramic',facts:['Landscape motif','Gift box included','One cup per set'],body:'A ceramic teacup with a landscape motif, presented in a gift box. A thoughtful detail for your next tea break.',back:'带有山水纹样的陶瓷茶杯，配有礼盒，为下一次品茶增添一处细节。'},ja:{title:'手のひらに、小さな山水。',name:'山水柄の陶器カップ',material:'陶器',facts:['山水の模様','ギフトボックス付き','カップ単品'],body:'山水の模様をあしらった陶器のカップ。ギフトボックスに入れて、日々のお茶の時間に。',back:'山水图案的陶瓷茶杯，配有礼盒，可用于日常品茶。'}},
bag:{name:'城市漫游帆布袋',material:'棉帆布',size:'宽 35 cm × 高 40 cm',facts:'城市线稿印花；内置小口袋；可折叠',copy:'100%环保认证，背上它你就是全城最靓的仔。',asset:'bag',en:{title:'Take a little city with you.',name:'City Sketch Canvas Tote',material:'Cotton canvas',facts:['City line-art print','Inner pocket','Foldable design'],body:'A cotton canvas tote with a city sketch print and an inner pocket. Fold it away between your everyday outings.',back:'棉帆布袋带城市线稿印花和内袋，可折叠收纳，适合日常出行。'},ja:{title:'街の風景を、持ち歩く。',name:'街並みプリントのトートバッグ',material:'コットンキャンバス',facts:['街並みの線画プリント','内ポケット付き','折りたたみ可能'],body:'街並みの線画をプリントしたコットンキャンバスのバッグ。内ポケット付きで、使わないときは折りたためます。',back:'印有城市线稿的棉帆布袋，带内袋，不用时可以折叠。'}}};
const rules=[
{id:'health',re:/治愈|治疗|改善失眠|cure\w*|treat\w* insomnia|治療|不眠を改善/gi,label:'功效承诺需要证据',why:'产品事实不能直接支持医疗或治疗效果，建议删除功效承诺。'},
{id:'cert',re:/环保认证|认证|certified|certification|認証/gi,label:'认证信息待核实',why:'请提供可核验的认证信息；当前事实档案没有支持这项承诺。'},
{id:'shipping',re:/免费配送|免运费|包邮|free shipping|送料無料/gi,label:'新增配送承诺',why:'配送属于交易条件，应由商家确认后再发布。'},
{id:'rank',re:/全球第一|世界第一|全网第一|world.?s best|number one|世界一/gi,label:'排名与绝对化表达',why:'缺少排名范围、时间与证据，改成具体商品特点更清楚。'},
{id:'artisan',re:/大师级|大师亲制|master-crafted|master artisan/gi,label:'工艺身份缺少依据',why:'事实档案未提供制作者身份，不应自行添加大师称号。'},
{id:'idiom',re:/有面儿|最靓的仔|神秘力量/gi,label:'表达需要解释或改写',why:'这类表达依赖语境；可以改成礼物场景、使用场景或可见特点。'}
];
const negated=(text,index)=>/(?:无|未|不|没有|不含|并非|not\s+|no\s+|without\s+|not\s+yet\s+|未取得|なし)[^。；;.!?\n]{0,14}$/i.test(text.slice(Math.max(0,index-28),index));
export function audit(text,product,{source=false}={}){
 const facts=[product.name,product.material,product.size,product.facts].join('；');const out=[];
 for(const r of rules){r.re.lastIndex=0;const matches=[...text.matchAll(r.re)].filter(m=>!negated(text,m.index));if(!matches.length)continue;
 const supported=!source&&r.id!=='health'&&r.id!=='idiom'&&matches.every(m=>facts.toLowerCase().includes(m[0].toLowerCase())&&!negated(facts,facts.toLowerCase().indexOf(m[0].toLowerCase())));
 if(!supported)out.push({id:r.id,label:r.label,detail:`“${[...new Set(matches.map(m=>m[0]))].join('、')}” — ${r.why}`});}
 if(!source){const known=new Set(facts.match(/\d+(?:\.\d+)?/g)||[]);const added=[...new Set(text.match(/\d+(?:\.\d+)?/g)||[])].filter(n=>!known.has(n));if(added.length)out.push({id:'number',label:'数字与事实档案不一致',detail:`新增数字：${added.join('、')}。请核对尺寸、容量或数量；本规则未执行单位换算。`});}
 return out;
}
export function generate(p,lang='en',tone='warm'){
 const s=Object.values(samples).find(s=>['name','material','size','facts'].every(k=>p[k].trim()===s[k].trim()));
 if(s){const t=s[lang];const title=tone==='clean'?t.name:tone==='gift'?(lang==='en'?`A small gift: ${t.name}`:`小さな贈りもの：${t.name}`):t.title;return{title,body:t.body,bullets:[t.material,p.size,...t.facts],back:t.back,type:'策划示例',asset:s.asset};}
 const labels=lang==='en'?['Product','Material','Size','Confirmed details']:['商品','素材','サイズ','確認済みの特徴'];
 return{title:p.name,body:`${labels[0]}: ${p.name}. ${labels[1]}: ${p.material}. ${labels[2]}: ${p.size}.`,bullets:p.facts.split(/[；;\n]/).filter(Boolean),back:'这是规则生成的结构草稿：未知中文按原文保留，尚未进行机器翻译。正式本地化需人工翻译或接入模型。',type:'规则草稿 · 待翻译',asset:'custom'};
}
export function questions(p){const all=[p.facts,p.size].join(' ');const q=[];if(!/配送|运费|shipping/i.test(all))q.push('配送到我的地区需要多久，运费是多少？');if(!/退换|return/i.test(all))q.push('如果不合适，是否支持退换？');if(/灯/.test(p.name)&&!/适配器|电源线/.test(all))q.push('是否附带电源线或适配器？');if(/杯|袋/.test(p.name)&&!/清洗|水洗/.test(all))q.push('这件商品应该如何清洁和保养？');return q;}
