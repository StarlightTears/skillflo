import styled from '@emotion/styled';
import React, { ComponentProps } from 'react';

import type { PropsWithStyle } from '@/types/component.interface';

import { Logo } from '@/components';
import { useCurrentMember } from '@/shared/hooks';
import { useCustomer } from '@/shared/hooks/customer';

type CustomLogoProps = Omit<PropsWithStyle<ComponentProps<typeof CustomerLogoBlock>>, 'src'>;

const CustomerLogoBlock = styled.img`
  object-fit: contain;
  object-position: left;
  width: 22.4rem;
  height: 4.4rem;
  cursor: pointer;
`;

const FcLogoBlock = styled.div`
  display: flex;
  align-items: center;

  width: 22.4rem;
  height: 4.4rem;
`;

const CustomerLogo = ({ className, ...props }: CustomLogoProps) => {
  const { member } = useCurrentMember();
  const { data: customer } = useCustomer(Number(member?.extras.customerId));
  const CustomerImageSource = customer?.extras?.logoFiles?.[0]?.url;

  if (!CustomerImageSource) {
    return (
      <FcLogoBlock {...props}>
        <Logo />
      </FcLogoBlock>
    );
  }

  return <CustomerLogoBlock src={CustomerImageSource} className={className} {...props} />;
};

export default CustomerLogo;
