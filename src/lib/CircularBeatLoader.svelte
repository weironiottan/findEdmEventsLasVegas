<script>
	// Props for customization
	export let size = "medium"; // small, medium, large
	export let showText = true;

	// Size mappings
	const sizeMap = {
		small: {
			outer: "w-16 h-16",
			middle: "w-12 h-12",
			inner: "w-6 h-6"
		},
		medium: {
			outer: "w-24 h-24",
			middle: "w-16 h-16",
			inner: "w-8 h-8"
		},
		large: {
			outer: "w-32 h-32",
			middle: "w-24 h-24",
			inner: "w-10 h-10"
		}
	};

	// Get the right sizes based on prop
	const sizes = sizeMap[size] || sizeMap.medium;
</script>

<div class="flex flex-col items-center justify-center">
	<div class="relative">
		<!-- Outer spinning circle -->
		<div class="{sizes.outer} rounded-full border-4 border-purple-500 border-t-transparent animate-spin-outer"></div>

		<!-- Middle spinning circle (opposite direction) -->
		<div class="absolute inset-0 flex items-center justify-center">
			<div class="{sizes.middle} rounded-full border-4 border-cyan-400 border-b-transparent animate-spin-middle"></div>
		</div>

		<!-- Inner pulsing circle -->
		<div class="absolute inset-0 flex items-center justify-center">
			<div class="{sizes.inner} bg-pink-500 rounded-full animate-pulse-beat"></div>
		</div>
	</div>

	<!-- Optional loading text -->
	{#if showText}
		<div class="text-3xl mt-4 loading-text-container font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500">Fetching Edm Events...</div>
	{/if}
</div>

<style>
    @keyframes spin-outer {
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes spin-middle {
        to {
            transform: rotate(-360deg);
        }
    }

    @keyframes pulse-beat {
        0%, 100% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(0.8);
            opacity: 0.7;
        }
    }

    .animate-spin-outer {
        animation: spin-outer 3s linear infinite;
    }

    .animate-spin-middle {
        animation: spin-middle 2s linear infinite;
    }

    .animate-pulse-beat {
        animation: pulse-beat 1.5s ease-in-out infinite;
    }

    .loading-text-container {
        position: relative;
        animation: pulse-brightness 2s infinite ease-in-out;
    }

    @keyframes pulse-brightness {
        0%, 100% {
            opacity: 1;
            filter: brightness(1.3) drop-shadow(0 0 8px rgba(217, 70, 239, 0.6));
        }
        50% {
            opacity: 0.7;
            filter: brightness(1) drop-shadow(0 0 2px rgba(217, 70, 239, 0.3));
        }
    }
</style>