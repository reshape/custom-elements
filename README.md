# Reshape Custom Elements

[![Greenkeeper badge](https://badges.greenkeeper.io/reshape/custom-elements.svg)](https://greenkeeper.io/)

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
                <my-tex class="text">Text</my-text>
              </my-component>`

reshape({ plugins: custom({ defaultTag: 'span' }))
  .process(component)
  .then((res) => console.log(result.output()))
```

```html
<span class="my-component">
  <span class="my-text text">Text</span>
</span>
```

## Options

| Name | Description | Default |
| ---- | ----------- | ------- |
| **defaultTag** | Tag used to replace the custom element tag name | `div` |
| **skipTags** | Array of tags to be processed despite being a normal html tag | `[]`

## License

- Licensed under [MIT](LICENCE.md)
- See our [contributing guidelines](contributing.md)
