const capitalizeFont = (string, separator = " ") => {
  return string && string
    .split(separator)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(separator);
};

export {
  capitalizeFont
}