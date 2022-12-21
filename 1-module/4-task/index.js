function checkSpam(str) {
  if ( !str || 
       typeof str != 'string' || 
       str.length < 3 ) return false;

  return str.toLowerCase().includes('1xbet') || str.toLowerCase().includes('xxx');
}
