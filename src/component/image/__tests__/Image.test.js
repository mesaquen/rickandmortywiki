import React from 'react';
import { render } from '@testing-library/react';
import Image from '../Image';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */

describe('Image', () => {
  const { asFragment } = render(<Image src="none.jpg" />);
  it('should have same snapshot when loading', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
