export const toNumber = (value?: string): number => {
  if (value === undefined) return 0;

  const result = parseInt(value, 10);
  if (Number.isNaN(result)) {
    throw new Error('[Utils] Invalid value passed to `toNumber`.');
  }

  return result;
};

export const copyToClipboard = (data: string): void => {
  const dummyInputElement = document.createElement('input');
  document.body.appendChild(dummyInputElement);
  dummyInputElement.setAttribute('value', data);
  dummyInputElement.select();
  document.execCommand('copy');
  document.body.removeChild(dummyInputElement);
};
