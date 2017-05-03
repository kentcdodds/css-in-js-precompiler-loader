import precompileCSSInJS from 'css-in-js-precompiler'
import VirtualModulePlugin from './VirtualModulePlugin'

const LOADER_PLUGIN = Symbol('loader added VM plugin')

module.exports = function loader(content) {
  if (this.cacheable) {
    this.cacheable()
  }

  const results = precompileCSSInJS({
    sources: [{code: content, filename: this.resourcePath}],
  })

  if (!results.css.length) {
    return content
  }

  const compilation = this._compilation
  let plugin = compilation[LOADER_PLUGIN]

  if (!plugin) {
    plugin = VirtualModulePlugin.bootstrap(compilation)
    compilation[LOADER_PLUGIN] = plugin
  }

  plugin.addFile(`${this.resourcePath}.css`, results.css)

  return `require("${this.resourcePath}.css");\n${results.transformed[0].code}`
}
