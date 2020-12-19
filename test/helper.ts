import * as fs from 'fs'
import * as path from 'path'
import * as rimraf from 'rimraf'


export function prepareDBDir(db: string) {
  let dir = 'data'
  mkdir(dir)
  dir = path.join(dir, db)
  rmdir(dir)
  return dir
}

export function rmdir(dir: string) {
  rimraf.sync(dir)
}

export function mkdir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

export function copyDir(src: string, dest: string) {
  mkdir(dest)
  for (let file of fs.readdirSync(src)) {
    let srcFile = path.join(src, file)
    let destFile = path.join(dest, file)
    let stat = fs.statSync(srcFile)
    if (stat.isFile()) {
      fs.copyFileSync(srcFile, destFile)
    } else if (stat.isDirectory()) {
      copyDir(srcFile, destFile)
    } else {
      console.log('unknown file type:', srcFile)
    }
  }
}
