import type { WpCategory } from "../types/wordpress";

// ==============================
// WordPressカテゴリー一覧を取得する処理
// ==============================
export const useWpCategories = async () => {
    // ==============================
    // Nuxtの設定値を取得
    // ==============================
    const config = useRuntimeConfig();

    // ==============================
    // WordPress REST APIのURL
    // ==============================
    const wpApiUrl = `${config.public.wpApiBaseUrl}/wp-json/wp/v2/categories?per_page=100&_fields=id,name,slug`;

    // ==============================
    // WordPressカテゴリー一覧を取得
    // ==============================
    const {
        data: categories,
        status,
        error,
    } = await useFetch<WpCategory[]>(wpApiUrl);

    return {
        categories,
        status,
        error,
    };
};
