<!--
 Encapsulation:
  table, table attribute/tuple operations
  user interactions

 Separation:
  table styles, views, data

 Exposure:
  table attribute/tuple interfaces
-->
<template>
  <!-- the children components/objects of DbTable components -->
  <!-- access during evaluation -->
  <div>
    <el-table :data="table">

      <el-table-column v-if="selection" type="selection" align="center"></el-table-column>
      <el-table-column v-if="index" type="index" label="序号" align="center"></el-table-column>
      <el-table-column
        v-for="item in getCols"
        :label="item.name"
        :prop="item.prop"
        align="center">
      </el-table-column>
      <el-table-column label="操作">
      </el-table-column>
    </el-table>

    <div v-if="pages.multiple">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="10"
        @current-change="handlePage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { TableColumn, Table, Pagination } from 'element-ui'
import ajax from '@/libs/http/ajax' // default export; single function

Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Pagination)

/* private instance fields & methods */

export default {
  name: 'DbTable',
  /* register the structures of the components */
  components: {},
  /* public interfaces; constructor parameters */
  props: {
    /**
     * A list of column fields & names, from part of
     * the returning fields of the HTTP response body, mostly.
     * Furthermore, some of them need to be re-computed.
     *
     * [
     *  props: [String] // column fields
     *  names: [String] // column names
     * ]
     */
    columnNameField: {
      required: true,
      type: Object
    },
    /**
     * {
     *  src: '', // URL to get the table data
     *  multiple: true // enable mutiple pages
     * }
     */
    pages: {
      type: Object,
      default: {
        multiple: false
      }
    },
    selection: {
      type: Boolean
    },
    index: {
      type: Boolean
    },
    management: {
      type: Boolean
    },
    headStyle: [Object],
    bodyStyle: [Object]
  },
  /* lifecycle hooks */
  created () {
    this.getPage()
  },
  /* public instance methods */
  methods: {
    // creator
    getPage (pageNo = 1) {
      const self = this

      ajax({
        method: 'POST',
        url: self.pages.src,
        data: {
          pageNo, // object initializer; shorthand property name
          pageSize: 10
        },
        success: (resBody) => {
          self.table = resBody.entry
          self.page.total = 10 // Math.ceil(resBody.count / self.page.size)
        }
      })
    },
    // observer
    /**
     * Query a sequence of attributes of a table using a set of attribute names.
     * if there is no parameter names in the parameter list, throw an exception.
     * otherwise, return the part of the table using the set of attributes
     *
     * @param ...attrs {...String} attributes with an indefinite number
     */
    queryAttributes (...attrs) {
      // verify the attributes
      // array iteration
      const self = this

      attrs.forEach(attr => {
        let exist = false
        self.colNameField.forEach(field => {
          if (attr === field.prop) exist = true
        })
        // precondition: all items of the list are iterated
        // loop universe idiom
        if (!exist) {
          console.error(`The attribute ${attr} is not existed.`, 'DbTable.vue')
          return false
        }
      })

      const obj = {}
      // reset parameter iteration
      attrs.forEach(attr => {
        obj[attr] = []

        self.table.forEach(item => {
          obj[attr].push(item[attr])
        })
      })

      return obj
    },
    /**
     * Query a sequence of tuples of a table using a set of row IDs.
     *
     * @param ...rowIDs {...String} IDs with an indefinite number
     */
    queryTuples (...rowIDs) {
      // loop existence idiom
      rowIDs.forEach(ID => {
        if (ID < 0 || ID > this.table.length - 1) {
          console.error(`The row ${ID} is not existed.`, 'DbTable.vue')
          return false
        }
      })

      const arr = []

      for (let i = 0; i < rowIDs.length; i++) {
        const row = this.table[rowIDs[i]]
        arr.push(row)
      }

      return arr
    },
    /**
     * Query tables using the serial number of a table, starting from No. 1.
     * Such as:
     *  queryTable(2) // query the table data of No. 2
     *
     * @param [pageNo {Number} the serial number
     */
    queryTable (pageNo = 1) {
      // reset parameter array
      return this.table
    },
    // user interactions
    handlePage (pageNo) {
      this.getPage(pageNo)
    }
  },
  /* template expressions */
  computed: {
    getCols () { // a function to be called; when the property(s) is mutated; props, data properties
      const props = this.columnNameField.props // event source: when the object is accessed/mutated
      const names = this.columnNameField.names
      const arr = []

      if (props) { // the object exists
        // create a list of objects; compound values
        for (let i = 0; i < props.length; i++) {
          arr.push({ // compounds, mutable values
            prop: props[i],
            name: names[i]
          })

          // arr.push(tmp) add the same object, twice
          // add the two different objects
        }
      }

      return this.colNameField = arr
    }

  },
  /* watch data changes */
  /*
   * iterate & read the properties(dependency-tracking);
   * as event sources
   * listen props interfaces(change-notification)
   */
  watch: {
    tableData () { // a function to be called; when the property is accessed/mutated
    }
  },
  /* public instance fields */
  data () {
    /* init the component fields */

    /* public ins fields */
    return {
      /* access data to init the component */
      colNameField: [],
      table: [],
      page: {
        size: 10,
        No: 1,
        total: 10
      }
    }
  }
}
</script>

<!-- Mix the global & local component styles -->
<style>

</style>
<style scoped>

</style>
