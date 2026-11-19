import type {AnchorHTMLAttributes, ImgHTMLAttributes} from 'react';
import {localPath} from '@/lib/paths';
export function SiteLink({href, ...props}:AnchorHTMLAttributes<HTMLAnchorElement>){return <a {...props} href={href?localPath(href):href}/>;}
export function SiteImage({src, ...props}:ImgHTMLAttributes<HTMLImageElement>){return <img {...props} src={typeof src==='string'?localPath(src):src}/>;}
