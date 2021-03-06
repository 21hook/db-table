/* A testing suite for a Vue component */
import Vue from 'vue'
import Home from 'src/pages/Home';

describe('Home.vue', () => {
  /* A set of testing cases for a testing suite */
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home) // construct a Vue subclass
    const vm = new Constructor().$mount() // mount it

    expect(vm.$el.querySelector('.form-login label').textContent) // get the specified element from the vue root elt
      .toEqual('邮箱')
  })
  it('render correct contents', () => {
    const Constructor = Vue.extend(Login)
    const vm = new Constructor().$mount()

    expect(vm.$el.querySelectorAll('.form-login label')[1].textContent)
      .toEqual('密码')
  })
})
