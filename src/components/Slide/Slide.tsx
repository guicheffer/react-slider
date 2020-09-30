import React from 'react';
import { css } from '@emotion/core';

import { SlideConfig } from '../../_slides';

interface SlideProps {
  slide: SlideConfig;
  width: number;
}

const Slide = ({ slide, width }: SlideProps) => {
  const isImage = slide.content === 'image';
  const isHTML = slide.content === 'html';

  return (<div
    css={css`
      height: 100%;
      width: ${width}px;

      ${isImage ? `right: 2vw` : `left: 2vw`};
      ${isImage ? `background-image: url('${slide.source}')` : ``};
      ${isImage ? `background-size: cover` : ``};
      ${isImage ? `background-repeat: no-repeat` : ``};
      ${isImage ? `background-position: center` : ``};
    `}
  > {!isImage && isHTML && slide.html ?
    (<div className='container' css={css`
      position: relative;
      width: 100%;
      height: 100%;
    `}> {slide.html} </div>)
  : ''} </div>);
}

export default Slide;
