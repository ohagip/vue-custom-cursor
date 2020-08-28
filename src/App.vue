<template>
  <div id="app">
    <div
      class="hoverBtn"
      @mouseover="changeCursorType('hover')"
      @mouseleave="changeCursorType('default')"
    >Hover</div>
    <CustomCursor ref="cursor" :ease="0.2">
      <div class="defaultCursor" :class="{ 'is-active': this.cursorType === 'default' }"></div>
      <div class="hoverCursor" :class="{ 'is-active': this.cursorType === 'hover' }"></div>
    </CustomCursor>
  </div>
</template>

<script>
import Tweakpane from 'tweakpane'
import CustomCursor from './components/CustomCursor'

export default {
  name: 'App',

  components: {
    CustomCursor
  },

  data() {
    return {
      cursorType: 'default',
    }
  },

  methods: {
    changeCursorType(type) {
      this.cursorType = type
    }
  },

  mounted() {
    this.debugPane = new Tweakpane()
    this.cursorPane = this.debugPane.addFolder({ title: 'Cursor' })

    this.cursorPane.addInput(this.$refs.cursor, 'ease', {
      min: 0,
      max: 1,
      step: 0.01,
    })
  },

  destroyed() {
    this.debugPane.dispose();
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.hoverBtn {
  position: relative;
  padding: 4px;
  color: #000;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #000;
  }
}

.defaultCursor {
  position: absolute;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity .2s cubic-bezier(.445, .05, .55, .95);
}
.defaultCursor.is-active {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.hoverCursor {
  position: absolute;
  left: 0;
  top: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -50%) scale(0.4);
  opacity: 0;
  transition:
    opacity .2s cubic-bezier(.445, .05, .55, .95),
    transform .3s cubic-bezier(.15, 1.15, .75, 1.15);
}
.hoverCursor.is-active {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
</style>
