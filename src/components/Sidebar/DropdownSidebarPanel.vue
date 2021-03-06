<template>
  <div v-if="isInSidebar">
    <template v-for="({text, value}, index) in options">
      <router-link :to="{name: $route.name, query: generateQuery(value)}"
                   :key="value" class="option" :replace="replace"
                   :class="{selected: selectedIndex === index}" @click.native="onClick(index)">
        {{text}}
      </router-link>
      <hr v-if="index < options.length - 1"
          class="options-divider" :key="`${value} divider`"/>
    </template>
  </div>
  <b-dropdown :text="options[selectedIndex].text" variant="link" right v-else>
    <template v-for="({text, value}, index) in options">
      <b-dropdown-item :to="{name: $route.name, query: generateQuery(value)}"
                       :key="value" :replace="replace"
                       :disabled="selectedIndex === index" @click.native="onClick(index)">
        {{text}}
      </b-dropdown-item>
      <b-dropdown-divider v-if="index < options.length - 1"
          :key="`${value} divider`"/>
    </template>
  </b-dropdown>
</template>

<script lang="ts">
  import {
    Component, Prop, Watch, Vue,
  } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import SidebarPanelMixin from '@/mixins/SidebarPanel';

  @Component({
    components: {
    },
  })
  class DropdownSidebarPanel extends mixins(SidebarPanelMixin) {
    @Prop({ required: true })
    options!: {text: string, value: string}[];

    @Prop({ required: true })
    paramName!: string;

    @Prop({ default: false })
    replace!: boolean;

    selectedIndex = 0;

    @Watch('$route')
    readFromQuery() {
      const data = this.$route.query[this.paramName];
      if (data && typeof data === 'string') {
        this.selectedIndex = this.options.map(option => option.value).indexOf(data);
      }
    }

    created() {
      this.readFromQuery();
    }

    onClick(index: number) {
      this.selectedIndex = index;
    }

    generateQuery(value: string) {
      const query = { ...this.$route.query };
      query[this.paramName] = value;
      return query;
    }
  }

  export interface Option {
    value: string;
    text: string;
  }
  export default DropdownSidebarPanel;
</script>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

.options-divider {
  border-color: $white;
  opacity: 0.15;
  margin: 0.625rem 0;
}

.option {
  padding-left: 0.25rem;
  color: $white;
  font-weight: bold;
  opacity: 0.5;
  cursor: pointer;
}

.selected {
  opacity: 1;
}
</style>
