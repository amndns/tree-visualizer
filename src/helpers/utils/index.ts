const toNumber = (value?: string): number => {
  if (value === undefined) return 0;

  const result = parseInt(value, 10);
  if (Number.isNaN(result)) {
    throw new Error('[Utils] Invalid value passed to `toNumber`.');
  }

  return result;
};

export default toNumber;
