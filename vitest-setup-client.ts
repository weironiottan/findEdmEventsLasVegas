import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// required for svelte5 + jsdom as jsdom does not support matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	enumerable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});

// required for svelte transitions as jsdom does not support the Web Animations API.
// Animations finish on the next tick so outro transitions can remove their elements.
Element.prototype.animate = function () {
	const animation = {
		cancel: () => {},
		finish: () => {},
		onfinish: null as (() => void) | null,
		finished: Promise.resolve()
	};
	setTimeout(() => animation.onfinish?.());
	return animation as unknown as Animation;
};

// required for flowbite-svelte dropdowns as jsdom does not support the Popover API
HTMLElement.prototype.showPopover = () => {};
HTMLElement.prototype.hidePopover = () => {};

// add more mocks here if you need them
