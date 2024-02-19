<script lang="ts">
import { ref, h, withDirectives, resolveDirective, resolveComponent } from 'vue';
import { app } from '../../main'
export default {
  props: {
    config: Object,
    test: Boolean,
  },
  setup(props, { emit }) {

    //
    const  m1=resolveComponent('ElTable');
    const  m2=resolveComponent('ElTableColumn');
    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ]

    return () =>
      h(m1, {data:tableData},[
        h(m2,{ prop:"date", label:"Date"}),
        h(m2,{ prop:"name", label:"Name"}),
        h(m2,{ prop:"address", label:"Address"}),
      ])}
};
</script>
