<script setup lang="ts">
// ==============================
// URLのパラメータを取得
// ==============================
// /categories/1 の「1」の部分を取得します。
const route = useRoute();

const rawCategoryId = route.params.id;

const categoryId = Array.isArray(rawCategoryId)
    ? rawCategoryId[0]
    : rawCategoryId;

// ==============================
// カテゴリーIDがない場合は404にする
// ==============================
if (typeof categoryId !== "string") {
    throw createError({
        statusCode: 404,
        statusMessage: "カテゴリーIDが見つかりません",
    });
}

const categoryIdRef = ref(categoryId);

// ==============================
// カテゴリーで絞り込んだ記事一覧を取得
// ==============================
const { posts, status, error } = await useWpPosts({
    categoryId: categoryIdRef,
});

// ==============================
// WordPressカテゴリー一覧を取得
// ==============================
const {
    categories,
    status: categoryStatus,
    error: categoryError,
} = await useWpCategories();

// ==============================
// カテゴリー取得エラー時の処理
// ==============================
if (categoryError.value) {
    throw createError({
        statusCode: categoryError.value.statusCode ?? 500,
        statusMessage: "カテゴリーを取得できませんでした",
        fatal: true,
    });
}

// ==============================
// 存在しないカテゴリーIDの場合は404にする
// ==============================
const categoryExists = categories.value?.some((category) => {
    return category.id === Number(categoryId);
});

if (!categoryExists) {
    throw createError({
        statusCode: 404,
        statusMessage: "カテゴリーが見つかりません",
        fatal: true,
    });
}

// ==============================
// 現在のカテゴリー情報を取得
// ==============================
const currentCategory = computed(() => {
    if (!categories.value) {
        return null;
    }

    return categories.value.find((category) => {
        return category.id === Number(categoryId);
    });
});

// ==============================
// SEO設定
// ==============================
useSeoMeta({
    title: () =>
        currentCategory.value
            ? `カテゴリー：${currentCategory.value.name}`
            : "カテゴリー別記事一覧",
    description: () =>
        currentCategory.value
            ? `${currentCategory.value.name}カテゴリーの記事一覧です。`
            : "WordPress REST APIから取得したカテゴリー別記事一覧ページです。",
});
</script>

<template>
    <main class="page">
        <NuxtLink to="/" class="back-link"> 一覧へ戻る </NuxtLink>

        <h1>
            カテゴリー：
            {{ currentCategory?.name ?? "カテゴリー" }}
        </h1>

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

        <AppMessage
            v-else
            type="empty"
            message="このカテゴリーの記事はありません。"
        />
    </main>
</template>
