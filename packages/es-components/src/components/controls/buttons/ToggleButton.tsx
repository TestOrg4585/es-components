import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button, { ButtonProps } from './Button';
import OutlineButton from './OutlineButton';
import { useMonitoringCallback } from '../../../hooks/useMonitoringHooks';

export type ToggleButtonProps = ButtonProps & {
  isPressed?: boolean;
  isOutline?: boolean;
};

const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  function ToggleButton(props, ref) {
    const { styleType, size, block, isOutline, onClick, ...buttonProps } =
      props;
    const [isPressed, setIsPressed] = useState(props.isPressed);

    useEffect(() => {
      setIsPressed(props.isPressed);
    }, [props.isPressed]);

    const toggleButton: React.MouseEventHandler<HTMLButtonElement> =
      useMonitoringCallback((currentOnClick, event) => {
        setIsPressed(oldIsPressed => !oldIsPressed);
        currentOnClick?.(event);
      }, onClick);

    const ToggleButtonType = isOutline ? OutlineButton : Button;

    return (
      <ToggleButtonType
        {...buttonProps}
        onClick={toggleButton}
        styleType={styleType}
        size={size}
        block={block}
        className={
          isPressed
            ? `${buttonProps.className || ''} pressed`
            : buttonProps.className
        }
        aria-pressed={isPressed}
        ref={ref}
      >
        {props.children}
      </ToggleButtonType>
    );
  }
);

/* eslint-disable @typescript-eslint/no-non-null-assertion */
ToggleButton.propTypes = {
  ...Button.propTypes,
  isOutline: PropTypes.bool,
  isPressed: PropTypes.bool
};

const unchildrenDefaults = { ...Button.defaultProps };
delete unchildrenDefaults['children'];

ToggleButton.defaultProps = {
  ...(unchildrenDefaults as Omit<ButtonProps, 'children'>),
  isOutline: false,
  isPressed: false
};
/* eslint-enable @typescript-eslint/no-non-null-assertion */

export default ToggleButton;
