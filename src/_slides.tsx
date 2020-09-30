import React, { ReactElement } from "react";
import { css } from "@emotion/core";

export type htmlContent = 'html';
export type imageContent = 'image';

interface BaseSlideConfig {
  hash: string;
  content: htmlContent | imageContent;
};

interface ImageSlideConfig extends BaseSlideConfig {
  html?: ReactElement;
  source: string;
}

interface HTMLSlideConfig extends BaseSlideConfig {
  html: ReactElement;
  source?: string;
}

export type SlideConfig = ImageSlideConfig | HTMLSlideConfig;

export type Slides = SlideConfig[];

const slides = [
  {
    hash: 'd8e30447a3aafc17c9b',
    content: 'image',
    source: 'https://loremflickr.com/900/600',
  },
  {
    hash: 'd8e3044se46bc17c9b',
    content: 'image',
    source: 'https://loremflickr.com/900/601',
  },
  {
    hash: 'd8e3awasd45544wa59b',
    content: 'html',
    html: (<section css={css`
      color: red;
      height: 100%;
      position: relative;
      text-align: center;
      width: 100%;
    `}><span css={css`
      display: block;
      font-weight: 700;
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translateX(-50%);
    `}> Hello World! i am a react component and the next slide is the website of yours =) </span></section>),
  },
  {
    hash: 'd8e3aw234454wa59b',
    content: 'html',

    //  This was added on purpose to later on fix/refactor the
    // actual sliders in order not to load contents once again (on cache disabled)
    html: (<iframe title="the-box-website" src="https://livingpackets.com/" css={css`height: 100%; width: 100%; `}/>),
  },
  {
    hash: 'd8e3sdgh5e6fc17c9b',
    content: 'image',
    source: 'https://loremflickr.com/900/602',
  },
  {
    hash: 'd8e3044rs6dudfyh7c9b',
    content: 'image',
    source: '/cover.jpg',
  },
  {
    hash: 'd8e3awa35a45454wa59b',
    content: 'html',
    html: (<section css={css`
      color: blue;
      font-weight: 700;
      margin-top: 100px;
      text-align: center;
    `}>hey, i am a super weird and ugly component up here! :eyes:</section>),
  },
] as Slides;

export default slides;
