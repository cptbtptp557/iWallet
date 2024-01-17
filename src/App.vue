<template>
  <p class="accountName">accountName1公钥</p>
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
</template>

<script setup>
import {shallowRef} from "vue";
import home from './components/home/home.vue';
import setUp from "./components/setUp/setUp.vue";

import {
  House,
  Setting,
} from '@element-plus/icons-vue';

const showcasePage = shallowRef(setUp);
</script>

<style>
@import "App.less";
</style>
