import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
const file=new URL('../src/components/sections/brand-motion.ts',import.meta.url);
const source=readFileSync(file,'utf8');
const require=createRequire(file);
const {outputText}=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}});
const compiledModule={exports:{}};
vm.runInNewContext(outputText,{require,module:compiledModule,exports:compiledModule.exports});
const {BRAND_GLYPHS,brandFrame}=compiledModule.exports;
assert.equal(BRAND_GLYPHS.length,20);
for(const glyph of BRAND_GLYPHS){
 for(const pose of ['contours','tile','orbit','poster','ribbon','fan','compact']){
  assert(glyph[pose].length>0,`Missing ${pose}`);
  for(const contour of glyph[pose]) for(const point of contour) assert(point.every(Number.isFinite),`Invalid ${pose} point`);
 }
}
for(let i=0;i<=100;i++){
 const frame=brandFrame(i/100);
 assert.equal(frame.paths.length,20);
 assert(frame.paths.every(path=>path.length>0&&!/NaN|undefined|Infinity/.test(path)));
}
assert.equal(JSON.stringify(brandFrame(0).paths),JSON.stringify(brandFrame(1).paths));
console.log('PASS: all animation stages for 20 final-logo objects and seamless loop boundary.');
