function truncate(str, maxlength) {
  if ( !str || typeof str != 'string' ) return str;
  if ( typeof maxlength != 'number' ) return str;
  if ( parseInt(maxlength) != maxlength ) return str;

  const dots = String.fromCharCode(8230); // "…"
  return str.length < maxlength ? str : str.slice(0, maxlength - 1) + dots;

}
