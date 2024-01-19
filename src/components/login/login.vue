<template>
  <div class="outside">
    <div v-if="!cookie">
      <label>
        公钥:
        <input type="text" v-model="publicKey">
      </label>
      <input type="button" value="登录" @click="getCookiePublicKey">
    </div>
    <div v-else>
      <label>
        密码:
        <input type="text" v-model="password">
      </label>
      <input type="button" value="登录" @click="getCookiePassword">
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {ElMessageBox} from "element-plus";

const publicKey = ref('');
const password = ref('');

// 获取名为"publicKey"的cookie
let cookie = document.cookie.split(";")[1];
if (cookie) {
  publicKey.value = cookie.slice(11);
} else {
  console.log("Cookie 'publicKey' not found");
}
const getCookiePublicKey = () => {
  const pattern = /^0x.{40}$/;
  if (pattern.test(publicKey.value)) {
    document.cookie = 'publicKey= ' + publicKey.value;
    location.reload();
  } else {
    ElMessageBox.alert(
        '<h2 style="text-align: center">请输入正确的公钥</h2>',
        {
          dangerouslyUseHTMLString: true,
        }
    )
  }
}

const getCookiePassword = () => {
  if (!(password.value.length <= 6)) {
    document.cookie = 'password = ' + password.value;
    location.reload();
  } else {
    ElMessageBox.alert(
        '<h2 style="text-align: center">请输入正确的密码</h2>',
        {
          dangerouslyUseHTMLString: true,
        }
    )
  }
}
</script>

<style scoped>
@import "login.less";
</style>