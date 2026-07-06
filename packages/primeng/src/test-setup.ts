// Global test setup for the Vitest runner. jsdom does not implement matchMedia,
// which several components (overlays/menus via TieredMenu, etc.) call while
// rendering; provide a no-op polyfill so those specs run under jsdom.
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
    window.matchMedia = (query: string) =>
        ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false
        }) as MediaQueryList;
}

// jsdom does not implement ResizeObserver, which several components (TabList,
// Scroller, etc.) instantiate while rendering; provide a no-op polyfill so those
// specs run under jsdom without throwing in ngAfterViewInit.
if (typeof globalThis !== 'undefined' && typeof (globalThis as any).ResizeObserver !== 'function') {
    (globalThis as any).ResizeObserver = class {
        observe(): void {}
        unobserve(): void {}
        disconnect(): void {}
    };
}

// jsdom does not implement the scrollTo API on elements, which Scroller calls to
// programmatically scroll its viewport; provide a no-op polyfill so those specs run
// (and can spy on it) under jsdom instead of throwing "scrollTo is not a function".
if (typeof Element !== 'undefined' && typeof Element.prototype.scrollTo !== 'function') {
    Element.prototype.scrollTo = function (): void {};
}
