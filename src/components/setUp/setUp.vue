<template>
  <div class="actionBox">
    <input type="button" value="退出登录"><br>
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
        <h2>私钥:<span>私钥</span></h2>
        <h2>公钥:<span>公钥</span></h2>
        <input type="button" value="完成" @click="cancelClick">
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import {ref} from "vue";
import {ElMessageBox} from "element-plus";

const createAccount = ref(false);
const timer = ref();

const cancelClick = () => {
  createAccount.value = false;
}

// 开始计时器，延迟五秒执行打印操作
const startTimer = () => {
  timer.value = setTimeout(() => {
    ElMessageBox.alert(
        '<h2 style="text-align: center">私钥</h2>',
        '私钥',
        {
          dangerouslyUseHTMLString: true,
        }
    )
  }, 1000);
};

// 取消计时器
const cancelTimer = () => {
  clearTimeout(timer.value);
};

</script>

<style scoped>
@import "setUp.less";
</style>