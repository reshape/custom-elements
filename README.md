# Reshape Custom Elements

[![npm](https://img.shields.io/npm/v/reshape-custom-elements.svg?style=flat-square)](https://npmjs.com/package/reshape-custom-elements)
[![tests](https://img.shields.io/travis/reshape/custom-elements.svg?style=flat-square)](https://travis-ci.org/reshape/custom-elements?branch=master)
[![dependencies](https://img.shields.io/david/reshape/custom-elements.svg?style=flat-square)](https://david-dm.org/reshape/custom-elements)
[![coverage](https://img.shields.io/coveralls/reshape/custom-elements.svg?style=flat-square)](https://coveralls.io/r/reshape/custom-elements?branch=master)

Transform custom element names into class names.

## Installation

```sh
npm i reshape-custom-elements --save
```

## Usage

```js
const reshape = require('reshape')
const customElements = require('reshape-custom-elements')

const html = `<my-component>
                <my-text class="text">Text</my-text>
                
                <!-- An actual HTML element defined in additionalTags -->
                <label>Label</label>
              </my-component>`

reshape({
  plugins: [
    customElements({ replacementTag: 'span', additionalTags: ['label'] })
  ]
})
  .process(html)
  .then(res => console.log(res.output()))
```

```html
<span class="my-component">
  <span class="my-text text">Text</span>

  <span class="label">Label</span>
</span>
```

## Options

| Name               | Description                                                   | Default |
| ------------------ | ------------------------------------------------------------- | ------- |
| **replacementTag** | Tag used to replace the custom element tag name               | `div`   |
| **additionalTags** | Array of tags to be processed despite being a normal html tag | `[]`    |

## License

- Licensed under [MIT](LICENCE.md)
- See our [contributing guidelines](contributing.md)
