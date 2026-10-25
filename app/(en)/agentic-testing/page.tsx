import { TestingGuide } from '@/components/landing/TestingGuide';
import { guideMetadataFor } from '@/lib/metadata';
export const metadata = guideMetadataFor('en');
export default function Page() {
  return <TestingGuide locale="en" />;
}
