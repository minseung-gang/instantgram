export function isEqual(a: any, b: any): boolean {
  // 두 값이 동일한 경우
  if (a === b) return true;

  // 두 값 중 하나가 객체가 아니거나, 둘 다 객체가 아닌 경우
  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a === null ||
    b === null
  ) {
    return false;
  }

  // 객체의 키를 배열로 가져오기
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // 객체의 키 길이가 다른 경우
  if (keysA.length !== keysB.length) return false;

  // 각 키를 순회하면서 값 비교
  for (const key of keysA) {
    // b 객체에 key가 없거나, 해당 키의 값이 다른 경우
    if (!keysB.includes(key) || !isEqual(a[key], b[key])) return false;
  }

  // 모든 키와 값이 동일한 경우
  return true;
}
