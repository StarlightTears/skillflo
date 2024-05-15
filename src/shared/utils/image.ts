import type { ImageFile } from '@/types/common.interface';

export const getImagesClassifiedByTypeFromAttached = (attached: ImageFile[]) => {
  const PcImage = attached.find((file: ImageFile) => file.type === 'PC') || attached[0];
  const MobileImage = attached.find((file: ImageFile) => file.type === 'MOBILE') || attached[1] || attached[0];

  return { PcImage, MobileImage };
};
