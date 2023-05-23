const entityFormatter = (data) => {
  let formarttedResponse = { ...data };
  if (data && data.toAPIJSON) {
    formarttedResponse = { ...data.toAPIJSON() };
  }
  return { data: formarttedResponse };
};

const entitiesFormatter = (data, query) => {
  const getNextOffset = (offset, responseLength, count) => {
    const intOffset = +offset;
    const currentOffset = intOffset + responseLength;
    const nextOffset = count > currentOffset ? currentOffset : 0;
    return nextOffset;
  };
  const { rows, count } = data;
  const offset = query.page?.offset || 0;
  const formarttedResponse = rows.map((row) => {
    if (row.toAPIJSON) {
      return row.toAPIJSON();
    }
    return row;
  });
  return {
    data: formarttedResponse,
    pagination: {
      total: count,
      count: rows.length,
      nextOffset: getNextOffset(offset || '0', rows.length, count),
    },
  };
};

module.exports = {
  entityFormatter,
  entitiesFormatter,
};
