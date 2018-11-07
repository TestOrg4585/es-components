/* eslint-env jest */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from 'react-testing-library';
import viaTheme from 'es-components-via-theme';

import SideNav from './SideNav';

let instanceToRender;
const onItemSelected = jest.fn();
const onClick = jest.fn();

beforeEach(() => {
  onItemSelected.mockClear();
  onClick.mockClear();

  instanceToRender = (
    <ThemeProvider theme={viaTheme}>
      <SideNav onItemSelected={navId => onItemSelected(navId)}>
        <SideNav.Item
          id="home"
          className="home"
          onClick={navId => onClick(navId)}
          targetUrl="/home"
        >
          Home
        </SideNav.Item>
        <SideNav.Item id="cart" className="cart">
          Cart
        </SideNav.Item>
        <SideNav.Item
          id="external"
          className="external"
          targetUrl="http://www.google.com"
          isExternalLink
        >
          External Link
        </SideNav.Item>
        <SideNav.Item
          id="info"
          className="info"
          onClick={() => onClick()}
          isDisabled
        >
          Disabled
        </SideNav.Item>
      </SideNav>
    </ThemeProvider>
  );
});

it('renders as expected', () => {
  const { container } = render(instanceToRender);
  expect(container).toMatchSnapshot();
});

it('executes onItemSelected with the id of the nav item clicked', () => {
  const { getByText } = render(instanceToRender);
  getByText('Cart').click();
  expect(onItemSelected).toBeCalledWith('cart');
});

it('executes onClick when nav item clicked', () => {
  const { getByText } = render(instanceToRender);
  getByText('Home').click();
  expect(onClick).toBeCalledWith('home');
});

it('disabled item prevents onclick functions', () => {
  const { getByText } = render(instanceToRender);
  getByText('Disabled').click();
  expect(onClick).not.toBeCalled();
  expect(onItemSelected).not.toBeCalled();
});
