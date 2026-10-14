<script>
	let { data } = $props();
	import { page } from '$app/state';
	$inspect(page.error);

	const funnyServerErrorMessages = [
		"Looks like our server decided to take an unscheduled coffee break. We're sending it back to work!",
		"Server's having an existential crisis. It's wondering if it's really a server or just a fancy calculator.",
		"Our hamsters powering the server wheel got tired. We're feeding them extra treats to get going again!",
		"The server is currently meditating. Om... nom... nom... (It's also snacking).",
		"Server error 500: The code monkeys are on strike. We're negotiating with bananas as we speak.",
		"Our server tripped over a stray semicolon. It's a bit clumsy sometimes.",
		"The server is taking a quick nap. We didn't have the heart to wake it up right away.",
		"Houston, we have a problem! Our server thinks it's a rocket today."
	];

	// Get a random funny message
	function getRandomErrorMessage() {
		const randomIndex = Math.floor(Math.random() * funnyServerErrorMessages.length);
		return funnyServerErrorMessages[randomIndex];
	}
</script>

<div class="h-[65%] w-full bg-gradient-to-br from-purple-900 via-indigo-900 to-black py-10">
	<div class="relative mx-auto h-[100%] rounded-xl md:w-7xl">
		<div class="absolute -inset-6">
			<div
				class="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-cyan-400 opacity-50 blur-xl"
			></div>
			<div
				class="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-pink-400 opacity-50 blur-xl"
			></div>
			<div
				class="absolute top-3/4 left-1/3 h-48 w-48 rounded-full bg-purple-400 opacity-50 blur-xl"
			></div>
		</div>

		<div
			class="z-10 mt-2 h-[100%] overflow-y-auto overscroll-contain rounded-xl border border-white/30 bg-white/15 p-5 backdrop-blur-xl"
		>
			<div
				class="center flex h-full w-full flex-col items-center justify-center space-y-8
            overflow-y-auto rounded-xl p-4 text-2xl text-lg font-semibold tracking-wider text-slate-300 shadow-2xl"
			>
				<div class="text-3xl">Well This is Embarrassing....</div>
				<div>{getRandomErrorMessage()}</div>
				<div>No Worries, We have logged what's been going and we should be back soon!</div>
			</div>
		</div>
	</div>
</div>
