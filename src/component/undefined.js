import React from 'react';
import renderer from 'react-test-renderer';

import , from ',';

describe('<, />', () => {
    it('should match the snapshot', () => {
      const component = renderer.create(<, />).toJSON();
      expect(component).toMatchSnapshot();
    });
  });