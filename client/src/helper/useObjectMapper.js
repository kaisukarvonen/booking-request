import { useSelector } from 'react-redux';

export const useObjectMapper = () => {
  const fields = useSelector((state) => state.fields.fields);

  const objectValue = (key) => fields.find((field) => field.key === key);

  const translation = (key) => {
    const value = objectValue(key);
    return value?.fi || '';
  };

  const getObjectInList = (key, innerKey) =>
    objectValue(key).options.find((option) => option.key === innerKey);

  return { objectValue, translation, getObjectInList };
};
