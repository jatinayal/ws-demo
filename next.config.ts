import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  serverExternalPackages: ['sharp'],
};

export default withPayload(nextConfig);
