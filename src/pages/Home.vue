<template>
  <!-- the child components/objects of the current component -->
  <div>
    <p>Original message: "{{ message }}"</p>
    <p>Computed reversed message: "{{ reversedMessage }}"</p>
    <a href="" @click.prevent="handleClick">click</a>
    <!-- accessing during evaluation -->
    <db-table ref="table"
              :column-name-field="{ prop: ['id', 'name'], name: ['供应商ID', '供应商名称']}"
              :pages="{src: pageSrc, multiple: true}"
              selection
              :row-class-name="['row-1', 'row-2']"
              index
              stripe>
    </db-table>
    <el-button @click="handleQuery">query a list of attributes</el-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'element-ui'
import DbTable from '@/components/DbTable'

Vue.use(Button)
/* private ins fields & methods */

export default {
  name: 'Home',
  components: {DbTable},
  created () {
    // this.getBrand()
  },
  /* public instance methods */
  methods: {
    getBrand () {
    },
    handleClick () {
      this.message = 'world'
    },
    handleQuery () {
      /* interface testing: validate from the code; subdomains of their inputs; codomains of their outputs */
      // console.log(this.$refs['table'].queryAttributes('id', 'name'))
      // console.log(this.$refs['table'].queryAttributes())
      // console.log(this.$refs['table'].queryTuples(0, 1))
      // console.log(this.$refs.table.queryTuples())
      // console.log(this.$refs['table'].queryTable())
      // console.log(this.$refs['table'].setAttributes({name: ['Alex', 'Violate']}))
      /*
        subdomain division:
          {},
          {name: []}
      */
      // console.log(this.$refs.table.setAttributes({}))
      // console.log(this.$refs.table.setAttributes({name: []}))
      /*
        subdomain division:
        {}
      */

      console.log(this.$refs['table'].setTuple({index: 9, row: {id: 996, name: 'Alex'}}))
      // console.log(this.$refs['table'].setTuple({index: 10, row: {id: 996}}))
      // console.log(this.$refs['table'].deleteAttributes('id', 'sex'))
      // console.log(this.$refs['table'].deleteAttributes('id', 'name'))
      // console.log(this.$refs['table'].deleteTuples(1, 2))
      // console.log(this.$refs['table'].getCols())
    }
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  },
  watch: {
  },
  /* public instance fields */
  data () {
    return {
      message: 'Hello',
      tableData: [],
      cols: {},
      pageSrc: 'http://daily.qundian.elephtribe.com/api/procurement/wxhc/supplier/query'
    }
  }
}
</script>

<style scoped>

</style>
