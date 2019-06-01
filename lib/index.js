const { modifyNodes } = require('reshape-plugin-util')

module.exports = function reshapeCustomElements(options = {}) {
  const defaultReplacementTag =
    options.replacementTag || options.defaultTag || 'div'
  const additionalTags = options.additionalTags || options.skipTags || []
  const replacementTagAttr =
    options.replacementTagOverrideAttribute || 'data-replacement'
  const replacementTagMap = createLookupMap(options.replacementTagMap || {})
  const blacklist = options.blacklist || []

  return function(tree) {
    return modifyNodes(
      tree,
      node =>
        node.type === 'tag' &&
        blacklist.indexOf(node.name) < 0 &&
        (htmlTags.indexOf(node.name) < 0 ||
          additionalTags.indexOf(node.name) > -1),
      node => {
        // look for a class attribute
        if (!node.attrs) {
          node.attrs = {}
        }
        if (!node.attrs.class) {
          node.attrs.class = []
        }

        // if there's already the same class, return
        if (node.attrs.class.find(n => n.content === node.name)) {
          node.name = defaultReplacementTag
          return node
        }

        // if there is already a class, add a space
        if (node.attrs.class.length > 0) {
          node.attrs.class.push({
            type: 'text',
            content: ' ',
            location: node.location
          })
        }

        // push the new class name
        node.attrs.class.push({
          type: 'text',
          content: node.name,
          location: node.location
        })

        // find out the replacement tag
        let replacementTag = defaultReplacementTag
        if (
          node.attrs[replacementTagAttr] &&
          node.attrs[replacementTagAttr].length > 0
        ) {
          // if there is a replacement override attribute, use it
          replacementTag = node.attrs[replacementTagAttr][0].content
          delete node.attrs[replacementTagAttr]
        } else if (replacementTagMap[node.name]) {
          // if there's a replacement tag mapping, use it
          replacementTag = replacementTagMap[node.name]
        }

        // set the new tag name and return
        node.name = replacementTag
        return node
      }
    )
  }
}

/** Converts the user-friendly array-based map into a regular (better performing) lookup map */
function createLookupMap(map) {
  let output = {}
  Object.entries(map).forEach(([replacementTag, array]) => {
    array.forEach(customTag => {
      output[customTag] = replacementTag
    })
  })
  return output
}

const htmlTags = [
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'menu',
  'menuitem',
  'meta',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr'
]
