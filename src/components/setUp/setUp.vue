<template>
  <div class="actionBox">
    <input type="button" value="退出登录" @click="signOut"><br>
    <input type="button" value="创建账户" @click="createAccount = true"><br>
    <input type="button" value="显示私钥" @mousedown="startTimer" @mouseup="cancelTimer"><br>
  </div>
  <el-drawer v-model="createAccount" :direction="'rtl'" size="1000" :close-on-click-modal="false" :show-close="false">
    <template #default>
      <div class="mnemonic" style="display: none">
        <table class="displaySeedPhrase">
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
        </table>
        <h1>请保存助记词</h1>
        <input type="button" value="已保存">
      </div>

      <div class="information">
        <div>
          <label>
            密码:
            <input type="text" placeholder="请输入密码">
          </label>
          <input type="button" value="确认">
        </div>
        <div>
          <h2>私钥:<span>私钥</span></h2>
          <h2>公钥:<span>公钥</span></h2>
          <input type="button" value="完成" @click="cancelClick">
        </div>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import {setUp} from "./setUp.js";

const {
  createAccount,
  cancelClick,
  startTimer,
  cancelTimer,
  signOut
} = setUp();
</script>

<style scoped>
@import "setUp.less";
</style>