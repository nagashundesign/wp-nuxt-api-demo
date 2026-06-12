// ==============================
// WordPressカテゴリーの型
// ==============================
export type WpCategory = {
    id: number;
    name: string;
    slug: string;
};

// ==============================
// WordPress投稿一覧用の型
// ==============================
export type WpPost = {
    id: number;
    date: string;
    title: {
        rendered: string;
    };
    link: string;
    categories: number[];
};

// ==============================
// WordPress投稿詳細用の型
// ==============================
export type WpPostDetail = WpPost & {
    content: {
        rendered: string;
    };
};
