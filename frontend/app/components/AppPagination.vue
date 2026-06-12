<script setup lang="ts">
// ==============================
// 親から受け取る値
// ==============================
const props = defineProps<{
    currentPage: number;
    totalPages: number;
    totalPosts: number;
}>();

// ==============================
// 親へ伝えるイベント
// ==============================
const emit = defineEmits<{
    "page-change": [page: number];
}>();

// ==============================
// 前のページへ
// ==============================
const handlePrev = () => {
    emit("page-change", props.currentPage - 1);
};

// ==============================
// 次のページへ
// ==============================
const handleNext = () => {
    emit("page-change", props.currentPage + 1);
};
</script>

<template>
    <div v-if="totalPosts > 0" class="pagination-wrap">
        <div class="pagination">
            <button
                type="button"
                class="pagination-button"
                :disabled="currentPage <= 1"
                @click="handlePrev"
            >
                前へ
            </button>

            <button
                type="button"
                class="pagination-button"
                :disabled="currentPage >= totalPages"
                @click="handleNext"
            >
                次へ
            </button>
        </div>

        <span class="pagination-current">
            {{ currentPage }} / {{ totalPages }}ページ
        </span>
    </div>
</template>

<style scoped>
.pagination-wrap {
    margin-top: 32px;
    padding: 20px;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 14px;
}

.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
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
    display: block;
    margin-top: 12px;
    text-align: center;
    color: #555;
}

.pagination-total {
    margin: 12px 0 0;
    color: #666;
    text-align: center;
    font-size: 14px;
}

@media (max-width: 640px) {
    .pagination {
        display: flex;
        text-align: center;
    }

    .pagination-button {
        width: 100%;
    }
}
</style>
