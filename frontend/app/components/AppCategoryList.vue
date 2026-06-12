<script setup lang="ts">
import type { WpCategory } from "../types/wordpress";

// ==============================
// 親から受け取る値
// ==============================
defineProps<{
    categories: WpCategory[];
    activeCategoryId: string;
}>();

// ==============================
// 親へ伝えるイベント
// ==============================
const emit = defineEmits<{
    select: [categoryId: string];
    clear: [];
}>();
</script>

<template>
    <aside class="category-sidebar">
        <h2 class="category-title">
            カテゴリー
        </h2>

        <button
            type="button"
            class="category-button"
            :class="{
                'category-button--active': !activeCategoryId,
            }"
            @click="emit('clear')"
        >
            すべて
        </button>

        <button
            v-for="category in categories"
            :key="category.id"
            type="button"
            class="category-button"
            :class="{
                'category-button--active':
                    activeCategoryId === String(category.id),
            }"
            @click="emit('select', String(category.id))"
        >
            {{ category.name }}
        </button>
    </aside>
</template>

<style scoped>
.category-sidebar {
    margin: 0 0 32px;
    padding: 20px;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 14px;
}

.category-title {
    margin: 0 0 12px;
    font-size: 20px;
}

.category-button {
    display: inline-block;
    margin: 0 8px 8px 0;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 999px;
    background: #fff;
    cursor: pointer;
}

.category-button--active {
    background: #333;
    color: #fff;
    border-color: #333;
}
</style>