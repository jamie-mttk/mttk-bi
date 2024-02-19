<script lang="ts">
import { ref, h, withDirectives, resolveDirective, resolveComponent } from 'vue';
import {app} from '../../main'
export default {
  props: {
    config: Object,
    test: Boolean,
  },
  setup(props, { emit }) {
    //
    const vvv = ref('test')
    const aaa = ref()
    //
    const comp = resolveComponent('ElInput');
    //
    const pin = {
      mounted() { console.log('mounted>>>>>>>>>>>>>>>>>>>>>>>:', arguments) },
      updated() { console.log('unmounted<<<<<<<<<<<<<<<<<<<<:', arguments) }
    }
    //app.directive('abc',pin);
    //const efg=resolveDirective('abc');
    console.log(resolveDirective('show'));
    //
    //const showDirective = resolveDirective('v-show');
    // console.log(showDirective);
    // return () => h(props.config['~'], {}, ['aa', props.test ? h('div', 'HAHA') : undefined]);
    return () =>
      h('div', {}, [
        h('div', { style: { color: props.test ? 'red' : 'blue' } }, 'JJJJJJJJJJJJJJJJJJJJJJJ'),
        h(comp, {
          ref: aaa,
          modelValue: vvv.value,
          'onUpdate:modelValue': (value) => { vvv.value = value },
          onChange() {
            console.log(arguments)
          },
        }),
        'bb:' + aaa.value,
        withDirectives(h('div',{},'WITH DIRECTIVE'), [
          [pin, 200, 'top', { animate: true }]
        ])
      ]);
  },
};
</script>
