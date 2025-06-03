<template>
  <div class="login">
    <h1>ログイン</h1>
    <label>
      ユーザー名：
      <input v-model="username" type="text" />
    </label>
    <button @click="login">ログイン</button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  const username = ref('');
  const router = useRouter('');

  const login = () => {
    if (username.value.trim() === '') {
      alert("ユーザー名を入力してください");
      return;
    }

    // ログイン状態を保存
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username.value);
    router.push("/form");
  };
</script>