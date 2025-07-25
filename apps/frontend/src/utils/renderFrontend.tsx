import { ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export function renderFrontend(children: ReactNode) {
  const elem = document.getElementById('root')!;
  const app = <StrictMode>{children}</StrictMode>;

  if (import.meta.hot) {
    const root = (import.meta.hot.data.root ??= createRoot(elem));
    root.render(app);
  } else {
    createRoot(elem).render(app);
  }
}
