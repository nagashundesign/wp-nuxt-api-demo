<script setup lang="ts">
// ==============================
// 親から受け取る値
// ==============================
const props = defineProps<{
    activeKeyword: string;
}>();

// ==============================
// 親へ伝えるイベント
// ==============================
const emit = defineEmits<{
    search: [keyword: string];
    clear: [];
}>();

// ==============================
// 入力欄に入力中のキーワード
// ==============================
const searchInput = ref(props.activeKeyword);

// ==============================
// 親から渡された検索キーワードが変わったら入力欄にも反映
// ==============================
watch(
    () => props.activeKeyword,
    (newKeyword) => {
        searchInput.value = newKeyword;
    },
);

// ==============================
// 検索を実行
// ==============================
const handleSubmit = () => {
    emit("search", searchInput.value.trim());
};

// ==============================
// 検索条件をクリア
// ==============================
const handleClear = () => {
    searchInput.value = "";
    emit("clear");
};
</script>

<template>
    <form class="search-form" @submit.prevent="handleSubmit">
        <input
            v-model="searchInput"
            type="search"
            placeholder="記事を検索"
            class="search-input"
        />

        <button type="submit" class="search-button">検索</button>

        <button
            v-if="activeKeyword"
            type="button"
            class="clear-button"
            @click="handleClear"
        >
            クリア
        </button>
    </form>
</template>

<style scoped>
.search-form {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 0 0 24px;
}

.search-input {
    flex: 1;
    min-width: 220px;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    font-size: 16px;
}

.search-button,
.clear-button {
    padding: 10px 14px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.search-button {
    background: #333;
    color: #fff;
}

.clear-button {
    background: #eaeaea;
    color: #333;
}

@media (max-width: 640px) {
    .search-form {
        display: grid;
    }

    .search-input,
    .search-button,
    .clear-button {
        width: 100%;
    }
}
</style>
