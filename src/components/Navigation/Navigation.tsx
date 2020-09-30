import React from 'react';
import { css } from '@emotion/core';

import { Slides } from '../../_slides';

interface NavigationProps {
  slides: Slides;
  activeSlide: number;
}

const NavigationDot = ({ active }: { active: Boolean }) => (
  <span
    css={css`
      padding: 10px;
      margin-right: 5px;
      cursor: pointer;
      border-radius: 50%;
      background: ${active ? 'black' : 'white'};
    `}
  />
)

const Navigation = ({ activeSlide, slides }: NavigationProps) => (
  <div
    css={css`
      position: absolute;
      bottom: 25px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `}
  >
    {slides.map((slide, i) => (
      <NavigationDot key={slide} active={activeSlide === i} />
    ))}
  </div>
)

export default Navigation
