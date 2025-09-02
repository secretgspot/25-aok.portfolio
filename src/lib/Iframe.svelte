<script>
  let { url, title } = $props();
</script>

<div class="iframe-border-wrapper">
  <div class="project-frame-container">
    <iframe
      src={url}
      {title}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <svg class="hand-drawn-border" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f0f8ff" />
        <stop offset="100%" stop-color="#607d8b" />
      </linearGradient>
    </defs>
    <path
      d="M2 2 L98 2 L98 98 L2 98 L2 2 Z"
      fill="none"
      stroke="url(#goldGradient)"
      stroke-width="2"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</div>

<style>
  .iframe-border-wrapper {
    position: relative;
    width: 100%;
    padding-top: 177.77%; /* Same aspect ratio as iframe container */
  }

  .project-frame-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .hand-drawn-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none; /* Allow clicks to pass through to the iframe */
    transform: rotate(-1deg); /* Slight rotation for hand-drawn effect */
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  /* Tablet and larger */
  @media (min-width: 768px) {
    .iframe-border-wrapper {
      padding-top: 56.25%; /* 16:9 Aspect Ratio */
    }
  }
</style>