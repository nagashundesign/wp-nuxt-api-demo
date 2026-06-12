<script setup lang="ts">
// ==============================
// Nuxtから渡されるエラー情報
// ==============================
const props = defineProps<{
    error: {
        statusCode?: number;
        statusMessage?: string;
        message?: string;
    };
}>();

// ==============================
// トップページへ戻る
// ==============================
const handleBackHome = () => {
    clearError({
        redirect: "/",
    });
};
</script>

<template>
    <main class="error-page">
        <p class="error-code">
            {{ props.error.statusCode ?? 500 }}
        </p>

        <h1>
            {{ props.error.statusMessage ?? "エラーが発生しました" }}
        </h1>

        <p class="error-message">
            ページを表示できませんでした。
        </p>

        <button
            type="button"
            class="back-button"
            @click="handleBackHome"
        >
            トップページへ戻る
        </button>
    </main>
</template>

<style scoped>
.error-page {
    max-width: 640px;
    margin: 0 auto;
    padding: 80px 20px;
    font-family: sans-serif;
    text-align: center;
}

.error-code {
    margin: 0 0 16px;
    color: #999;
    font-size: 48px;
    font-weight: bold;
}

.error-page h1 {
    margin: 0 0 16px;
    font-size: 28px;
}

.error-message {
    margin: 0 0 32px;
    color: #666;
}

.back-button {
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    background: #333;
    color: #fff;
    cursor: pointer;
}
</style>