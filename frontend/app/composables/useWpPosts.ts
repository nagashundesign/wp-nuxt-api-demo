import { computed, ref } from "vue";
import type { Ref } from "vue";
import type { WpPost } from "../types/wordpress";

// ==============================
// 投稿一覧取得オプションの型
// ==============================
type UseWpPostsOptions = {
    categoryId?: Ref<string>;
    searchKeyword?: Ref<string>;
    page?: Ref<number>;
    perPage?: number;
};

// ==============================
// WordPress投稿一覧を取得する処理
// ==============================
export const useWpPosts = async (options: UseWpPostsOptions = {}) => {
    // ==============================
    // Nuxtの設定値を取得
    // ==============================
    const config = useRuntimeConfig();

    // ==============================
    // 検索キーワード
    // ==============================
    const searchKeyword = options.searchKeyword ?? ref("");

    // ==============================
    // 現在のページ番号
    // ==============================
    const page = options.page ?? ref(1);

    // ==============================
    // 1ページあたりの表示件数
    // ==============================
    const perPage = options.perPage ?? 5;

    // ==============================
    // 総記事数・総ページ数
    // ==============================
    const totalPosts = ref(0);
    const totalPages = ref(1);

    // ==============================
    // WordPress REST APIのURL
    // ==============================
    const wpApiUrl = computed(() => {
        const params = new URLSearchParams({
            per_page: String(perPage),
            page: String(page.value),
            _fields: "id,date,title,link,categories",
        });

        // カテゴリーIDがある場合は、カテゴリーで絞り込みます
        if (options.categoryId?.value) {
            params.set("categories", options.categoryId.value);
        }

        // 検索キーワードがある場合は、検索条件を追加します
        if (searchKeyword.value.trim()) {
            params.set("search", searchKeyword.value.trim());
        }

        return `${config.public.wpApiBaseUrl}/wp-json/wp/v2/posts?${params.toString()}`;
    });

    // ==============================
    // WordPressの記事一覧を取得
    // ==============================
    const {
        data: posts,
        status,
        error,
    } = await useFetch<WpPost[]>(wpApiUrl, {
        onResponse({ response }) {
            const total = Number(response.headers.get("x-wp-total") ?? 0);
            const pages = Number(response.headers.get("x-wp-totalpages") ?? 1);

            totalPosts.value = Number.isNaN(total) ? 0 : total;
            totalPages.value = Number.isNaN(pages) || pages < 1 ? 1 : pages;
        },
    });

    return {
        posts,
        status,
        error,
        totalPosts,
        totalPages,
    };
};
