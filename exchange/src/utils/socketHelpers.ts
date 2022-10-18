export function injectCachedData(target: any, dataObject: object) {
  const fieldName = "cachedData";
  target[fieldName] = { ...target[fieldName], ...dataObject };
  return target;
}

export function getInjectedCachedData(from: any) {
  return from["cachedData"];
}
