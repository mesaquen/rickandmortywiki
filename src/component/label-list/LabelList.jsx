import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '../../component';
/**
 * @author Mesaque Francisco <mesaquenf@gmail.com>
 * @since 2019-12-25
 */
const LabelList = props => {
  const { items } = props;

  const labelRenderer = label => (
    <Label
      key={label.title}
      title={label.title}
      data-testid={`label-${label.title}`}
    >
      {label.value}
    </Label>
  );

  return <>{items.map(labelRenderer)}</>;
};

LabelList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default React.memo(LabelList);
