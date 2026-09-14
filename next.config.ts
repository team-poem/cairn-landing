import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  output: 'export',
  // Vinext의 basePath는 정적 프리렌더 요청과 충돌하므로 에셋 접두사만 설정한다.
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
};
export default nextConfig;
