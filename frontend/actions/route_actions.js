import * as RouteApiUtil from '../util/route_api_util';

export const RECEIVE_ROUTES = "RECEIVE_ROUTES";
export const RECEIVE_ROUTE = "RECEIVE_ROUTE";
export const RECEIVE_ROUTE_ERRORS = "RECEIVE_ROUTE_ERRORS";
export const REMOVE_ROUTE = "REMOVE_ROUTE";
export const CLEAR_ROUTE_ERRORS = "CLEAR_ROUTE_ERRORS";

const receiveRoutes = routes => ({
  type: RECEIVE_ROUTES,
  routes,
});

const receiveRoute = route => ({
  type: RECEIVE_ROUTE,
  route
});

const receiveRouteErrors = errors =>({
  type: RECEIVE_ROUTE_ERRORS,
  errors
});

const removeRoute = routeId => ({
  type: REMOVE_ROUTE,
  routeId
});

export const clearRouteErrors = () => ({
  type: CLEAR_ROUTE_ERRORS,
});

export const fetchRoute = id => dispatch => (
  RouteApiUtil.fetchRoute(id).then(route => dispatch(receiveRoute(route)))
);

export const fetchRoutes = () => dispatch => (
  RouteApiUtil.fetchRoutes().then(routes => dispatch(receiveRoutes(routes)))
);

export const createRoute = route => dispatch => (
  RouteApiUtil.createRoute(route).then(route => dispatch(receiveRoute(route)),
    err => (dispatch(receiveRouteErrors(err.responseJSON))))
);

export const deleteRoute = routeId => dispatch => ( 
  RouteApiUtil.deleteRoute(routeId).then(route => dispatch(removeRoute(routeId)))
);