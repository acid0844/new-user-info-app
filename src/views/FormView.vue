<template>
  <div class="form">
    <div v-if="isLoggedIn">
      <p>ようこそ、{{ username }}さん！</p>
      <button @click="logout">ログアウト</button>
    </div>
    <div v-else>
      <p>🔒 <strong style="color: red;">ログインしてください</strong></p>
      <button @click="logout">ログイン画面へ</button>
    </div>

    <h1>ユーザー情報の入力</h1>

    <label>
      名前：
      <input type="text" v-model="name" />
      <span style="color: red;">{{ nameError }}</span>
    </label>
    
    <label>
      住所：
      <input type="text" v-model="address" />
      <span style="color: red;">{{ addressError }}</span>
    </label>

    <label>
      扶養人数：
      <input 
        type="number" 
        v-model.number="dependents" 
        min="0" 
        required
        />
        <span style="color: red;">{{ dependentsError }}</span>
    </label>

    <button @click="handleNext">確認画面へ</button>

    <button @click="resetForm">フォームをリセット</button>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue"
  import { useRouter } from "vue-router"
  import { useUserStore } from "@/stores/userStore"

  const name = ref('');
  const address = ref('');
  const dependents = ref (0);

  const nameError = ref('');
  const addressError = ref('');
  const dependentsError = ref('');

  const router = useRouter();
  const userStore = useUserStore();

  const handleNext = () => {
    nameError.value = "";
    addressError.value = "";
    dependentsError.value = "";

    let hasError = false;

    if (!name.value.trim()) {
      nameError.value = "名前は必須です";
      hasError = true;
    };
    
    if (!address.value.trim()) {
      addressError.value = "住所は必須です"
      hasError = true;
    };

    const dep = dependents.value;
    
    if (
        dep === null || 
        dep === undefined || 
        // dep === '' || 
        isNaN(dep) || 
        dep < 0
      ) {
      dependentsError.value = "扶養人数は0以上の数値で入力してください"
      hasError = true;
    };

    if (hasError) return;

    // localStorageに保存
    const userData = {
      name: name.value,
      address: address.value,
      dependents: dependents.value,
    };

    localStorage.setItem("user-info", JSON.stringify(userData));

    // 入力情報を保存
    userStore.updateName(name.value);
    userStore.updateAddress(address.value);
    userStore.updateDependents(dependents.value);
    router.push('/confirm');
  };

  // ===============================================

  // ↓↓↓↓↓---localStorageに保存した情報をフォームに反映---↓↓↓↓↓
  onMounted(() => {
    const saved = localStorage.getItem("user-info");
    if (saved) {
      const parsed = JSON.parse(saved);
      name.value = parsed.name || "";
      address.value = parsed.address || "";
      dependents.value = parsed.dependents ?? 0;
    }
  });
  // ↑↑↑↑↑---localStorageに保存した情報をフォームに反映---↑↑↑↑↑

  // ===============================================

  // ↓↓↓↓↓---入力フォームをリセットする---↓↓↓↓↓
  const resetForm = () => {
    name.value = '';
    address.value = '';
    dependents.value = 0;
    localStorage.removeItem("user-info");
  };
  // ↑↑↑↑↑---入力フォームをリセットする---↑↑↑↑↑

  // ===============================================

  // ↓↓↓↓↓---ログインの状態による出し分け---↓↓↓↓↓
  const username = ref('');
  const isLoggedIn = ref(false);
  
  onMounted(() => {
    const loginFlag = localStorage.getItem('isLoggedIn');
    isLoggedIn.value = loginFlag === 'true';
    
    if (isLoggedIn.value) {
      username.value = localStorage.getItem('username') || '';
    }
  });
  // ↑↑↑↑↑---ログインの状態による出し分け---↑↑↑↑↑

  // ===============================================

  // ↓↓↓↓↓---ログアウトを実行---↓↓↓↓↓
  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    router.push('/login');
  };
  // ↑↑↑↑↑---ログアウトを実行---↑↑↑↑↑
</script>