import React from 'react';
import { css } from '@emotion/core';

import { Slides } from '../../_slides';

interface NavigationProps {
  handleSelect: any;
  slides: Slides;
  activeSlide: number;
}

const NavigationDot = ({ active, activeSlide, handleSelect }: {
  active: Boolean,
  activeSlide: NavigationProps["activeSlide"],
  handleSelect: NavigationProps["handleSelect"],
}) => (
  <button
    data-active-slide={activeSlide}
    onClick={!active ? handleSelect : () => {}}
    css={css`
      padding: 10px;
      margin-right: 5px;
      cursor: pointer;
      border-radius: 50%;
      outline: none;
      background: ${active ? 'black' : 'white'};
    `}
  />
)

const Navigation = ({ activeSlide, handleSelect, slides }: NavigationProps) => (
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
      <NavigationDot key={slide.hash} active={activeSlide === i} activeSlide={i} handleSelect={handleSelect} />
    ))}
  </div>
)

export default Navigation
