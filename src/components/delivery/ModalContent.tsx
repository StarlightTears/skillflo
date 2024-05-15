import styled from '@emotion/styled';
import React, { useState } from 'react';

import { Button, Input } from '@/components';
import { media } from '@/styles/legacy-mixins';
import { invisibleScrollBar } from '@/styles/mixins';

const DeliveryModalContentBlock = styled.div`
  padding: 2rem 0.1rem 4rem;

  ${media('large')} {
    overflow-y: auto;
    max-height: 80vh;
    ${invisibleScrollBar}
  }

  .description {
    margin-bottom: 1.2rem;
    color: var(--legacy-color-gray-600);
  }

  .recipient-info {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-bottom: 4rem;

    .fc-input {
      flex: 1;
    }

    ${media('large')} {
      flex-direction: row;
    }
  }

  .zip-code {
    display: flex;
    margin-bottom: 1.2rem;

    .fc-input {
      width: 26.2rem;
    }

    .search-zip-code {
      width: fit-content;
      margin-top: 2rem;
      margin-left: 1.2rem;
    }
  }

  .address {
    margin-bottom: 1.2rem;
  }
`;

const DeliveryModalContent = () => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [zoneCode, setZoneCode] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');

  const openAddressSearch = () => {
    new window.daum.Postcode({
      width: '100%',
      oncomplete: (data) => {
        setZoneCode(data.zonecode);
        setAddress(data.address);
      },
    }).embed(document.getElementById('address-search'));
  };

  return (
    <DeliveryModalContentBlock>
      <div className="description">
        해당 강의는 학습지와 함께 하는 과정입니다.
        <br />
        아래에 배송지를 입력해주시면 학습지를 보내드립니다.
      </div>
      <div className="recipient-info">
        <Input
          label="수령인"
          placeholder="수령인 이름"
          value={recipientName}
          onChange={(event) => setRecipientName(event.target.value)}
        />
        <Input
          label="연락처"
          placeholder="수령인 연락처"
          value={recipientPhone}
          onChange={(event) => setRecipientPhone(event.target.value)}
        />
      </div>
      <div className="zip-code">
        <Input label="우편번호" placeholder="우편번호" value={zoneCode} disabled />
        <Button className="search-zip-code" theme="outline" size="xmedium" onClick={openAddressSearch}>
          검색
        </Button>
      </div>
      <div className="address" id="address-search"></div>
      <div className="address">
        <Input label="주소" placeholder="[검색] 버튼으로 주소를 검색해주세요." value={address} disabled />
      </div>
      <div className="address">
        <Input
          label="상세주소"
          placeholder="상세 주소를 입력하세요."
          value={addressDetail}
          onChange={(event) => setAddressDetail(event.target.value)}
        />
      </div>
    </DeliveryModalContentBlock>
  );
};

export default DeliveryModalContent;
