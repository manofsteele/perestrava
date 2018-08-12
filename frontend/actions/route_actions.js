import * as RouteApiUtil from '../util/route_api_util';

export const RECEIVE_ROUTES = "RECEIVE_ROUTES";
export const RECEIVE_ROUTE = "RECEIVE_ROUTE";

const receiveRoutes = routes => ({
  type: RECEIVE_ROUTES,
  routes,
});

const receiveRoute = route => ({
  type: RECEIVE_ROUTE,
  route
});

export const fetchRoute = id => dispatch => (
  RouteApiUtil.fetchRoute(id).then(route => dispatch(receiveRoute(route)))
);

export const fetchRoutes = () => dispatch => (
  RouteApiUtil.fetchRoutes().then(routes => dispatch(receiveRoutes(routes)))
);

export const createRoute = route => dispatch => (
  RouteApiUtil.createRoute(route).then(route => dispatch(receiveRoute(route)))
);
