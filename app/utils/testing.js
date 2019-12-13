export function getBBox() {
  return {
    x: 0,
    y: 0,
  };
}

export function getScreenCTM() {
  return {
    m11: 0,
    m12: 0,
    m13: 0,
    m14: 0,
    m21: 0,
    m22: 0,
    m23: 0,
    m24: 0,
    m31: 0,
    m32: 0,
    m33: 0,
    m34: 0,
    m41: 0,
    m42: 0,
    m43: 0,
    m44: 0,
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    inverse: getScreenCTM,
    invertSelf: getScreenCTM,
    multiply: getScreenCTM,
    multiplySelf: getScreenCTM,
    translate: getScreenCTM,
    translateSelf: getScreenCTM,
    skew: getScreenCTM,
    rotate: getScreenCTM,
    rotateSelf: getScreenCTM,
  };
}

export function createSVGMatrix() {
  return getScreenCTM();
}
