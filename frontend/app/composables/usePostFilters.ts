// ==============================
// 記事一覧の検索・カテゴリー・ページ管理
// ==============================
export const usePostFilters = () => {
    // ==============================
    // 現在のURL情報
    // ==============================
    const route = useRoute();

    // ==============================
    // URL変更用
    // ==============================
    const router = useRouter();

    // ==============================
    // URLのsearchクエリ
    // ==============================
    const initialSearchKeyword =
        typeof route.query.search === "string" ? route.query.search : "";

    // ==============================
    // URLのcategoryクエリ
    // ==============================
    const initialCategoryId =
        typeof route.query.category === "string" ? route.query.category : "";

    // ==============================
    // URLのpageクエリ
    // ==============================
    const rawPage =
        typeof route.query.page === "string" ? Number(route.query.page) : 1;

    // ==============================
    // 現在の検索キーワード
    // ==============================
    const activeSearchKeyword = ref(initialSearchKeyword);

    // ==============================
    // 現在のカテゴリーID
    // ==============================
    const activeCategoryId = ref(initialCategoryId);

    // ==============================
    // 現在ページ
    // ==============================
    const currentPage = ref(Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage);

    // ==============================
    // URL更新
    // ==============================
    const updateUrl = async () => {
        await router.push({
            path: "/",
            query: {
                ...(activeSearchKeyword.value
                    ? { search: activeSearchKeyword.value }
                    : {}),

                ...(activeCategoryId.value
                    ? { category: activeCategoryId.value }
                    : {}),

                page: String(currentPage.value),
            },
        });
    };

    // ==============================
    // 検索
    // ==============================
    const search = async (keyword: string) => {
        activeSearchKeyword.value = keyword;
        currentPage.value = 1;

        await updateUrl();
    };

    // ==============================
    // 検索クリア
    // ==============================
    const clearSearch = async () => {
        activeSearchKeyword.value = "";
        currentPage.value = 1;

        await updateUrl();
    };

    // ==============================
    // カテゴリー選択
    // ==============================
    const selectCategory = async (categoryId: string) => {
        activeCategoryId.value = categoryId;
        currentPage.value = 1;

        await updateUrl();
    };

    // ==============================
    // カテゴリー解除
    // ==============================
    const clearCategory = async () => {
        activeCategoryId.value = "";
        currentPage.value = 1;

        await updateUrl();
    };

    // ==============================
    // ページ移動
    // ==============================
    const movePage = async (page: number) => {
        if (page < 1) {
            return;
        }

        currentPage.value = page;

        await updateUrl();
    };

    return {
        activeSearchKeyword,
        activeCategoryId,
        currentPage,

        search,
        clearSearch,

        selectCategory,
        clearCategory,

        movePage,
    };
};
