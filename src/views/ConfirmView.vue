<template>
  <div class="confirm">
    <h1>入力内容の確認</h1>

    <p><strong>名前：</strong>{{ user.name }}</p>
    <p><strong>住所：</strong>{{ user.address }}</p>
    <p><strong>扶養人数：</strong>{{ user.dependents }} 人</p>

    <button @click="submitForm">送信</button>
    <button @click="backToForm">戻る</button>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router"
  import { useUserStore } from "@/stores/userStore"
  import axios from "axios"

  const router = useRouter();
  const user = useUserStore();

  const submitForm = async () => {
    try {
      const payload = {
        name: user.name,
        address: user.address,
        dependents: user.dependents,
      }

      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", payload)

      console.log("送信成功！レスポンス：", response.data);

      router.push("/complete")
    } catch (error) {
      console.error("送信エラー：", error);
      alert("送信に失敗しました…")
    }
  };

  const backToForm = () => {
    router.push("/form")
  };
</script>