<script setup lang="ts">
// ==============================
// WordPressカテゴリー一覧を取得
// ==============================
const {
    categories,
    status: categoryStatus,
    error: categoryError,
} = await useWpCategories();

// ==============================
// 検索・カテゴリー・ページ管理
// ==============================
const {
    activeSearchKeyword,
    activeCategoryId,
    currentPage,

    search,
    clearSearch,

    selectCategory,
    clearCategory,

    movePage,
} = usePostFilters();

// ==============================
// WordPressの記事一覧を取得
// ==============================
const { posts, status, error, totalPosts, totalPages } = await useWpPosts({
    categoryId: activeCategoryId,
    searchKeyword: activeSearchKeyword,
    page: currentPage,
    perPage: 5,
});

// ==============================
// SEO設定
// ==============================
useSeoMeta({
    title: "WordPress記事一覧",
    description: "WordPress REST APIから取得した記事一覧ページです。",
});
</script>

<template>
    <main class="page">
        <h1>WordPress記事一覧</h1>

        <!-- 検索フォーム -->
        <AppSearchForm
            :active-keyword="activeSearchKeyword"
            @search="search"
            @clear="clearSearch"
        />
        <p v-if="activeSearchKeyword" class="search-result-text">
            「{{ activeSearchKeyword }}」の検索結果
        </p>

        <AppCategoryList
            :categories="categories ?? []"
            :active-category-id="activeCategoryId"
            @select="selectCategory"
            @clear="clearCategory"
        />

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
            message="WordPressの記事を取得できませんでした。"
        />

        <!-- 記事がある場合 -->
        <ul v-else-if="posts && posts.length > 0" class="post-list">
            <PostCard
                v-for="post in posts"
                :key="post.id"
                :post="post"
                :categories="categories ?? []"
            />
        </ul>

        <!-- ページネーション -->
        <AppPagination
            :current-page="currentPage"
            :total-pages="totalPages"
            :total-posts="totalPosts"
            @page-change="movePage"
        />

        <p v-if="totalPosts > 0" class="pagination-total">
            全{{ totalPosts }}件
        </p>

        <AppMessage
            v-else
            type="empty"
            :message="
                activeSearchKeyword
                    ? '検索条件に一致する記事はありません。'
                    : '表示できる記事がありません。'
            "
        />
    </main>
</template>

<style scoped>
.post-item {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 12px;
}

.post-item h2 {
    margin: 0 0 8px;
    font-size: 20px;
}

.post-item p {
    margin: 0 0 12px;
    color: #666;
}

.post-item a {
    color: #0066cc;
    text-decoration: underline;
}

.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: 32px;
}

.pagination-button {
    padding: 8px 14px;
    border: none;
    border-radius: 8px;
    background: #333;
    color: #fff;
    cursor: pointer;
}

.pagination-button:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.pagination-current {
    color: #555;
}

.pagination-total {
    margin: 12px 0 0;
    color: #666;
    font-size: 14px;
}
</style>
