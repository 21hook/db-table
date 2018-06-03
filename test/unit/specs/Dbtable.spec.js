/* A testing suite for a Vue component */
import Vue from 'Vue'
import DbTable from '@/components/Dbtable'

describe('Datable.vue', () => {
  /* A set of testing cases for a testing suite */
  it('should render correct contents', () => {
    const Constructor = Vue.extend(DbTable) // construct a Vue subclass
    const table = new Constructor().$mount() // mount it

    console.log(table)
  })
})
