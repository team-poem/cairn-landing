// Pages는 /cairn-engine, Sites와 로컬 기본 실행은 루트에 배포한다.
export function sitePath(path: `/${string}`): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;
}
