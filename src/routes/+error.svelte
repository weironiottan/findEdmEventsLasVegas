<script>
	let { data } = $props();
	import { page } from '$app/state';
	$inspect(page.error)

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

<div class="bg-gradient-to-br h-[65%] w-full from-purple-900 via-indigo-900 to-black py-10 ">
	<div class="relative  h-[100%] md:w-7xl mx-auto rounded-xl">
		<div class="absolute -inset-6">
			<div class="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400 rounded-full blur-xl opacity-50"></div>
			<div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-400 rounded-full blur-xl opacity-50"></div>
			<div class="absolute top-3/4 left-1/3 w-48 h-48 bg-purple-400 rounded-full blur-xl opacity-50"></div>
		</div>

		<div class="overflow-y-auto overscroll-contain backdrop-blur-xl h-[100%] bg-white/15 border border-white/30 rounded-xl z-10 p-5 mt-2 ">

			<div class="shadow-2xl space-y-8 rounded-xl p-4 h-full w-full overflow-y-auto text-2xl
            flex flex-col text-slate-300 font-semibold text-lg tracking-wider center justify-center items-center">

				<div class="text-3xl">Well This is Embarrassing....</div>
				<div>{getRandomErrorMessage()}</div>
				<div>No Worries, We have logged what's been going and we should be back soon!</div>

			</div>
		</div>
	</div>
</div>