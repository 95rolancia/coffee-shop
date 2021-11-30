const ROUTE_CHANGE_EVENT = "ROUTE_CHANGE";

export const init = (onRouteChange: () => void): void => {
  window.addEventListener(ROUTE_CHANGE_EVENT, () => {
    onRouteChange();
  });
};

export const routeChange = (url: string, params?: CustomEventInit): void => {
  history.pushState(null, "", url);
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, params));
};
