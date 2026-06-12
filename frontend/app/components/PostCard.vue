<script setup lang="ts">
import type { WpCategory, WpPost } from "../types/wordpress";
import { formatDate } from "../utils/date";

// ==============================
// 親から投稿データとカテゴリー一覧を受け取る
// ==============================
const props = defineProps<{
    post: WpPost;
    categories: WpCategory[];
}>();

// ==============================
// 投稿に紐づくカテゴリーだけを取り出す
// ==============================
const postCategories = computed(() => {
    return props.categories.filter((category) => {
        return props.post.categories.includes(category.id); // 投稿が持っているカテゴリーIDと一致するものだけを取り出す
    });
});
</script>

<template>
    <li class="post-item">
        <h2>{{ props.post.title.rendered }}</h2>

        <p>投稿日：{{ formatDate(props.post.date) }}</p>

        <!-- カテゴリー -->
        <ul v-if="postCategories.length > 0" class="category-list">
            <li
                v-for="category in postCategories"
                :key="category.id"
                class="category-item"
            >
                <NuxtLink
                    :to="`/categories/${category.id}`"
                    class="category-link"
                >
                    {{ category.name }}
                </NuxtLink>
            </li>
        </ul>

        <NuxtLink :to="`/posts/${props.post.id}`" class="post-link">
            詳細を見る
        </NuxtLink>
    </li>
</template>

<style scoped>
.post-item {
    padding: 24px;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 14px;
}

.post-item h2 {
    margin: 0 0 10px;
    font-size: 22px;
    line-height: 1.5;
}

.post-item p {
    margin: 0 0 12px;
    color: #666;
    font-size: 14px;
}

.category-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 0 0 16px;
    padding: 0;
    list-style: none;
}

.category-item {
    padding: 4px 8px;
    background: #f2f2f2;
    border-radius: 999px;
    color: #555;
    font-size: 13px;
}

.category-link {
    color: inherit;
    text-decoration: none;
}

.category-link:hover {
    text-decoration: underline;
}

.post-link {
    color: #0066cc;
    text-decoration: underline;
}

@media (max-width: 640px) {
    .post-item {
        padding: 18px;
    }

    .post-item h2 {
        font-size: 19px;
    }
}
</style>
