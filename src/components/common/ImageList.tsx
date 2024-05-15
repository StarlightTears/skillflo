import styled from '@emotion/styled';
import React, { useState } from 'react';

import { Badge, CloseLarge } from '@/components';

interface ImageListProps {
  imageList: string[];
  hideTitleBadge?: boolean;
}

const ImageListBlock = styled.div`
  .image-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.8rem;
    margin-top: 0.8rem;
  }
`;

const ImageThumbnail = styled.img`
  object-fit: contain;
  width: 15.2rem;
  height: 15.2rem;
  border: 0.1rem solid var(--legacy-color-gray-100);
  cursor: pointer;
`;

const PreviewImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-preview-image);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--classroom-exam-img-preview-background);

  img {
    object-fit: contain;
    max-width: calc(100vw - 8rem);
    max-height: calc(100vh - 12rem);
  }

  .close {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 4.8rem;
    height: 4.4rem;
    margin-left: 0.8rem;
    border-radius: 0.6rem;
    background-color: var(--color-white);
    cursor: pointer;
  }
`;

const ImageList = ({ imageList, hideTitleBadge }: ImageListProps) => {
  const [previewImgSrc, setPreviewImgSrc] = useState('');
  return (
    <>
      {imageList.length > 0 && (
        <ImageListBlock>
          {!hideTitleBadge && (
            <Badge theme="gray" bgColorScale={50} colorScale={400}>
              이미지
            </Badge>
          )}
          <div className="image-grid">
            {imageList.map((imgSrc, index) => (
              <ImageThumbnail key={index} src={imgSrc} onClick={() => setPreviewImgSrc(imgSrc)} />
            ))}
          </div>
        </ImageListBlock>
      )}
      {previewImgSrc && (
        <PreviewImage>
          <img src={previewImgSrc} alt="preview-img" />
          <div className="close" onClick={() => setPreviewImgSrc('')}>
            <CloseLarge />
          </div>
        </PreviewImage>
      )}
    </>
  );
};

export default ImageList;
