import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import type { Banner as BannerType } from '@/types/home.interface';

import BannerDesktopEmpty from '@/assets/images/banner_desktop_empty.png';
import BannerMobileEmpty from '@/assets/images/banner_mobile_empty.png';
import { Carousel } from '@/components';
import { useViewport } from '@/shared/hooks';
import { homeMedia } from '@/styles/mixins';

interface BannerProps {
  bannerList: BannerType[];
}

const BannerBlock = styled.div`
  ${homeMedia('large', 'xlarge')} {
    margin: 4rem 0;
  }
`;

const BannerEmptyImage = styled.img`
  width: 100%;
  cursor: pointer;

  ${homeMedia('large')} {
    margin: 0 5rem;
  }

  ${homeMedia('xlarge')} {
    margin: 0 4rem;
  }

  ${homeMedia('large', 'xlarge')} {
    width: 86rem;
    border-radius: 1.2rem;
  }
`;

const Banner = ({ bannerList }: BannerProps) => {
  const navigate = useNavigate();
  const { isSmallViewport } = useViewport('home');

  const sortedBannerImageListByPriority = bannerList
    .sort((a: BannerType, b: BannerType) => a.extras.priority - b.extras.priority)
    .map((banner: BannerType) => {
      const imageByViewport = isSmallViewport ? banner.extras.attached[1] : banner.extras.attached[0];
      return { ...imageByViewport, redirectUrl: banner.extras.url };
    });

  return (
    <BannerBlock data-e2e="banner">
      {sortedBannerImageListByPriority.length > 0 ? (
        <Carousel imageList={sortedBannerImageListByPriority} />
      ) : (
        <BannerEmptyImage
          src={isSmallViewport ? BannerMobileEmpty : BannerDesktopEmpty}
          data-e2e="banner"
          alt="banner-empty-image"
          onClick={() => navigate('/enrollment')}
        />
      )}
    </BannerBlock>
  );
};

export default Banner;
