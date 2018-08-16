export const fetchRoutes = data => (
  $.ajax({
    method: 'GET',
    url: 'api/routes',
    data
  })
);

export const fetchRoute = id => (
  $.ajax({
    method: 'GET',
    url: `/api/routes/${id}`
  })
);

export const createRoute = route => (
  $.ajax({
    method: 'POST',
    url: 'api/routes',
    data: { route }
  })
);
