import { describe, it, expect } from 'vitest';
import { domfy } from '../../lib/core/domfy';
import { Text } from '../../lib/components/text/Text';
import { Button } from '../../lib/components/button/Button';
import { Input } from '../../lib/components/input/Input';
import { VStack, HStack } from '../../lib/components/stack/Stack';
import { Link } from '../../lib/components/text/Link';
import { Image } from '../../lib/components/image/Image';
import { PureHTML } from '../../lib/components/PureHTML';
import { List } from '../../lib/components/stack/List';

describe('Integration: build -> domfy pipeline', () => {
  it('should render Text to real DOM', () => {
    const tree = Text('Hello World').color('red').fontSize(16).build();
    const el = domfy(tree) as HTMLElement;

    expect(el.tagName).toBe('P');
    expect(el.textContent).toBe('Hello World');
    expect(el.getAttribute('style')).toContain('color:red');
    expect(el.getAttribute('style')).toContain('font-size:16px');
  });

  it('should render Button to real DOM', () => {
    const tree = Button('Click Me').disabled().build();
    const el = domfy(tree) as HTMLButtonElement;

    expect(el.tagName).toBe('BUTTON');
    expect(el.textContent).toBe('Click Me');
    expect(el.getAttribute('disabled')).toBe('true');
  });

  it('should render Input to real DOM', () => {
    const tree = Input('hello', 'text')
      .placeholder('Type here')
      .build();
    const el = domfy(tree) as HTMLInputElement;

    expect(el.tagName).toBe('INPUT');
    expect(el.getAttribute('type')).toBe('text');
    expect(el.getAttribute('placeholder')).toBe('Type here');
  });

  it('should render nested VStack with children', () => {
    const tree = VStack(
      Text('Title').bold(),
      HStack(
        Button('OK'),
        Button('Cancel'),
      ),
    ).padding(20).build();
    const el = domfy(tree) as HTMLElement;

    expect(el.tagName).toBe('DIV');
    expect(el.getAttribute('style')).toContain('padding:20px');
    expect(el.childNodes.length).toBe(2);
    // First child is the Text paragraph
    expect((el.children[0] as HTMLElement).tagName).toBe('P');
    // Second child is the HStack div
    expect((el.children[1] as HTMLElement).tagName).toBe('DIV');
    expect(el.children[1].childNodes.length).toBe(2); // two buttons
  });

  it('should render Link to real DOM', () => {
    const tree = Link('Google').href('https://google.com').build();
    const el = domfy(tree) as HTMLAnchorElement;

    expect(el.tagName).toBe('A');
    expect(el.getAttribute('href')).toBe('https://google.com');
    expect(el.textContent).toBe('Google');
  });

  it('should render Image to real DOM', () => {
    const tree = Image('photo.jpg')
      .size({ width: 200, height: 150 })
      .build();
    const el = domfy(tree) as HTMLImageElement;

    expect(el.tagName).toBe('IMG');
    expect(el.getAttribute('src')).toBe('photo.jpg');
    expect(el.getAttribute('style')).toContain('width:200px');
    expect(el.getAttribute('style')).toContain('height:150px');
  });

  it('should render PureHTML to real DOM', () => {
    const tree = PureHTML('<em>Emphasized</em>').build();
    const el = domfy(tree) as HTMLElement;

    expect(el.tagName).toBe('DIV');
    expect(el.innerHTML).toBe('<em>Emphasized</em>');
  });

  it('should render List to real DOM', () => {
    const tree = List(Text('A'), Text('B'), Text('C')).build();
    const el = domfy(tree) as HTMLElement;

    expect(el.tagName).toBe('OL');
    expect(el.getAttribute('class')).toContain('list-reset');
    expect(el.children.length).toBe(3);
    Array.from(el.children).forEach((child) => {
      expect(child.tagName).toBe('LI');
    });
  });

  it('should render complex nested layout', () => {
    const tree = VStack(
      HStack(
        Text('Logo').bold(),
        HStack(
          Link('Home').href('/'),
          Link('About').href('/about'),
        ),
      ).justifyContent('between').padding(10),
      VStack(
        Text('Main content').fontSize(18),
        Input('', 'text').placeholder('Search...'),
        HStack(
          Button('Save').class('btn-primary'),
          Button('Cancel').class('btn-secondary'),
        ),
      ).padding(20),
    ).build();

    const el = domfy(tree) as HTMLElement;

    expect(el.tagName).toBe('DIV');
    // Should have 2 top-level children: header HStack, main VStack
    expect(el.children.length).toBe(2);
  });

  it('should attach event listeners on DOM elements', () => {
    let clicked = false;
    const tree = Button('Click').onClick(() => { clicked = true; }).build();
    const el = domfy(tree) as HTMLButtonElement;

    el.click();
    expect(clicked).toBe(true);
  });

  it('should apply id attribute', () => {
    const tree = VStack().id('main-container').build();
    const el = domfy(tree) as HTMLElement;
    expect(el.getAttribute('id')).toBe('main-container');
  });

  it('should apply className as class attribute', () => {
    const tree = VStack().class('container', 'wide').build();
    const el = domfy(tree) as HTMLElement;
    expect(el.getAttribute('class')).toBe('container wide');
  });
});
