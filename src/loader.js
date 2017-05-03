import {join, dirname, extname, basename} from 'path'
import loaderUtils from 'loader-utils'
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
  console.log(
    '**************************************************************************\n\n\n',
  )
  console.log(results, this.resourcePath)
  console.log(
    '\n\n\n**************************************************************************',
  )

  if (!results.css.length) {
    return content
  }

  const compilation = this._compilation
  let plugin = compilation[LOADER_PLUGIN]

  if (!plugin) {
    plugin = VirtualModulePlugin.bootstrap(compilation)
    compilation[LOADER_PLUGIN] = plugin
  }

  // styles.forEach((style, idx) => {
  //   style.path = `${basepath}__css_literal_loader_${idx++}${extension}`
  //   plugin.addFile(style.path, style.value)
  // })

  return results.transformed[0].code
}
