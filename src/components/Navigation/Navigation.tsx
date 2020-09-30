import React from 'react';
import { css } from '@emotion/core';

import { Slides } from '../../_slides';

interface NavigationDotProps {
  active: Boolean,
  activeSlide: NavigationProps["activeSlide"],
  handleSelect: NavigationProps["handleSelect"],
}

const NavigationDot = ({ active, activeSlide, handleSelect }: NavigationDotProps) => (
  <button
    data-active-slide={activeSlide}
    onClick={!active ? handleSelect : () => {}}
    css={css`
      background: ${active ? 'black' : 'white'};
      border-radius: 50%;
      border: 0;
      border: 1px solid #748da8;
      cursor: pointer;
      margin-right: 5px;
      outline: none;
      padding: 10px;

      &:hover {
        ${!active ? 'border-color: white; background: gray' : ''};
      }
    `}
  />
)

interface NavigationProps {
  handleSelect: any;
  slides: Slides;
  activeSlide: number;
}

// TODO: Reuse css
// (currently not implemented due agility)
const Navigation = ({ activeSlide, handleSelect, slides }: NavigationProps) => (
  <nav
    id='bottom-navigation'
    css={css`
      align-items: center;
      bottom: 25px;
      display: flex;
      justify-content: center;
      position: absolute;
      width: 100%;
    `}
  >
    {slides.map((slide, i) => (
      <NavigationDot key={slide.hash} active={activeSlide === i} activeSlide={i} handleSelect={handleSelect} />
    ))}
  </nav>
)

export default Navigation
