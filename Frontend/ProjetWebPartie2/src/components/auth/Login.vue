<!-- Noah Brosseau : Page login-->
<template>
  <body>

    <div>
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </body>
</template>

<script>
import { ref, reactive } from 'vue';

</script>


<style lang="scss">
@import "../css/navstyle.css";
@import "../node_modules/bootstrap/scss/bootstrap";
$input-btn-padding-y: .375rem;
$input-btn-padding-x: .75rem;
$input-btn-font-family: null;
$input-btn-font-size: $font-size-base;
$input-btn-line-height: $line-height-base;

$input-btn-focus-width: $focus-ring-width;
$input-btn-focus-color-opacity: $focus-ring-opacity;
$input-btn-focus-color: $focus-ring-color;
$input-btn-focus-blur: $focus-ring-blur;
$input-btn-focus-box-shadow: $focus-ring-box-shadow;

$input-btn-padding-y-sm: .25rem;
$input-btn-padding-x-sm: .5rem;
$input-btn-font-size-sm: $font-size-sm;

$input-btn-padding-y-lg: .5rem;
$input-btn-padding-x-lg: 1rem;
$input-btn-font-size-lg: $font-size-lg;

$input-btn-border-width: var(--#{$prefix}border-width);

</style>