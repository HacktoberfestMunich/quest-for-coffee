function compareArrays(inputArray, validationArray) {
  const array1Sorted = inputArray.slice().sort();
  const array2Sorted = validationArray.slice().sort();
  return array1Sorted.length === array2Sorted.length
    && array1Sorted.every((value, index) => value === array2Sorted[index]);
}

export { compareArrays }