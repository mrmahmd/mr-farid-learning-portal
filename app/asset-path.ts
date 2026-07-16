export const portalBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function portalAsset(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${portalBasePath}${normalizedPath}`;
}
