import React from 'react';

import { ComposerView } from '@/components';
import { useHomeContentPage } from '@/shared/hooks';

const HomeContentPageLayout = () => {
  const { data: template } = useHomeContentPage();

  if (!template) return null;

  return <ComposerView template={template} />;
};

export default HomeContentPageLayout;
