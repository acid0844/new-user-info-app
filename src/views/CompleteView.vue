<template>
  <div class="complete">
    <h1>送信完了！</h1>
    <p>年末調整の情報を受け付けました！！</p>

    <button @click="backToForm">もう一度入力する</button>
  </div>
</template>

<script setup lang="ts">
 import { onMounted } from "vue"
  import { useRouter } from "vue-router";
  import { useUserStore } from "@/stores/userStore";

  const router = useRouter();
  const userStore = useUserStore();

  const backToForm = () => {
    userStore.updateName("");
    userStore.updateAddress("");
    userStore.updateDependents(0);
    router.push('/form');
  };

  onMounted(() => {
    localStorage.removeItem('user-info');
  });
</script>