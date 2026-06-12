<script setup lang="ts">
import { useWpPost } from "../../composables/useWpPost";
import { formatDate } from "../../utils/date";
import { htmlToText } from "../../utils/text";

// ==============================
// URLのパラメータを取得
// ==============================
// /posts/1 の「1」の部分を取得します。
const route = useRoute();

const rawPostId = route.params.id;

const postId = Array.isArray(rawPostId) ? rawPostId[0] : rawPostId;

// ==============================
// 記事IDがない場合は404にする
// ==============================
if (typeof postId !== "string") {
    throw createError({
        statusCode: 404,
        statusMessage: "記事IDが見つかりません",
    });
}

// ==============================
// WordPressの記事1件を取得
// ==============================
const { post, status, error } = await useWpPost(postId);

// ==============================
// 記事取得エラー時の処理
// ==============================
// 存在しない記事IDの場合などは、エラー画面へ流します。
if (error.value) {
    throw createError({
        statusCode: error.value.statusCode ?? 500,
        statusMessage:
            error.value.statusCode === 404
                ? "記事が見つかりません"
                : "記事を取得できませんでした",
        fatal: true,
    });
}

// ==============================
// 記事データが空の場合の処理
// ==============================
if (!post.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "記事が見つかりません",
        fatal: true,
    });
}

// ==============================
// WordPressカテゴリー一覧を取得
// ==============================
const {
    categories,
    status: categoryStatus,
    error: categoryError,
} = await useWpCategories();

// ==============================
// 投稿に紐づくカテゴリーだけを取り出す
// ==============================
const postCategories = computed(() => {
    if (!post.value || !categories.value) {
        return [];
    }

    return categories.value.filter((category) => {
        return post.value?.categories.includes(category.id);
    });
});

// ==============================
// HTMLタグを取り除いてテキスト化する
// ==============================
const contentText = computed(() => {
    return htmlToText(post.value?.content.rendered ?? "");
});

// ==============================
// SEO設定
// ==============================
useSeoMeta({
    title: () => (post.value ? post.value.title.rendered : "記事詳細"),
    description: () =>
        contentText.value
            ? contentText.value.slice(0, 120)
            : "記事詳細ページです。",
});
</script>

<template>
    <main class="page">
        <NuxtLink to="/" class="back-link"> 一覧へ戻る </NuxtLink>

        <AppMessage
            v-if="
                status === 'pending' ||
                status === 'idle' ||
                categoryStatus === 'pending' ||
                categoryStatus === 'idle'
            "
            type="loading"
            message="読み込み中です。"
        />

        <AppMessage
            v-else-if="error || categoryError"
            type="error"
            message="記事を取得できませんでした。"
        />

        <!-- 記事がある場合 -->
        <article v-else-if="post" class="post-detail">
            <h1>{{ post.title.rendered }}</h1>

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

            <p class="post-date">投稿日：{{ formatDate(post.date) }}</p>

            <!-- 本文 -->
            <p v-if="contentText" class="post-content">
                {{ contentText }}
            </p>

            <a
                :href="post.link"
                target="_blank"
                rel="noopener noreferrer"
                class="post-link"
            >
                WordPress側の記事を見る
            </a>
        </article>

        <AppMessage
            v-else
            type="empty"
            message="表示できる記事がありません。"
        />
    </main>
</template>

<style scoped>
.post-detail {
    padding: 24px;
    border: 1px solid #ddd;
    border-radius: 12px;
}

.post-detail h1 {
    margin: 0 0 12px;
    font-size: 28px;
    line-height: 1.5;
}

.category-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 0 0 20px;
    padding: 0;
    list-style: none;
}

.category-item {
    padding: 4px 8px;
    background: #f5f5f5;
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

.post-date {
    margin: 0 0 16px;
    color: #666;
}

.post-link {
    color: #0066cc;
    text-decoration: underline;
}
</style>
