<template>
  <div v-if="publicKey">
    <p class="accountName">{{ publicKey.slice(0, 6) }} *** {{ publicKey.slice(publicKey.length - 4) }}</p>
    <el-menu class="el-menu-vertical-demo">
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <House/>
          </el-icon>
          <span>首页</span>
        </template>
        <label from="home">
          <el-menu-item-group>
            <el-menu-item index="1-1" :style="{ color: showcasePage === home ? '#3f9dfd' : '' }">展示页</el-menu-item>
            <input type="radio" v-model="showcasePage" :value="home" id="home" style="display: none">
          </el-menu-item-group>
        </label>
      </el-sub-menu>
      <label from="setUp">
        <el-menu-item index="2" :style="{ color: showcasePage === setUp ? '#3f9dfd' : '' }">
          <input type="radio" v-model="showcasePage" :value="setUp" id="setUp" style="display: none">
          <el-icon>
            <Setting/>
          </el-icon>
          <template #title>设置</template>
        </el-menu-item>
      </label>
    </el-menu>

    <keep-alive class="show">
      <component :is="showcasePage"></component>
    </keep-alive>
  </div>
  <login v-else/>
</template>

<script setup>
import home from './components/home/home.vue';
import setUp from "./components/setUp/setUp.vue";
import login from "./components/login/login.vue";

import {ref, shallowRef} from "vue";
import {
  House,
  Setting,
} from '@element-plus/icons-vue';

const showcasePage = shallowRef(home);
const publicKey = ref(document.cookie.split('=')[1]);
</script>

<style>
@import "App.less";
</style>
