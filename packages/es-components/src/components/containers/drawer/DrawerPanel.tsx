import React, { useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Heading from '../heading/Heading';
import {
  useDrawerItemContext,
  DrawerItem,
  DrawerItemBody,
  DrawerItemOpener
} from './DrawerItem';
import Icon, { IconProps } from '../../base/icons/Icon';
import useUniqueId from '../../util/useUniqueId';
import { IconName, iconNames, HeadingLevel } from 'es-components-shared-types';

const PanelWrapper = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.gray3};
`;

const PanelButton = styled.button`
  background: none;
  border: 0;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  padding: 10px 15px;
  width: 100%;

  @media (hover: hover), (-ms-high-contrast: none) {
    &:hover {
      background-color: ${props => props.theme.colors.gray2};
      color: ${props => props.theme.brandColors.primary1};
    }
  }
`;

type DrawerIconProps = IconProps & {
  openedIconName: IconName;
  closedIconName: IconName;
};

const PanelIcon = styled(
  ({ openedIconName, closedIconName, ...props }: DrawerIconProps) => {
    const { open } = useDrawerItemContext();
    return <Icon name={open ? openedIconName : closedIconName} {...props} />;
  }
)`
  margin-right: 0.4em;
  position: relative;
  top: -2px;
`;

interface PanelBodyProps {
  noPadding?: boolean;
  panelKey?: React.Key;
}

const styledDrawerItemBody = () => {
  const panelBodyStyle = css<PanelBodyProps>`
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.gray9};

    > div {
      border-bottom: 4px solid ${props => props.theme.colors.gray3};
      padding: ${props => (props.noPadding ? '0' : '10px 10px 10px 40px')};
    }
  `;
  const styledBody = styled(DrawerItemBody);

  // handle styled-components v5
  styledBody.withConfig = styledBody.withConfig || (() => styledBody);

  return styledBody.withConfig({
    shouldForwardProp: prop =>
      !['noPadding', 'panelKey'].some(disallowedProp => prop === disallowedProp)
  })`
      ${panelBodyStyle}
    `;
};

const PanelBody = styledDrawerItemBody();

export type DrawerPanelProps = Override<
  JSXElementProps<'div'>,
  {
    // this is only any because of the old value in the propTypes object below
    // we should change this to React.ReactNode in the future
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any;
    title: string | number | React.ReactNode;
    titleAside?: string | React.ReactNode;
    noPadding?: boolean;
    headingLevel?: HeadingLevel;
    open?: boolean;

    // INTERNAL PROPS
    /** @ignore */
    closedIconName?: IconName;
    /** @ignore */
    openedIconName?: IconName;
    /** @ignore */
    panelKey?: string;
  }
>;

const DrawerPanel = React.forwardRef<unknown, DrawerPanelProps>(
  function DrawerPanel(
    {
      children,
      title,
      titleAside,
      noPadding = false,
      headingLevel = 2,
      open,
      openedIconName = 'add',
      closedIconName = 'minus',
      panelKey,
      ...other
    },
    ref
  ) {
    const buttonRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
    useImperativeHandle(ref, () => ({
      focusHeaderButton: () => buttonRef.current?.focus()
    }));
    const panelId = useUniqueId(other.id);
    const headingAriaId = `${panelId}-heading`;

    const itemProps = {
      id: panelId,
      panelKey,
      open
    };

    return (
      <DrawerItem {...itemProps}>
        <PanelWrapper {...other}>
          <div id={headingAriaId} role="heading" aria-level={headingLevel}>
            <DrawerItemOpener>
              <PanelButton ref={buttonRef}>
                <span>
                  <PanelIcon
                    closedIconName={closedIconName}
                    openedIconName={openedIconName}
                  />
                  {title}
                </span>
                {titleAside && <aside>{titleAside}</aside>}
              </PanelButton>
            </DrawerItemOpener>
          </div>
          <PanelBody aria-labelledby={headingAriaId} noPadding={noPadding}>
            {children}
          </PanelBody>
        </PanelWrapper>
      </DrawerItem>
    );
  }
);

export const propTypes = {
  ...(PanelWrapper.propTypes || {}),
  children: PropTypes.any.isRequired,
  /** Title text displayed next to the open/close icon */
  title: PropTypes.node.isRequired,
  /** Aside text/content displayed on the right side of the panel title */
  titleAside: PropTypes.node,
  /** Removes the default padding from the panel body */
  noPadding: PropTypes.bool,
  /** Set desired aria-level for heading */
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  headingLevel: Heading.propTypes!.level,
  open: PropTypes.bool,

  // INTERNAL PROPS
  /** @ignore */
  closedIconName: PropTypes.oneOf<IconName>([...iconNames]),
  /** @ignore */
  openedIconName: PropTypes.oneOf<IconName>([...iconNames]),
  /** @ignore */
  panelKey: PropTypes.string
};

DrawerPanel.propTypes = propTypes;
DrawerPanel.defaultProps = {
  ...(PanelWrapper.defaultProps || {}),
  noPadding: false,
  titleAside: undefined,
  headingLevel: 2,
  panelKey: undefined,
  open: undefined,
  closedIconName: 'add',
  openedIconName: 'minus'
};

export default DrawerPanel;
