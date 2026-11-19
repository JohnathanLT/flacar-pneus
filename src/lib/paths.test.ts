import {afterEach,expect,it,vi} from 'vitest';
afterEach(()=>{vi.unstubAllEnvs();vi.resetModules();});
it('preserva URLs externas e aplica subpasta uma única vez',async()=>{
 vi.stubEnv('NEXT_PUBLIC_BASE_PATH','/flacar-pneus');vi.resetModules();
 const {localPath}=await import('./paths');
 expect(localPath('/pneus/?categoria=vans')).toBe('/flacar-pneus/pneus/?categoria=vans');
 expect(localPath('/produtos/pneu-1.webp')).toBe('/flacar-pneus/produtos/pneu-1.webp');
 expect(localPath('/flacar-pneus/guia/')).toBe('/flacar-pneus/guia/');
 expect(localPath('https://wa.me/5562991476407')).toBe('https://wa.me/5562991476407');
 expect(localPath('#contato')).toBe('#contato');
});
it('mantém caminhos normais quando hospedado na raiz',async()=>{
 vi.stubEnv('NEXT_PUBLIC_BASE_PATH','');vi.resetModules();
 const {localPath}=await import('./paths');expect(localPath('/pneus/')).toBe('/pneus/');
});
