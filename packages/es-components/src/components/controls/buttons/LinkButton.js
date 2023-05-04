import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTheme } from '../../util/useTheme';
import { darken } from '../../util/colors';
import ButtonBase from './ButtonBase';

const StyledButton = styled(ButtonBase)`
  background-color: transparent;
  border: none;
  box-shadow: none;
  cursor: pointer;
  color: ${props => props.variant.textColor};
  font-size: inherit;
  line-height: ${props => props.theme.font.baseLineHeight};
  padding: 0;
  text-decoration: underline;

  &:hover,
  &:focus,
  &:active {
    color: ${props => darken(props.variant.textColor, 10)};
    text-decoration: none;
  }

  &:active {
    box-shadow: none;
  }

  &[disabled],
  &[data-waiting],
  &[data-waiting]:active {
    color: ${props => props.variant.textColor};
    text-decoration: underline;
  }
`;

const LinkButton = React.forwardRef(function LinkButton(props, ref) {
  const { children, styleType, ...other } = props;
  const theme = useTheme();
  const variant = theme.buttonStyles.linkButton.variant[styleType];

  return (
    <StyledButton ref={ref} variant={variant} type="button" {...other}>
      {children}
    </StyledButton>
  );
});

export const propTypes = {
  children: PropTypes.node.isRequired,
  /** Select the color style of the button, types come from theme buttonStyles.linkButton */
  styleType: PropTypes.string
};

export const defaultProps = {
  styleType: 'default'
};

LinkButton.defaultProps = defaultProps;
LinkButton.propTypes = propTypes;

export default LinkButton;
