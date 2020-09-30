import React, { FunctionComponent, useState, useEffect, useRef } from 'react';

import { SlideConfig, Slides } from "../../_slides";

import Arrow from '../Arrow/Arrow';
import Navigation from '../Navigation/Navigation';
import Slide from '../Slide/Slide';
import SliderContent from '../SliderContent/SliderContent';

import "./SliderContainer.scss";

enum DEFAULTS {
  TRANSITION_TIME = 0.5,
};

export interface SlideState {
  activeSlide: number;
  translate: number;
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
    _slides: [lastSlide, firstSlide, secondSlide]
  } as SlideState);

  const {
    _slides,
    activeSlide,
    transition,
    translate,
  } = state;

  // TODO: Fix types around that - I know you can start hating me from here
  const transitionRef = useRef() as { current: Function };
  const resizeRef = useRef() as { current: Function };

  useEffect(() => {
    transitionRef.current = shiftTransition;
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
  }, [state, transition]);

  const handleResize = () => {
    setState({ ...state, translate: getWindowWidth(), transition: 0 });
  }

  const shiftTransition = () => {
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
      translate: getWindowWidth()
    });
  }

  const nextSlide = () =>
    setState({
      ...state,
      translate: translate + getWindowWidth(),
      activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1
    });

  const prevSlide = () =>
    setState({
      ...state,
      translate: 0,
      activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1
    });

  const handleSelect = ({ target }: { target: HTMLElement }) => {
    const toSlide = parseInt(target.dataset.activeSlide as string) as number;
    const newTranslate = activeSlide > toSlide ? 0 : translate * (toSlide - activeSlide) + getWindowWidth();

    setState({
      ...state,
      translate: newTranslate,
      activeSlide: toSlide,
    });
  }

  // PLEASE HATE ME, I allow you to do so due to the typing here
  const displaySlides = (): any => _slides.map((_slide: SlideConfig) => (
    <Slide width={getWindowWidth()} key={_slide.hash} slide={_slide} />
  ));

  console.log(_slides);

  return (
    <div className="slider-container">
      {/* Our Slider Content */}
      <SliderContent
        id="slider-content"
        translate={translate}
        transition={transition}
        width={getWindowWidth() * _slides.length}
      >
        {displaySlides()}
      </SliderContent>

      {/* Arrows */}
      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />

      {/* Bottom Navigation */}
      <Navigation slides={slides} activeSlide={activeSlide} handleSelect={handleSelect} />
    </div>
  )
}

export default SliderContainer;
