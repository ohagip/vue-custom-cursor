<template>
  <div class="cursor">
    <div class="cursor_pointer" ref="cursorPointer">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CustomCursor',

    props: {
      ease: {
        type: Number,
        default: 0.2,
      },
    },

    data() {
      return {
        mousePosition: {
          x: 0,
          y: 0,
        },
        cursorPosition: {
          x: 0,
          y: 0,
        },
      }
    },

    methods: {
      onMouseMove(e) {
        this.mousePosition.x = e.clientX
        this.mousePosition.y = e.clientY
      },

      updateCursor() {
        this.cursorRequestID = window.requestAnimationFrame(this.updateCursor)

        if (Math.abs(this.mousePosition.x - this.cursorPosition.x) < 1) {
          this.cursorPosition.x = this.mousePosition.x
        } else {
          this.cursorPosition.x += (this.mousePosition.x - this.cursorPosition.x) * this.ease
        }

        if (Math.abs(this.mousePosition.y - this.cursorPosition.y) < 1) {
          this.cursorPosition.y = this.mousePosition.y
        } else {
          this.cursorPosition.y += (this.mousePosition.y - this.cursorPosition.y) * this.ease
        }

        const { x, y } = this.cursorPosition
        this.$refs.cursorPointer.style.transform = `translate3d(${x}px,${y}px,0)`
      },
    },

    mounted() {
      window.addEventListener('mousemove', this.onMouseMove)
      this.cursorRequestID = window.requestAnimationFrame(this.updateCursor)
    },

    destroyed() {
      window.removeEventListener('mousemove', this.onMouseMove)
      window.cancelAnimationFrame(this.cursorRequestID)
    }
  }
</script>

<style scoped lang="scss">
  .cursor {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
  }

  .cursor_pointer {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
  }
</style>
