const buildWhere = (validQueryProps, query) =>
  validQueryProps.reduce((acc, validQueryProp) => {
    const validQueryValue = query[validQueryProp];
    return validQueryValue
      ? { ...acc, [validQueryProp]: validQueryValue }
      : acc;
  }, {});

const buildOrder = (
  associatedAliases = {},
  order = '',
  orderTypes = {},
  secondOrder = ''
) => {
  if (!order) {
    return '';
  }

  let newOrder = order;
  let orderFlow = 'ASC NULLS LAST';
  if (order && order[0] === '-') {
    orderFlow = 'DESC NULLS LAST';
    newOrder = order.substring(1);
  }
  if (!order) {
    newOrder = 'lastName';
  }
  const associatedAlias = associatedAliases[newOrder];
  const orderType = orderTypes[newOrder] || 'STRING';
  if (orderType === 'STRING') {
    newOrder = associatedAlias
      ? `lower("${associatedAlias}"."${newOrder}") ${orderFlow}`
      : `lower("${newOrder}") ${orderFlow}`;
  } else {
    newOrder = associatedAlias
      ? `"${associatedAlias}"."${newOrder}" ${orderFlow}`
      : `"${newOrder}" ${orderFlow}`;
  }
  if (secondOrder) {
    newOrder = `${newOrder}, ${buildOrder(
      associatedAliases,
      secondOrder,
      orderTypes
    )}`;
  }
  return newOrder;
};
module.exports = {
  buildWhere,
  buildOrder,
};
