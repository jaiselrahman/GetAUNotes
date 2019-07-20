const FileUtil = {
  getSize(size) {
    const mb = 1024 * 1024;
    const kb = 1024;

    if (size < mb) {
      return (size / kb).toFixed(2) + ' KB';
    } else {
      return (size / mb).toFixed(2) + ' MB';
    }
  },
  getExtension(fileName) {
    if (fileName == null) return null;

    let dotIndex = fileName.lastIndexOf('.');
    if (dotIndex < -1) return null;

    return fileName.substring(dotIndex + 1).toUpperCase();
  }
}

export default FileUtil;