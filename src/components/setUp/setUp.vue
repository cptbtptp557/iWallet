<template>
  <div class="actionBox">
    <input type="button" value="退出登录" @click="signOut"><br>
    <input type="button" value="创建账户" @click="generateMnemonic"><br>
    <input type="button" value="显示私钥" @mousedown="startTimer" @mouseup="cancelTimer"><br>
  </div>
  <el-drawer v-model="createAccountBool" :direction="'rtl'" size="1000" :close-on-click-modal="false"
             :show-close="false">
    <template #default>
      <div class="mnemonic" v-if="saveMnemonic">
        <table id="showThisMnemonic">
          <tr v-for="(row, rowIndex) in thisMnemonic" :key="rowIndex">
            <td v-for="(item, columnIndex) in row" :key="columnIndex">{{ item }}</td>
          </tr>
        </table>
        <h1>请保存助记词</h1>
        <input type="button" value="已保存" @click="saveMnemonic = false">
      </div>

      <div class="information" v-else>
        <div v-if="!publicKey">
          <label>
            密码:
            <input type="text" placeholder="请输入密码" v-model="password">
          </label>
          <h2 class="formatWarnings" v-if="formatWarningsState === 'none'">请输入正确的密码格式!!!(首字母大写,6到20位)</h2>
          <input type="button" value="确认" @click="putInPassword">
        </div>

        <div v-else>
          <h2>私钥:<span>{{ publicKey }}</span></h2>
          <h2>公钥:<span>{{ privateKey }}</span></h2>
          <input type="button" value="完成" @click="cancelClick">
        </div>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import {setUp} from "./setUp.js";

const {
  createAccountBool,
  startTimer,
  cancelTimer,
  signOut,
  cancelClick,
  saveMnemonic,
  generateMnemonic,
  thisMnemonic,
  putInPassword,
  password,
  publicKey,
  privateKey,
  formatWarningsState
} = setUp();
</script>

<style scoped>
@import "setUp.less";
</style>