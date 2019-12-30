import React from 'react';
import { render } from '@testing-library/react';
import Label from '../Label';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */

describe('Label', () => {
  it('should have same snapshot', () => {
    const { asFragment } = render(<Label title="title">Value</Label>);
    expect(asFragment()).toMatchSnapshot();
  });
});
