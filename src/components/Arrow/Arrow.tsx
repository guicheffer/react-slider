import React from 'react';
import { css } from '@emotion/core';

interface ArrowProps {
  direction: 'left' | 'right';

  // TODO: Fix handle click
  handleClick: any;
}

const Arrow = ({ direction, handleClick }: ArrowProps) => (
  <div
    onClick={handleClick}
    css={css`
      ${direction === 'right' ? `right: 2vw` : `left: 2vw`};
      align-items: center;
      background: white;
      border-radius: 50%;
      border: 1px solid #748da8;
      cursor: pointer;
      display: flex;
      height: 50px;
      justify-content: center;
      position: absolute;
      text-indent: -5px;
      top: 50%;
      transition: transform ease-in 0.1s;
      user-select: none;
      width: 50px;

      &:hover {
        transform: scale(1.1);
      }
    `}
  >
    {direction === 'right' ? '➡️' : '⬅️'}
  </div>
)

export default Arrow;
