<template>
  <div class="input-typeahead w-100">
    <div v-if="value && value.text" class="input-typeahead-selection form-control">
      <b-input-group>
        <b-form-input size="sm" :disabled="true" :value="value.text"></b-form-input>
        <b-input-group-append v-if="!disabled">
          <b-button size="sm" class="flex-grow-0" @click="reset">&times;</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
    <rtstck-typeahead-input ref="typeahead" v-else
      class="flex-grow-1"
      :value="inputedValue"
      @input="handleInput"
      :data="typeaheadOptions"
      :serializer="serializer"
      :placeholder="placeholder"
      :disabled="disabled"
      :inputClass="inputClass"
      :minMatchingChars="minMatchingChars"
      :noResultString="noResultString"
      :isBusy="isBusy"
      @hit="handleHit"
    />
    <!-- @hit="$emit('input', $event)" -->
    <div class="spinner" :class="{'-show': displaySpinner}">
      <b-spinner data-html2canvas-ignore="true" small></b-spinner>
    </div>
  </div>
</template>

<script>
import RtstckTypeaheadInput from './RtstckTypeaheadInput'

export default {
  props: {
    value: {type: [String, Array, Object]},
    allowFreetext: {type: Boolean, default: true},
    placeholder: {type: String, default: null},
    disabled: {type: Boolean, default: false},
    state: { type: Boolean, default: null},
    serializer: {type: Function, default: s => s.text},
    options: {type: [Array, Function], default: ()=>([])},
    minMatchingChars: {type: Number, default: 1},
    noResultString: {type: String, default: 'No result' },
  },
  components: {
    RtstckTypeaheadInput
  },
  data() {
    return {
      inputedValue: '',
      isBusy: false,
      typeaheadOptions: [],
    }
  },
  created() {
    if (_.isArray(this.options)) {
      this.typeaheadOptions = this.options
    }
    this.inputedValue = _.isString(this.value) ? this.value : _.get(this.value, 'text', '')
  },
  computed: {
    handleQuery() {
      return _.debounce(
        (value) => {
          if (_.isArray(this.options)) { return }
          value = _.trim(value)
          if (value.length) {
            this.getSearchResults(value)
          }
          else {
            this.typeaheadOptions = []
          }
        },
        500
      )
    },
    displaySpinner() {
      return _.isString(this.value) && this.value.length && this.isBusy
    },
    inputClass() {
      return this.state === true ? 'is-valid' : this.state === false ? 'is-invalid' : null
    }
  },
  methods: {
    async getSearchResults(query) {
      if (_.isFunction(this.options)) {
        this.isBusy = true
        try {
          const results = await this.options(query)
          this.typeaheadOptions = results
        }
        finally {
          this.isBusy = false
        }
      }

    },
    handleInput(val) {
      if (!_.isArray(this.options)) {
        this.handleQuery(val)
      }
      if (this.allowFreetext) { this.$emit('input', val) }

    },
    handleHit(option) {
      this.$emit('input', option)
    },
    reset() {
      this.$emit('input', '')
      this.inputedValue = ''
    },
  },
};
</script>

<style lang="scss" scoped>
.input-typeahead {
  position: relative;
  .input-typeahead-selection {
    padding: .1rem;
    .form-control {
      border-color: #e9ecef;
      padding-top: .5rem * .5;
    }
  }
  .no-event { pointer-events: none }
  .spinner {
    pointer-events: none;
    position: absolute;
    z-index: 10;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6c757d;
    transition: .3s opacity;
    opacity: 0;
    &.-show {
      opacity: 1;
      transition: none;
    }
  }
}
</style>
