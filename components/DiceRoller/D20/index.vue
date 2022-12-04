<template>
  <div class="content">
    <div class="dice" :data-face="roll">
      <figure class="face face-1"></figure>
      <figure class="face face-2"></figure>
      <figure class="face face-3"></figure>
      <figure class="face face-4"></figure>
      <figure class="face face-5"></figure>
      <figure class="face face-6"></figure>
      <figure class="face face-7"></figure>
      <figure class="face face-8"></figure>
      <figure class="face face-9"></figure>
      <figure class="face face-10"></figure>
      <figure class="face face-11"></figure>
      <figure class="face face-12"></figure>
      <figure class="face face-13"></figure>
      <figure class="face face-14"></figure>
      <figure class="face face-15"></figure>
      <figure class="face face-16"></figure>
      <figure class="face face-17"></figure>
      <figure class="face face-18"></figure>
      <figure class="face face-19"></figure>
      <figure class="face face-20"></figure>
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, toRefs } from '@nuxtjs/composition-api';

  export default defineComponent({
    props: {
      roll: {
        type: Number,
        default: 0,
      },
    },
    setup() {},
  });
</script>
<style lang="scss" scoped>
  $containerWidth: 200px;
  $containerHeight: $containerWidth;

  $faceWidth:  $containerWidth*0.5;
  $faceHeight: $faceWidth*0.86;

  $transitionDuration: 1s;
  $animationDuration:  2s;
  $easing: ease-in-out;

  $angle: 53deg;
  $ringAngle: -11deg;
  $sideAngle: 360deg/5;
  $opacity: 0.75;
  $color: rgb(248 183 0 / 80%);

  $rotateX: -$angle;
  $translateZ: $faceWidth*0.335;
  $translateY: -$faceHeight*0.15;
  $translateRingZ: $faceWidth*0.75;
  $translateRingY: $faceHeight*0.78 + $translateY;
  $translateLowerZ: $translateZ;
  $translateLowerY: $faceHeight*0.78 + $translateRingY;

  /* @keyframes roll {
    10% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) }
    30% { transform: rotateX(120deg) rotateY(240deg) rotateZ(0deg) translateX(40px) translateY(40px) }
    50% { transform: rotateX(240deg) rotateY(480deg) rotateZ(0deg) translateX(-40px) translateY(-40px) }
    70% { transform: rotateX(360deg) rotateY(720deg) rotateZ(0deg) }
    90% { transform: rotateX(480deg) rotateY(960deg) rotateZ(0deg) }
  } */

  /* @keyframes roll {
    33% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) }
    66% { transform: rotateX(480deg) rotateY(960deg) rotateZ(0deg) }
  } */


  /* @keyframes fade-in {
    0%  { opacity: 0; }
    100%  { opacity: 1; }
  } */

  body {
    background: #333;
    padding: 20px;
  }

  .content {
    position: relative;
    width: $containerWidth;
    height: $containerHeight;
    perspective: 1500px;
    /* opacity: 0; */
    /* animation: fade-in $transitionDuration linear forwards; */
  }

  .dice {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotateX(90deg) rotateY(0deg) rotateZ(0deg);
    transition: transform $transitionDuration ease-in-out;
    cursor: pointer;

    &.rolling {
      animation: roll $animationDuration linear forwards;
    }

    @for $i from 1 through 5 {
      &[data-face="#{$i}"] {
        $angleMultiplier: $i - 1;
        transform: rotateX(-$angle) rotateY($sideAngle * $angleMultiplier);
      }
    }

    @for $i from 16 through 20 {
      &[data-face="#{$i}"] {
        $angleMultiplier: $i - 15;
        transform: rotateX(-$angle + 180deg) rotateY(-$sideAngle * $angleMultiplier);
      }
    }

    @for $i from 6 through 10 {
      &[data-face="#{$i}"] {
        $angleMultiplier: $i - 6;
        transform: rotateX(-$ringAngle) rotateZ(180deg) rotateY($sideAngle * $angleMultiplier);
      }
    }

    @for $i from 11 through 15 {
      &[data-face="#{$i}"] {
        $angleMultiplier: $i - 8;
        transform: rotateX(-$ringAngle) rotateY(-$sideAngle * $angleMultiplier - $sideAngle/2);
      }
    }

    @for $i from 1 through 20 {
      &[data-face="#{$i}"] {
        .face-#{$i} {
          border-bottom-color: var(--theme-color-accent);
          &::before {
            transform: scale(1);
            opacity: 1;
          }
        }
      }
    }

    .face {
      $horizontalMargin: -$faceWidth*0.5;
      position: absolute;
      left: 50%;
      top: 0;
      margin: 0 $horizontalMargin;
      border-left: $faceWidth*0.5 solid transparent;
      border-right: $faceWidth*0.5 solid transparent;
      border-bottom: $faceHeight solid $color;
      width: 0px;
      height: 0px;
      transform-style: preserve-3d;
      backface-visibility: hidden;
      counter-increment: steps 1;
      transition: all .3s ease-in-out $transitionDuration * 0.85;

      &:before {
        content: counter(steps);
        position: absolute;
        top: $faceHeight*0.2;
        left: -$faceWidth;
        color: #2f3742;
        font-weight: 800;
        /* text-shadow: 1px 1px 3px #000; */
        font-size: $faceHeight*0.35;
        letter-spacing: -1px;
        transform: scale(0.75);
        text-align: center;
        line-height: $faceHeight*0.9;
        width: $faceWidth*2;
        height: $faceHeight;
        opacity: 0.25;
        transition: all .3s ease-in-out $transitionDuration * 0.85;
      }

      @for $i from 1 through 5 {
        &:nth-child(#{$i}) {
          $angleMultiplier: $i - 1;
          transform: rotateY(-$sideAngle * $angleMultiplier) translateZ($translateZ) translateY($translateY) rotateX($angle);
        }
      }

      @for $i from 16 through 20 {
        &:nth-child(#{$i}) {
          $angleMultiplier: $i - 18;
          transform: rotateY($sideAngle * $angleMultiplier + $sideAngle/2) translateZ($translateLowerZ) translateY($translateLowerY) rotateZ(180deg) rotateX($angle);
        }
      }

      @for $i from 6 through 10 {
        &:nth-child(#{$i}) {
          $angleMultiplier: $i - 11;
          transform: rotateY(-$sideAngle * $angleMultiplier) translateZ($translateRingZ) translateY($translateRingY) rotateZ(180deg) rotateX($ringAngle);
        }
      }

      @for $i from 11 through 15 {
        &:nth-child(#{$i}) {
          $angleMultiplier: $i - 8;
          transform: rotateY($sideAngle * $angleMultiplier + $sideAngle/2) translateZ($translateRingZ) translateY($translateRingY) rotateX($ringAngle);
        }
      }
    }
  }
</style>
