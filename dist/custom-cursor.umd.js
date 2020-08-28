(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.CustomCursor = {}));
}(this, (function (exports) { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
    name: 'CustomCursor',

    props: {
      ease: {
        type: Number,
        default: 0.2,
      },
    },

    data: function data() {
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
      onMouseMove: function onMouseMove(e) {
        this.mousePosition.x = e.clientX;
        this.mousePosition.y = e.clientY;
      },

      updateCursor: function updateCursor() {
        this.cursorRequestID = window.requestAnimationFrame(this.updateCursor);

        if (Math.abs(this.mousePosition.x - this.cursorPosition.x) < 1) {
          this.cursorPosition.x = this.mousePosition.x;
        } else {
          this.cursorPosition.x += (this.mousePosition.x - this.cursorPosition.x) * this.ease;
        }

        if (Math.abs(this.mousePosition.y - this.cursorPosition.y) < 1) {
          this.cursorPosition.y = this.mousePosition.y;
        } else {
          this.cursorPosition.y += (this.mousePosition.y - this.cursorPosition.y) * this.ease;
        }

        var ref = this.cursorPosition;
        var x = ref.x;
        var y = ref.y;
        this.$refs.cursorPointer.style.transform = "translate3d(" + x + "px," + y + "px,0)";
      },
    },

    mounted: function mounted() {
      window.addEventListener('mousemove', this.onMouseMove);
      this.cursorRequestID = window.requestAnimationFrame(this.updateCursor);
    },

    destroyed: function destroyed() {
      window.removeEventListener('mousemove', this.onMouseMove);
      window.cancelAnimationFrame(this.cursorRequestID);
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      var hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return function (id, style) { return addStyle(id, style); };
  }
  var HEAD;
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          var code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  { style.element.setAttribute('media', css.media); }
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  { style.element.removeChild(nodes[index]); }
              if (nodes.length)
                  { style.element.insertBefore(textNode, nodes[index]); }
              else
                  { style.element.appendChild(textNode); }
          }
      }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "cursor" }, [
      _c(
        "div",
        { ref: "cursorPointer", staticClass: "cursor_pointer" },
        [_vm._t("default")],
        2
      )
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-99e73426_0", { source: ".cursor[data-v-99e73426] {\n  position: fixed;\n  z-index: 1000;\n  left: 0;\n  top: 0;\n}\n.cursor_pointer[data-v-99e73426] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  pointer-events: none;\n}\n\n/*# sourceMappingURL=CustomCursor.vue.map */", map: {"version":3,"sources":["/Users/a110/Documents/self/vue-custom-cursor/src/CustomCursor.vue","CustomCursor.vue"],"names":[],"mappings":"AAuEA;EACA,eAAA;EACA,aAAA;EACA,OAAA;EACA,MAAA;ACtEA;ADyEA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,oBAAA;ACtEA;;AAEA,2CAA2C","file":"CustomCursor.vue","sourcesContent":["<template>\n  <div class=\"cursor\">\n    <div class=\"cursor_pointer\" ref=\"cursorPointer\">\n      <slot></slot>\n    </div>\n  </div>\n</template>\n\n<script>\n  export default {\n    name: 'CustomCursor',\n\n    props: {\n      ease: {\n        type: Number,\n        default: 0.2,\n      },\n    },\n\n    data() {\n      return {\n        mousePosition: {\n          x: 0,\n          y: 0,\n        },\n        cursorPosition: {\n          x: 0,\n          y: 0,\n        },\n      }\n    },\n\n    methods: {\n      onMouseMove(e) {\n        this.mousePosition.x = e.clientX\n        this.mousePosition.y = e.clientY\n      },\n\n      updateCursor() {\n        this.cursorRequestID = window.requestAnimationFrame(this.updateCursor)\n\n        if (Math.abs(this.mousePosition.x - this.cursorPosition.x) < 1) {\n          this.cursorPosition.x = this.mousePosition.x\n        } else {\n          this.cursorPosition.x += (this.mousePosition.x - this.cursorPosition.x) * this.ease\n        }\n\n        if (Math.abs(this.mousePosition.y - this.cursorPosition.y) < 1) {\n          this.cursorPosition.y = this.mousePosition.y\n        } else {\n          this.cursorPosition.y += (this.mousePosition.y - this.cursorPosition.y) * this.ease\n        }\n\n        const { x, y } = this.cursorPosition\n        this.$refs.cursorPointer.style.transform = `translate3d(${x}px,${y}px,0)`\n      },\n    },\n\n    mounted() {\n      window.addEventListener('mousemove', this.onMouseMove)\n      this.cursorRequestID = window.requestAnimationFrame(this.updateCursor)\n    },\n\n    destroyed() {\n      window.removeEventListener('mousemove', this.onMouseMove)\n      window.cancelAnimationFrame(this.cursorRequestID)\n    }\n  }\n</script>\n\n<style scoped lang=\"scss\">\n  .cursor {\n    position: fixed;\n    z-index: 1000;\n    left: 0;\n    top: 0;\n  }\n\n  .cursor_pointer {\n    position: absolute;\n    left: 0;\n    top: 0;\n    pointer-events: none;\n  }\n</style>\n",".cursor {\n  position: fixed;\n  z-index: 1000;\n  left: 0;\n  top: 0;\n}\n\n.cursor_pointer {\n  position: absolute;\n  left: 0;\n  top: 0;\n  pointer-events: none;\n}\n\n/*# sourceMappingURL=CustomCursor.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-99e73426";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  // vue コンポーネントのインポート

  // Vue.use() によって実行される install 関数を定義
  function install(Vue) {
    if (install.installed) { return; }
    install.installed = true;
    Vue.component('CustomCursor', __vue_component__);
  }

  // Vue.use() のためのモジュール定義を作成
  // Create module definition for Vue.use()
  var plugin = {
    install: install,
  };

  // vue が見つかった場合に自動インストールする (ブラウザで <script> タグを用いた場合等)
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  exports.default = __vue_component__;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
