<script>
	import { Hero, PageBody, Panel } from '#lib';
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

<svelte:head>
	<title>Page not available · Find EDM Shows Las Vegas</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<Hero />

<PageBody>
	<Panel>
		<div
			class="flex min-h-80 w-full flex-col items-center justify-center space-y-8
            rounded-xl p-4 text-center text-lg font-semibold tracking-wider text-slate-300 shadow-2xl"
		>
			<div class="text-3xl">Well This is Embarrassing....</div>
			<div>{getRandomErrorMessage()}</div>
			<div>No Worries, We have logged what's been going and we should be back soon!</div>
		</div>
	</Panel>
</PageBody>
