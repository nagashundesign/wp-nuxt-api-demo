import type { WpPostDetail } from "../types/wordpress";

// ==============================
// WordPress投稿1件を取得する処理
// ==============================
export const useWpPost = async (postId: string) => {
    // ==============================
    // Nuxtの設定値を取得
    // ==============================
    const config = useRuntimeConfig();

    // ==============================
    // WordPress REST APIのURL
    // ==============================
    // 詳細ページでは content も取得
    const wpApiUrl = `${config.public.wpApiBaseUrl}/wp-json/wp/v2/posts/${encodeURIComponent(postId)}?_fields=id,date,title,content,link,categories`;

    // ==============================
    // WordPressの記事1件を取得
    // ==============================
    const {
        data: post,
        status,
        error,
    } = await useFetch<WpPostDetail>(wpApiUrl);

    return {
        post,
        status,
        error,
    };
};
