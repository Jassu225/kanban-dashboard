const getImmutable = (val) => Object.freeze(val);

export const emptyObject = getImmutable({});

export const emptyList = getImmutable([]);
