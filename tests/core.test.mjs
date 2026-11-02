import test from'node:test';import assert from'node:assert/strict';import{samples,generate,audit,questions}from'../dist/core.js';
test('全部案例的六种语言风格组合保留规格且没有规则风险',()=>{for(const s of Object.values(samples))for(const lang of['en','ja'])for(const tone of['warm','clean','gift']){const r=generate(s,lang,tone);assert.equal(r.type,'策划示例');assert.ok(r.bullets.includes(s.size));assert.deepEqual(audit([r.title,r.body,...r.bullets].join(' '),s),[]);}});
test('修改事实不会继续冒用预置翻译',()=>{assert.match(generate({...samples.lamp,size:'高 50 cm'}).type,/规则/);assert.ok(generate({...samples.lamp,size:'高 50 cm'}).body.includes('50'));});
test('捕获认证、配送、医疗及尺寸差异',()=>{assert.deepEqual(audit('Certified. Free shipping. 99 cm. Cures insomnia.',samples.lamp).map(x=>x.id),['health','cert','shipping','number']);});
test('忽略紧邻的常见否定表达',()=>{assert.deepEqual(audit('not certified; no free shipping; 不治愈失眠',samples.lamp),[]);});
test('有明确依据的配送不重复标为新增',()=>{assert.deepEqual(audit('free shipping',{...samples.lamp,facts:'free shipping'}),[]);});
test('不将原始宣传语作为事实来源',()=>{assert.ok(audit('治愈失眠',samples.lamp).some(x=>x.id==='health'));});
test('追问来自事实缺口',()=>{assert.ok(questions(samples.lamp).some(x=>x.includes('适配器')));});
