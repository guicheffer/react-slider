import React from 'react';
import { css } from '@emotion/core';

interface SlideProps {
  content: string;
  width: number;
}

const Slide = ({ content, width }: SlideProps) => (
  <div
    css={css`
      height: 100%;
      width: ${width}px;
      background-image: url('${content}');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    `}
  />
)

export default Slide;
