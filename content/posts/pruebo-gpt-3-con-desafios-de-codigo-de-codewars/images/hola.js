function findReverseNumber(n) {
  n = BigInt(n)
  if (n === 1n) return 0n

  let numDigits = 1n
  let upperLimit = 1n
  while (n > upperLimit) {
    numDigits++;
    upperLimit = upperLimit * 10n + 9n
  }

  let firstHalf = (n - 1n) / numDigits
  let palindrome = firstHalf
  for (let i = 1n; i < numDigits; i++) {
    palindrome = palindrome * 10n + (firstHalf % 10n)
    firstHalf = BigInt(Math.floor(Number(firstHalf) / 10))
  }
  return palindrome;
}
