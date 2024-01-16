<template>
  <div class="outside">
    <div class="balance">
      <p>余额GoerliETH</p>
    </div>
    <div class="toolbar">
      <div class="public">
        <p>公钥</p>
      </div>
      <div class="actionBar">
        <el-row>
          <el-tooltip content="转账">
            <el-button :icon="Sort" size="large" circle style="transform: rotate(90deg)"/>
          </el-tooltip>
          <el-tooltip content="刷新">
            <el-button :icon="RefreshRight" size="large" circle style="transform: rotate(90deg)"/>
          </el-tooltip>
          <el-tooltip content="添加代币">
            <el-button :icon="Plus" size="large" circle style="transform: rotate(90deg)"/>
          </el-tooltip>
        </el-row>
      </div>
    </div>
    <el-divider/>
    <div class="dataDisplay">
      <el-table :data="lists" max-height="350" border>
        <el-table-column prop="tradingResults" label="交易结果" width="200"/>
        <el-table-column prop="amountTransaction" label="交易金额" width="300"/>
        <el-table-column prop="tradingHours" label="交易时间"/>
        <el-table-column label="更多数据">
          <el-button>更多数据
            <el-icon>
              <Right/>
            </el-icon>
          </el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import {home} from './home.js';
import {Sort, RefreshRight, Plus, Right} from "@element-plus/icons-vue";
import {ref} from "vue";

const {isCollapse} = home();
const lists = ref([{
  tradingResults: '收款',
  amountTransaction: '0.234' + 'GoerliETH',
  tradingHours: new Date()
}])
</script>

<style scoped>
@import "home.less";
</style>
