function ucFirst(str) {
  if (!str) return str;
  return str.length ?  str[0].toUpperCase() + str.slice(1) : str;
}
