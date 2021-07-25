export function validate(bodyRequest: object, expectedRequest: object): boolean {
  Object.keys(bodyRequest).forEach((key, index) => {
    if (key !== Object.keys(expectedRequest)[index]) return false;
    if (typeof bodyRequest[key] !== typeof expectedRequest[key]) return false;

    if (typeof bodyRequest[key] === 'string') {
      if (bodyRequest[key].length === 0) return false;
      if (bodyRequest[key] !== expectedRequest[key]) return false;
    }

    if (typeof bodyRequest[key] === 'number') {
      try {
        Number(bodyRequest[key]);
      } catch (err) {
        return false;
      }
    }
  });

  return true;
}
