export const convertWhere = (object: object, exclude: string[]) => {
  let whereObj = {};
  Object.keys(object).forEach((prop, index) => {
    if (!exclude.includes(prop) && Object.values(object)[index] !== undefined) {
      whereObj[prop] = object[prop];
    }
  });

  return whereObj;
};
