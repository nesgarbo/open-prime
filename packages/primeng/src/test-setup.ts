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
