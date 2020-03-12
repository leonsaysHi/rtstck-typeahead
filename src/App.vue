<template>
  <div id="app">
    <div class="container">
      <p>Typeahead select, relies on lodash end vue-bootstrap</p>
      <h2>Static</h2>
      <input-typeahead
        v-model="staticValue"
        :options="staticOptions"
        :allowFreetext="allowFreetext"
      />
      <code>{{ staticValue }}</code>
      <h2>API</h2>
      <input-typeahead
        v-model="apiValue"
        :options="getAsyncOptions"
        :allowFreetext="allowFreetext"
      />
      <code>{{ apiValue }}</code>
      <h3>Options</h3>
      <b-button @click="setValue">Set value</b-button>
      <b-button @click="resetValue">Reset value</b-button>
      <b-form-checkbox
      v-model="allowFreetext"
      :value="true"
      :unchecked-value="false"
    >
      Allow free text.
    </b-form-checkbox>
    </div>
  </div>
</template>

<script>
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'App',
  data() {
    return {
      allowFreetext: true,
      staticValue: null,
      staticOptions:[
        { text: 'Canada', value: 'ca' },
        { text: 'United States', value: 'us' },
        { text: 'Mexico', value: 'me' }
      ],
      apiValue: null,
    }
  },
  methods:{
    setValue() {
      this.staticValue = this.staticOptions[1]
      this.apiValue = this.staticOptions[1]
    },
    resetValue() {
      this.staticValue = null
      this.apiValue = null
    },
    getAsyncOptions(){
      const resp = this.staticOptions
      return new Promise( (res) => {
        setTimeout(()=> {
          res(resp)
        }, 750)
      })
    }
  },
}
</script>

<style lang="scss">
$enable-gradients: true;

@import 'bootstrap/scss/bootstrap.scss';

pre {
  border: 1px solid $border-color;
  border-radius: $border-radius-lg;
  padding-left: 1rem;
  padding-right: 1rem;
  @extend .shadow-sm;
}
</style>
