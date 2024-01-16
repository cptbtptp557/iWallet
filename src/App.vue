<template>
  <p class="accountName">accountName1</p>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <House/>
        </el-icon>
        <span>首页</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-3">展示页</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="4">
      <el-icon>
        <setting/>
      </el-icon>
      <template #title>设置</template>
    </el-menu-item>
  </el-menu>

  <keep-alive class="show">
    <component :is="home"></component>
  </keep-alive>
</template>

<script setup>
import home from './components/home/home.vue'

import {
  House,
  Setting,
} from '@element-plus/icons-vue'
import {ref} from "vue";

const isCollapse = ref(false);
</script>

<style>
@import "App.less";
</style>
