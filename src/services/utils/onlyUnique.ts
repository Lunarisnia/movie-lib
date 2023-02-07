const filterUnique = <Type>(value: Type, index: Number, self: Type[]) => {
  return self.indexOf(value) === index && value;
};

/**
 * Filter array values and return only unique.
 */
export default <Type>(arr: Type[]): Type[] => {
  return arr.filter(filterUnique);
};
