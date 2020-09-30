import React, { ReactChild } from 'react';
import { css } from '@emotion/core';

import { SlideState } from '../SliderContainer/SliderContainer';

interface SliderContentProps {
  id: string;
  translate: SlideState["translate"];
  transition: SlideState["transition"];
  isTransition: SlideState["inTransition"];
  width: number;
  children?: ReactChild;
}

const SliderContent = (props: SliderContentProps) => (
  // TODO: Add fading in here
  //  I swear I started doing it by translating
  // it instead of fading it but then I read it wrongly and I decided to keep it like that

  <section
    id={props.id}
    css={css`
      transform: translateX(-${props.translate}px);
      transition: transform linear ${props.transition}s, opacity linear ${props.transition}s;
      height: 100%;
      width: ${props.width}px;
      display: flex;
    `}
  >
    {props.children}
  </section>
)

export default SliderContent;
