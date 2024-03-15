export function colorValidator(input) {
  return input === 'red' ||
    input === 'orange' ||
    input === 'yellow' ||
    input === 'green' ||
    input === 'blue' ||
    input === 'purple' ||
    input === 'black' ||
    input === 'white' ||
    input === 'brown'
    ? null
    : 'not a valid color';
}
