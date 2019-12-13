export function join(...args) {
  return [...args].filter(str => !!str).join(' ');
}
