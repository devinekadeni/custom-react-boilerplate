import React from 'react'
import { shallow } from 'enzyme'

import App from '../App'

test('should render App component', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('div').length).toBe(1)
})
