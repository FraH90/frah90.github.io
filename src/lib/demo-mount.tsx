import { createElement, useEffect, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
function Ready({
  component,
  onReady,
}: {
  component: ComponentType;
  onReady: () => void;
}) {
  useEffect(onReady, []);
  return createElement(component);
}
export function mountDemo(
  element: HTMLElement,
  component: ComponentType,
  onReady: () => void,
  onError: () => void,
) {
  const root = createRoot(element, { onUncaughtError: onError });
  root.render(createElement(Ready, { component, onReady }));
  return () => root.unmount();
}
