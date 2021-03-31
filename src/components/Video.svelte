<script lang='ts'>
    export var poster: string;
    export var src: string;
    export var layout: string;
  </script>
  
  <video
    class={layout}
    poster={poster}
    src={src}
    muted
    autoplay
    loop>
    <track kind="captions">
  </video>
  