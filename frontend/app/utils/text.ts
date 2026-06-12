// ==============================
// HTML文字列をテキストに変換する関数
// ==============================
// WordPress REST APIの content.rendered はHTML文字列
// v-htmlを使わずに表示するため、HTMLタグを取り除く
export const htmlToText = (html: string): string => {
    if (!html) {
        return "";
    }

    return html
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();
};
