export const routeGenerator = (items) => {
  const routes = items.reduce((acc, item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    return acc;
  }, []);

  return routes;
};
