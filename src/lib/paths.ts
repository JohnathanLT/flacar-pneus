// GitHub Pages publica projetos em /nome-do-repositorio; outros hosts usam a raiz.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export function localPath(path: string): string {
  if (!basePath || !path.startsWith('/') || path.startsWith('//') || path === basePath || path.startsWith(basePath + '/')) return path;
  return basePath + path;
}
