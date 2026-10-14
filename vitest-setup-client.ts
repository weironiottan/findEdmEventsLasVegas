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

// required for svelte transitions as jsdom does not support the Web Animations API
Element.prototype.animate = vi.fn().mockImplementation(() => ({
	cancel: vi.fn(),
	finish: vi.fn(),
	onfinish: null,
	finished: Promise.resolve()
}));

// add more mocks here if you need them
