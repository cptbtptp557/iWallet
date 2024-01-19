<template>
  <div class="outside">
    <div class="balance">
      <p>{{ balance }} GoerliETH</p>
      {{ amountTransaction }}
    </div>
    <div class="toolbar">
      <div class="public">
        <p>{{ thisPublicKeyFormer }}***{{ thisPublicKeyAfter }}</p>
        <el-tooltip content="复制">
          <el-button circle size="large" @click="copy(publicKey)">
            <el-icon>
              <DocumentCopy/>
            </el-icon>
          </el-button>
        </el-tooltip>
      </div>
      <div class="actionBar">
        <el-row>
          <el-tooltip content="转账">
            <el-button size="large" circle style="transform: rotate(90deg)">
              <el-icon>
                <Sort/>
              </el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip content="刷新">
            <el-button size="large" circle style="transform: rotate(90deg)" @click="refreshPage">
              <el-icon>
                <RefreshRight/>
              </el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip content="添加代币">
            <el-button size="large" circle style="transform: rotate(90deg)">
              <el-icon>
                <Plus/>
              </el-icon>
            </el-button>
          </el-tooltip>
        </el-row>
      </div>
    </div>
    <el-divider/>
    <div class="dataDisplay">
      <el-table :data="transactionHistory" max-height="350" :current-row-key="key">
        <el-table-column prop="tradingResults" label="交易结果" width="200"/>
        <el-table-column prop="value" label="交易金额" width="300">
          <template #default="{row}">
            <span>{{ row.value }}</span>
            <span> GoerliETH</span>
          </template>
        </el-table-column>
        <el-table-column prop="block_timestamp" label="交易时间">
          <template #default="{row}">
            <span>
              {{
                row.block_timestamp.slice(0, -5).substring(0, 10) + "  " + row.block_timestamp.slice(0, -5).substring(11)
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="更多数据" width="150">
          <template #default="{row}">
            <el-button @click="moreLists = true; getThisKey(row)">
              更多数据
              <el-icon>
                <Right/>
              </el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog v-model="moreLists" title="详细数据">
        <h2>
          <span @click="copy(key.from_address)">{{
              key.from_address.slice(0, 8)
            }}***{{ key.from_address.slice(key.from_address.length - 4) }}</span>
          <el-icon>
            <Right/>
          </el-icon>
          <span @click="copy(key.to_address)">{{
              key.to_address.slice(0, 8)
            }}***{{ key.to_address.slice(key.to_address.length - 4) }}</span>
        </h2>
        <table>
          <tr>
            <td>Nonce:{{ key.nonce }}</td>
            <td>数额:{{ key.value }} GoerliETH</td>
          </tr>
          <tr>
            <td>燃料限制:{{ key.gas }}</td>
            <td>燃料价格:{{ Web3.utils.fromWei(key.gas_price, "gwei") }}</td>
          </tr>
        </table>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import {home} from './home.js';
import {Sort, RefreshRight, Plus, Right, DocumentCopy} from "@element-plus/icons-vue";
import Web3 from "web3";

const {
  transactionHistory,
  balance,
  publicKey,
  copy,
  refreshPage,
  thisPublicKeyFormer,
  thisPublicKeyAfter,
  amountTransaction,
  moreLists,
  key,
  getThisKey
} = home();
</script>

<style scoped>
@import "home.less";
</style>
