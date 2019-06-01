const reshape = require('reshape')
const test = require('ava')
const customElements = require('..')

test('basic', t => {
  const html = '<custom>Test</custom>'
  const expected = '<div class="custom">Test</div>'
  return compare(t, html, expected)
})

test('add to existing class', t => {
  const html = '<custom class="test">Test</custom>'
  const expected = '<div class="test custom">Test</div>'
  return compare(t, html, expected)
})

test('class already exists', t => {
  const html = '<custom class="custom">Test</custom>'
  const expected = '<div class="custom">Test</div>'
  return compare(t, html, expected)
})

test('html tag match', t => {
  const html = '<header class="custom">Test</header>'
  const expected = html
  return compare(t, html, expected)
})

test('undefined options', t => {
  const html = '<div>Test</div>'
  const expected = html
  return compare(t, html, expected, undefined)
})

test('replacementTag', t => {
  const html = '<custom class="custom">Test</custom>'
  const expected = '<span class="custom">Test</span>'
  return compare(t, html, expected, { replacementTag: 'span' })
})

test('additionalTags option', t => {
  const html = '<header class="custom">Test</header>'
  const expected = '<div class="custom header">Test</div>'
  return compare(t, html, expected, { additionalTags: ['header'] })
})

test('backwards compatibility', t => {
  const html = '<header class="custom">Test</header>'
  const expected = '<span class="custom header">Test</span>'
  return compare(t, html, expected, {
    defaultTag: 'span',
    skipTags: ['header']
  })
})

test('custom replacement tag', t => {
  const html = '<custom data-replacement="span">Test</custom>'
  const expected = '<span class="custom">Test</span>'
  return compare(t, html, expected)
})

test('custom replacement tag attribute', t => {
  const html = '<custom tag="span">Test</custom>'
  const expected = '<span class="custom">Test</span>'
  return compare(t, html, expected, { replacementTagOverrideAttribute: 'tag' })
})

test('custom replacement tag map', t => {
  const html = '<custom>Test</custom>'
  const expected = '<span class="custom">Test</span>'
  return compare(t, html, expected, { replacementTagMap: { span: ['custom'] } })
})

test('custom replacement tag map overriding', t => {
  const html = '<custom data-replacement="span">Test</custom>'
  const expected = '<span class="custom">Test</span>'
  return compare(t, html, expected, { replacementTagMap: { div: ['custom'] } })
})

test("don't replace blacklisted tags", t => {
  const html = '<blacklisted>Keep my tag!</blacklisted>'
  const expected = html
  return compare(t, html, expected, { blacklist: ['blacklisted'] })
})

function compare(t, html, expected, options) {
  return reshape({ plugins: [customElements(options)] })
    .process(html)
    .then(res => {
      t.is(res.output(), expected)
    })
}
