<template
  ><div>
    <div class="d-flex">
      <PlayerHeaderImage :pageData="pageData" />
      <div class="player-details">
        <PlayerHeaderTopRow :pageData="pageData" @submit-data="submit" />
        <div class="d-none d-sm-block">
          <div class="d-flex justify-content-between">
            <p>{{ $t('edit-profile:replace-image-details') }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="d-block d-sm-none">
      <div class="d-flex flex-wrap justify-content-between">
        <p>{{ $t('edit-profile:replace-image-details') }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Prop } from 'vue-property-decorator';
  import PlayerHeaderImage from './PlayerHeaderImage.vue';
  import PlayerHeaderTopRow from './PlayerHeaderTopRow.vue';
  import PlayerHeaderIcons from './PlayerHeaderIcons.vue';

  @Component({
    components: { PlayerHeaderImage, PlayerHeaderIcons, PlayerHeaderTopRow },
  })
  export default class PlayerHeader extends Vue {
    @Prop({ required: true }) pageData!: object;

    submit() {
      this.$emit('submit-data');
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';

  .player-details {
    margin-top: 20px;
    width: 100%;
  }
</style>
