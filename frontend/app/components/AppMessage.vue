<script setup lang="ts">
// ==============================
// メッセージ種類の型
// ==============================
type MessageType = "loading" | "error" | "empty";

// ==============================
// 親から受け取る値
// ==============================
defineProps<{
    type: MessageType;
    message: string;
}>();
</script>

<template>
    <p
        class="app-message"
        :class="`app-message--${type}`"
    >
        {{ message }}
    </p>
</template>

<style scoped>
.app-message {
    margin: 24px 0;
    padding: 16px;
    border-radius: 8px;
    line-height: 1.7;
}

.app-message--loading {
    background: #f5f5f5;
    color: #555;
}

.app-message--error {
    background: #fff0f0;
    color: #b00020;
}

.app-message--empty {
    background: #f8f8f8;
    color: #666;
}
</style>