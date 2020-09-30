import React, { FunctionComponent, useState, useEffect, useRef } from 'react';

import { SlideConfig, Slides } from "../../_slides";

import Arrow from '../Arrow/Arrow';
import Navigation from '../Navigation/Navigation';
import Slide from '../Slide/Slide';
import SliderContent from '../SliderContent/SliderContent';

import "./SliderContainer.scss";

enum DEFAULTS {
  TRANSITION_TIME = 0.45
};

export interface SlideState {
  activeSlide: number;
  translate: number;
  inTransition: Boolean;
  transition: typeof DEFAULTS.TRANSITION_TIME;
  _slides: SlideConfig[];
}

const getWindowWidth = () => window.innerWidth;

/**
 * @function SliderContainer
 *
 * This is essentially our main slider container :)
 *
 *  I'm not very familiar with the TypeScript within our JSX Elements here :(
 * therefore I tried to implement my TypeScript knowledge in here as much as I could;
 */
const SliderContainer: FunctionComponent<{ slides: Slides }> = props => {
  const { slides } = props;

  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const lastSlide = slides[slides.length - 1];

  const [state, setState] = useState({
    activeSlide: 0,
    translate: getWindowWidth(),
    transition: DEFAULTS.TRANSITION_TIME,
    inTransition: false,
    _slides: [lastSlide, firstSlide, secondSlide]
  } as SlideState);

  const {
    _slides,
    activeSlide,
    inTransition,
    transition,
    translate,
  } = state;

  // TODO: Fix types around that - I know you can start hating me from here
  const transitionRef = useRef() as { current: Function };
  const resizeRef = useRef() as { current: Function };

  useEffect(() => {
    transitionRef.current = smoothTransition;
    resizeRef.current = handleResize;
  });

  useEffect(() => {
    const smooth: any = ({ target }: { target: HTMLElement }): void => {
      if (target?.className.includes('SliderContent')) {
        transitionRef.current();
      }
    };

    const resize = () => {
      resizeRef.current();
    }

    const transitionEnd = window.addEventListener('transitionend', smooth) as any;
    const onResize = window.addEventListener('resize', resize) as any;

    return () => {
      window.removeEventListener('transitionend', transitionEnd);
      window.removeEventListener('resize', onResize);
    }
  }, [resizeRef, transitionRef])

  useEffect(() => {
    if (transition === 0) setState({ ...state, transition: DEFAULTS.TRANSITION_TIME });
  }, [state, transition])

  const handleResize = () => {
    setState({ ...state, translate: getWindowWidth(), transition: 0 });
  }

  const smoothTransition = () => {
    let _slides = [];

    if (activeSlide === slides.length - 1) {
      _slides = [slides[slides.length - 2], lastSlide, firstSlide];
    } else if (activeSlide === 0) {
      _slides = [lastSlide, firstSlide, secondSlide];
    } else {
      _slides = slides.slice(activeSlide - 1, activeSlide + 2);
    }

    setState({
      ...state,
      _slides,
      transition: 0,
      inTransition: false,
      translate: getWindowWidth()
    });
  }

  const nextSlide = () =>
    setState({
      ...state,
      inTransition: true,
      translate: translate + getWindowWidth(),
      activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1
    });

  const prevSlide = () =>
    setState({
      ...state,
      inTransition: true,
      translate: 0,
      activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1
    });

  // PLEASE HATE ME, I allow you to do so due to the typing
  const displaySlides = (): any => _slides.map((_slide: string, i: number) => (
    <Slide width={getWindowWidth()} key={_slide + i} content={_slide} />
  ));

  return (
    <div className="slider-container">
      <SliderContent
        translate={translate}
        transition={transition}
        isTransition={inTransition}
        width={getWindowWidth() * _slides.length}
      >
        {displaySlides()}
      </SliderContent>

      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />

      <Navigation slides={slides} activeSlide={activeSlide} />
    </div>
  )
}

export default SliderContainer;
