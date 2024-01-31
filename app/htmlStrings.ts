export const prefix = (theme: string) =>
`<head>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@3.7.0/css/reveal.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@3.7.0/css/theme/${theme}.css">
</head>`

export const suffix =
`<script src="https://cdn.jsdelivr.net/npm/headjs@1.0.3/dist/1.0.0/head.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/reveal.js@3.7.0/js/reveal.min.js"></script>

	<script src="index.js"></script>
	<script>
		// More info about config & dependencies:
		// - https://github.com/hakimel/reveal.js#configuration
		// - https://github.com/hakimel/reveal.js#dependencies
		Reveal.initialize({
			// Display controls in the bottom right corner
			controls: true,

			width: '100%',
			height: '100%',

			// Display a presentation progress bar
			progress: true,

			// Display the page number of the current slide
			slideNumber: true,

			// Push each slide change to the browser history
			history: false,

			// Enable keyboard shortcuts for navigation
			keyboard: true,

			// Enable the slide overview mode
			overview: true,

			// Vertical centering of slides
			center: true,

			// Enables touch navigation on devices with touch input
			touch: true,

			// Loop the presentation
			loop: false,

			// Change the presentation direction to be RTL
			rtl: false,

			// Randomizes the order of slides each time the presentation loads
			shuffle: false,

			// Turns fragments on and off globally
			fragments: true,

			// Flags if the presentation is running in an embedded mode,
			// i.e. contained within a limited portion of the screen
			embedded: false,

			// Flags if we should show a help overlay when the questionmark
			// key is pressed
			help: true,

			// Flags if speaker notes should be visible to all viewers
			showNotes: false,

			// Global override for autolaying embedded media (video/audio/iframe)
			// - null: Media will only autoplay if data-autoplay is present
			// - true: All media will autoplay, regardless of individual setting
			// - false: No media will autoplay, regardless of individual setting
			autoPlayMedia: null,

			// Number of milliseconds between automatically proceeding to the
			// next slide, disabled when set to 0, this value can be overwritten
			// by using a data-autoslide attribute on your slides
			autoSlide: 0,

			// Stop auto-sliding after user input
			autoSlideStoppable: true,

			// Use this method for navigation when auto-sliding
			autoSlideMethod: Reveal.navigateNext,

			// Enable slide navigation via mouse wheel
			mouseWheel: false,

			// Hides the address bar on mobile devices
			hideAddressBar: true,

			// Opens links in an iframe preview overlay
			previewLinks: true,

			// Transition style
			transition: 'slide', // none/fade/slide/convex/concave/zoom

			// Transition speed
			transitionSpeed: 'default', // default/fast/slow

			// Transition style for full page slide backgrounds
			backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom

			// Number of slides away from the current that are visible
			viewDistance: 3,

			// Parallax background image
			parallaxBackgroundImage: '', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"

			// Parallax background size
			parallaxBackgroundSize: '', // CSS syntax, e.g. "2100px 900px"

			// Number of pixels to move the parallax background per slide
			// - Calculated automatically unless specified
			// - Set to 0 to disable movement along an axis
			parallaxBackgroundHorizontal: null,
			parallaxBackgroundVertical: null,


			// The display mode that will be used to show slides
			display: 'block',

			/*
			multiplex: {
				// Example values. To generate your own, see the socket.io server instructions.
				secret: '13652805320794272084', // Obtained from the socket.io server. Gives this (the master) control of the presentation
				id: '1ea875674b17ca76', // Obtained from socket.io server
				url: 'https://reveal-js-multiplex-ccjbegmaii.now.sh' // Location of socket.io server
			},
			*/

			dependencies: [
				{ src: 'https://cdn.jsdelivr.net/npm/reveal.js@3.7.0/plugin/markdown/marked.js' },
				{ src: 'https://cdn.jsdelivr.net/npm/reveal.js@3.7.0/plugin/markdown/markdown.js' },
				{ src: 'https://cdn.jsdelivr.net/npm/reveal.js@3.7.0/plugin/notes/notes.js', async: true },
				{ src: 'https://cdn.jsdelivr.net/npm/reveal.js@3.7.0/plugin/highlight/highlight.js', async: true, callback: function () { hljs.initHighlightingOnLoad(); } },
				//{ src: '//cdn.socket.io/socket.io-1.3.5.js', async: true },
				//{ src: 'plugin/multiplex/master.js', async: true },
				// and if you want speaker notes
				{ src: 'https://cdn.jsdelivr.net/npm/reveal.js@3.7.0/plugin/notes-server/client.js', async: true }

			],
			markdown: {
				//            renderer: myrenderer,
				smartypants: true
			}
		});
		Reveal.configure({
			// PDF Configurations
			pdfMaxPagesPerSlide: 1

		});
	</script>`