import { TestingGuide } from '@/components/landing/TestingGuide';
import { guideMetadataFor } from '@/lib/metadata';
export const metadata = guideMetadataFor('ko');
export default function Page() {
  return <TestingGuide locale="ko" />;
}
