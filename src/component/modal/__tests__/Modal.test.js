import React from 'react';
import Renderer from 'react-test-renderer';
import Modal from '../Modal';
import Text from '../../text/Text';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-11-16
 */

describe('Modal', () => {
  const callback = jest.fn();
  let component = Renderer.create(<Modal onClose={callback} />);
  it('should have same snapshot when hidden', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('when rendering visible', () => {
    const episodes = [
      { id: 1, episode: 'S01E01', name: 'one' },
      { id: 2, episode: 'S01E02', name: 'two' },
    ];
    beforeEach(() => {
      component = Renderer.create(
        <Modal visible onClose={callback}>
          <Text>Sample</Text>
        </Modal>
      );
    });
    it('should have same snapshot', () => {
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
