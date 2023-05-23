import replace from 'lodash/replace';
import forEach from 'lodash/forEach';
import entries from 'lodash/entries';
import toString from 'lodash/toString';

export const allocateParamToString = (str: string, params?: object): string => {
  if (!params) return str;
  forEach(entries(params), ([key, value]: [string, string | number]) => {
    str = replace(str, `{${key}}`, toString(value));
  });
  return str;
};
