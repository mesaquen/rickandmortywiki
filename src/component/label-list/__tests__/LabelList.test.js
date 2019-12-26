import React from 'react';
import { render, cleanup } from '@testing-library/react';
import LabelList from '../LabelList';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-12-25
 */
describe('LabelList', () => {
  const labelList = [
    { title: 'label01', value: 'value01' },
    { title: 'label02', value: 'value02' },
  ];

  afterEach(cleanup);

  it('should render without error', () => {
    let { getByText } = render(<LabelList items={labelList} />);
    const titleElement = getByText(labelList[0].title);
    const valueElement = getByText(labelList[0].value);
    expect(titleElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<LabelList items={labelList} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
