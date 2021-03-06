const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')

const { YamlReader, ObjectKeySorter } = require('./src')

const source = path.join(
  __dirname,
  '..',
  '..',
  'web',
  'src',
  'components',
  'locale',
  'translations'
)

const watcher = chokidar.watch(source, {
  ignored: /.(json|js|jsx)/,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100,
  },
})

watcher.on('change', filePath => {
  const lang = path.basename(filePath, path.extname(filePath))
  const currentTime = new Date().toLocaleString()

  try {
    const io = fs.readFileSync(filePath, 'utf8')
    const rawTranslation = YamlReader.perform(io)
    const sortedTranslation = ObjectKeySorter.perform(rawTranslation)
    fs.writeFileSync(
      filePath.replace('.yml', '.json'),
      JSON.stringify(sortedTranslation, null, 2)
    )
    console.log(`${currentTime}. Succesfully compiled ${lang.toUpperCase()}`)
  } catch (e) {
    console.log(`${currentTime}. Failed to compiled ${lang.toUpperCase()}`)
  }
})
