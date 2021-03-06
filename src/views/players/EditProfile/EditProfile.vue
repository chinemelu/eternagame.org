<template>
  <EternaPage v-if="pageData" title="Player Profile">
    <div class="page-content">
      <PlayerHeader :pageData="user" @submit-data="submit" />
      <hr class="top-border" />
      <PlayerAboutMe :pageData="user" />
      <hr class="top-border" />
      <PlayerEditCredentials
        :pageData="pageData"
        @set-password="setPassword"
        @set-news="setNews"
        @set-messages="setMessages"
      />
      <div class="flex" style="margin-top:10px">
        <b-button type="submit" style="margin-left:10px" variant="primary" @click="submit">{{
          $t('edit-profile:save')
        }}</b-button>
        <b-button
          type="submit"
          style="margin-left:10px"
          variant="outline-secondary"
          @click="cancel"
          >{{ $t('edit-profile:cancel') }}</b-button
        >
      </div>
    </div>

    <template #sidebar="{ isInSidebar }">
      <DropdownSidebarPanel
        :options="options"
        paramName="sort"
        replace
        :isInSidebar="isInSidebar"
      />
    </template>
  </EternaPage>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import { RouteCallback, Route } from 'vue-router';
  import { AxiosInstance } from 'axios';
  import EternaPage from '@/components/PageLayout/EternaPage.vue';
  import DropdownSidebarPanel, { Option } from '@/components/Sidebar/DropdownSidebarPanel.vue';
  import PageDataMixin from '@/mixins/PageData';
  // @ts-ignore
  import get from 'lodash.get';
  import PlayerHeader from './components/PlayerHeader.vue';
  import PlayerAboutMe from './components/PlayerAboutMe.vue';
  import PlayerEditCredentials from './components/PlayerEditCredentials.vue';

  async function fetchPageData(route: Route, http: AxiosInstance) {
    return (await http.get(`/get/?type=user&uid=${route.params.uid}`)).data.data;
  }

  @Component({
    components: {
      EternaPage,
      DropdownSidebarPanel,
      PlayerHeader,
      PlayerAboutMe,
      PlayerEditCredentials,
    },
  })
  export default class EditProfile extends Mixins(PageDataMixin(fetchPageData)) {
    get user() {
      return this.pageData.user;
    }

    submit() {
      alert('submitting');
    }

    setPassword(password: string) {
      this.newPassword = password;
    }

    setNews(notify: boolean) {
      this.newNewsPostsNotify = notify;
    }

    setMessages(notify: boolean) {
      this.privateMessagesNotify = notify;
    }

    cancel() {
      this.newAboutMeText = '';
      this.newPassword = '';
      this.privateMessagesNotify = get(this, 'pageData.privateMessageEmailNotifications');
      this.newNewsPostsNotify = get(this, 'pageData.newNewsPostsEmailNotifications');
    }

    private newAboutMeText: string = '';

    private newPassword: string = '';

    private privateMessagesNotify: boolean = get(this, 'pageData.privateMessageEmailNotifications');

    private newNewsPostsNotify: boolean = get(this, 'pageData.newNewsPostsEmailNotifications');

    private options: Option[] = [
      { value: 'about', text: 'About' },
      { value: 'achievements', text: 'Achievements' },
      { value: 'synthesized', text: 'Synthesized RNAs' },
      { value: 'latest', text: 'Latest Activity' },
      { value: 'created', text: 'Created Puzzles' },
    ];
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/global.scss';
</style>
