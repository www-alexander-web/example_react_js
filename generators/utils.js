const fs = require('fs');
const path = require('path');

const __rootdirname = process.cwd();

function readDirSync(dirPath) {
  try {
    return fs.readdirSync(
        path.join(__rootdirname, dirPath),
    );
  } catch(err) {
    if (err.code === 'ENOENT') {
      fs.mkdirSync(err.path);

      return fs.readdirSync(err.path);
    }

    throw err;
  }
}

const pageComponents = readDirSync('src/components');
const pageContainers = readDirSync('src/containers');
const reduxContainer = readDirSync('src/store');
const pageFolder = readDirSync('src/pages');

const components = pageComponents.concat(pageContainers);

function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

function reduxFilesExists(file) {
  return reduxContainer.indexOf(file) >= 0;
}

function pageExists(page) {
  return pageFolder.indexOf(page) >= 0;
}

module.exports = {
  componentExists,
  reduxFilesExists,
  pageExists
};
