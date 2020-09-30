import React from 'react';
import { render } from '@testing-library/react';

import SliderContainer from '../components/SliderContainer/SliderContainer';

/** TODO: Fix it!
 *
 * ps. I could have splitted it better however
 * I prefered to keep consistency on the test and agility as well
 *
 * ps2. Mocks are simply our actually slides
 *
**/
import slides from '../_slides';

describe("SliderContainer", () => {
  describe("rendering part", () => {
    let container: null | HTMLElement;

    beforeEach(() => {
      container = render(<SliderContainer slides={slides} />)?.container;
    });

    it('renders slider content', () => {
      const reactSlider = container?.querySelector('#slider-content');
      expect(reactSlider).toBeTruthy();
    });

    it('renders navigation arrows and bottom dots', () => {
      const leftNavigation = container?.querySelector('#left-navigation');
      const rightNavigation = container?.querySelector('#right-navigation');
      const bottomNavigation = container?.querySelector('#bottom-navigation');

      expect(leftNavigation).toBeTruthy();
      expect(rightNavigation).toBeTruthy();
      expect(bottomNavigation).toBeTruthy();
    });
  });
});
