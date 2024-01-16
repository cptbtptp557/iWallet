<template>
<h1>{{isCollapse}}</h1>
</template>

<script setup>
import {home} from './home.js';

const {isCollapse} = home();
</script>

<style>
@import "home.less";
</style>
