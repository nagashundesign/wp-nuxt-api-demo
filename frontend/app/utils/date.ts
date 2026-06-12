// ==============================
// 日付を画面表示用に整形する関数
// ==============================
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    // 不正な日付だった場合は元の文字列をそのまま返す
    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return new Intl.DateTimeFormat("ja-JP", {
        year: "numeric", // 年を4桁で表示
        month: "2-digit", // 月を2桁で表示
        day: "2-digit", // 日を2桁で表示
    }).format(date);
};
