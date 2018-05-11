# db-table
A table component based on Vue.js &amp; element-ui

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

### Project Architecture
```
.
├── build/                      # webpack configs
│   └── build.js                # packagee configs
|   |__ webpack.base.conf.js    # 
|   |__ webpack.dev.conf.js     #  
|   |__ 
├── config/
│   ├── index.js                # project configs
│   └── ...
├── src/
│   ├── main.js                 # program entry file 
│   ├── App.vue                 # root component
│   ├── components/             # children components
│   │   └── 
|   |   |__ 
|   |   |__
|   |   |__ 
|   |   |__
|   |-- pages                   # pages 
|   |   |__ Login.vue 
|   |   |__ UserList.vue
|   |   |__ FoodList.vue
|   |   |__ OrderList.vue
|   |   |__ ShopList.vue
|   |   |__ AdminList.vue
|   |   |__ ManageShops.vue
|   |   |__ ManageFood.vue
|   |   |__ DataAnalysis.vue
|   |   |__ Editor.vue
|   |   |__ AdminSetting.vue
|   |   |__ BackgroundDetails.vue 
|   |-- utils                   # page utility functionality  
|   |__ router                  # page router   
|   |           
│   └── assets/                 # project assets (processed by webpack)
│       └── ...
├── static/                     # project assets (copied by developers)
├── test/
│   └── unit/                   # unit tests
│   │   ├── specs/              # test files
│   │   ├── eslintrc            # unit testing code style checking 
│   │   ├── index.js            # test runner entry file
│   │   ├── jest.conf.js        # configs for automated testing tool/test runner 
│   │   ├── setup.js            # test runner steup
│   └── e2e/                    # integration tests
│   │   ├── specs/              # test files
│   │   ├── custom-assertions/  # custom assertions for e2e tests
│   │   ├── runner.js           # test runner script
│   │   └── nightwatch.conf.js  # configs for test runner
├── .babelrc                    # languration processing configurations
├── .editorconfig               # indentation, spaces/tabs and similar settings for your editor
├── .eslintrc.js                # code style checking configurations
├── .eslintignore               # ignored files for code style checking 
├── .gitignore                  # ignored files for git 
├── .postcssrc.js               # postcss confirations
├── index.html                  # app template
├── package.json                # build scripts and module dependecies 
└── README.md                   # README file
 ```

### Dependency Modules
[element-ui](https://github.com/eleme/element-react)

[axios](https://github.com/axios/axios)

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
