Additional props supplied to the Button component will be passed to the underlying button element.

## Button Style Types

```javascript
const buttonStyle = {
  margin: '10px 15px 0 0'
};

<div aria-live="polite">
  <Button style={buttonStyle}>Default</Button>

  <Button styleType="darkDefault" style={buttonStyle}>
    Dark Default
  </Button>

  <Button styleType="primary" style={buttonStyle}>
    Primary
  </Button>

  <Button styleType="success" style={buttonStyle}>
    Success
  </Button>

  <Button styleType="info" style={buttonStyle}>
    Information
  </Button>

  <Button styleType="warning" style={buttonStyle}>
    Warning
  </Button>

  <Button styleType="danger" style={buttonStyle}>
    Danger
  </Button>

  <Button style={buttonStyle} waiting>
    Waiting
  </Button>
</div>;
```

## Button sizes

Including a `size` will set buttons to a specific size.

```javascript
import OutlineButton from './OutlineButton';

const wrapperStyle = {
  marginBottom: '15px'
};

const buttonStyle = {
  marginBottom: '15px',
  marginRight: '15px'
};

<div>
  <div style={wrapperStyle}>
    <Button size="lg" style={buttonStyle} styleType="primary">
      Large
    </Button>
    <Button size="lg" style={buttonStyle}>
      Large
    </Button>
    <OutlineButton size="lg" style={buttonStyle} styleType="primary">
      Large
    </OutlineButton>
  </div>

  <div style={wrapperStyle}>
    <Button style={buttonStyle} styleType="primary">
      Default
    </Button>
    <Button style={buttonStyle}>Default</Button>
    <OutlineButton style={buttonStyle} styleType="primary">
      Default
    </OutlineButton>
  </div>

  <div style={wrapperStyle}>
    <Button size="sm" style={buttonStyle} styleType="primary">
      Small
    </Button>
    <Button size="sm" style={buttonStyle}>
      Small
    </Button>
    <OutlineButton size="sm" style={buttonStyle} styleType="primary">
      Small
    </OutlineButton>
  </div>

  <div style={wrapperStyle}>
    <Button size="xs" style={buttonStyle} styleType="primary">
      Extra Small
    </Button>
    <Button size="xs" style={buttonStyle}>
      Extra Small
    </Button>
    <OutlineButton size="xs" style={buttonStyle} styleType="primary">
      Extra Small
    </OutlineButton>
  </div>
</div>;
```

Setting the `block` property will force the button to expand to the width of it's parent container. Buttons will default to `block` at the mobile breakpoint. The `mobileBlock` prop can be used to override this default.

```javascript
const buttonContainerStyle = {
  width: '300px',
  padding: '10px',
  backgroundColor: '#ddd',
  border: '1px solid #444'
};

<div style={buttonContainerStyle}>
  <Button block styleType="primary">
    Block button
  </Button>
</div>;
```

Any additional prop sent will be included on the button. For example, setting the `disabled` property will put the button into a disabled state, making it unclickable.

```javascript
const buttonStyle = {
  display: 'inline-block',
  margin: '10px 15px 0 0'
};

<div>
  <Button disabled style={buttonStyle}>
    Default
  </Button>

  <Button styleType="primary" disabled style={buttonStyle}>
    Primary
  </Button>

  <Button isOutline styleType="success" disabled style={buttonStyle}>
    Success
  </Button>

  <Button styleType="info" disabled style={buttonStyle}>
    Information
  </Button>

  <Button styleType="warning" disabled style={buttonStyle}>
    Warning
  </Button>

  <Button styleType="danger" disabled style={buttonStyle}>
    Danger
  </Button>

  <Button styleType="primary" isLinkButton disabled style={buttonStyle}>
    Link
  </Button>
</div>;
```

### SplitButtonDropdown

You can achieve a split button dropdown style by supplying the `flatLeftEdge` and
`flatRightEdge` props to `Button` and `DropdownButton`. There may be some wrapping/positional
issues present in small viewports that need to be addressed in implementation.

```javascript
import DropdownButton from './DropdownButton';

<>
  <div>
    <Button styleType="primary" flatRightEdge>
      Split Button Dropdown
    </Button>
    <DropdownButton
      shouldCloseOnButtonClick
      inline
      rootClose
      flatLeftEdge
      styleType="primary"
    >
      <DropdownButton.Button name="first" style={{ whiteSpace: 'nowrap' }}>
        First Button
      </DropdownButton.Button>
      <DropdownButton.Button name="second" style={{ whiteSpace: 'nowrap' }}>
        Second Button
      </DropdownButton.Button>
      <DropdownButton.Button name="third" style={{ whiteSpace: 'nowrap' }}>
        Third Button
      </DropdownButton.Button>
    </DropdownButton>
  </div>
  <br />
  <div>
    <DropdownButton
      shouldCloseOnButtonClick
      inline
      rootClose
      flatRightEdge
      styleType="primary"
    >
      <DropdownButton.Button name="first" style={{ whiteSpace: 'nowrap' }}>
        First Button
      </DropdownButton.Button>
      <DropdownButton.Button name="second" style={{ whiteSpace: 'nowrap' }}>
        Second Button
      </DropdownButton.Button>
      <DropdownButton.Button name="third" style={{ whiteSpace: 'nowrap' }}>
        Third Button
      </DropdownButton.Button>
    </DropdownButton>
    <Button styleType="primary" flatLeftEdge>
      Left Split Button Dropdown
    </Button>
  </div>
</>;
```

## LoaderButton

`Button`, `OutlineButton`, `LinkButton`, and `ActionButton` all have alternate
`LoaderButton`s, its extra props are:

<table>
  <thead>
    <tr>
      <th>Prop Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`showWhileRunning`</td>
      <td>Content to display while waiting.</td>
    </tr>
    <tr>
      <td>`onClick`</td>
      <td>onClick _must_ return a Promise with `LoaderButtons`</td>
    </tr>
  </tbody>
</table>

```javascript
import { withLoadingStateWhileRunning } from './features/withLoadingStateWhileRunning';
const LoaderButton = withLoadingStateWhileRunning(Button);

const runPromise = () => new Promise(res => setTimeout(res, 1000));
<LoaderButton showWhileRunning="Loading..." onClick={runPromise}>
  Click me to load!
</LoaderButton>;
```
