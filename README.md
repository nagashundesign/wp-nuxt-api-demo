# WordPress Nuxt Demo

WordPressをCMSとして利用し、Nuxt 4 + TypeScriptでフロントエンドを構築した学習用デモです。

WordPress REST APIから投稿・カテゴリーを取得し、記事一覧、記事詳細、カテゴリー絞り込み、キーワード検索、ページネーションなどを実装しています。

## 公開URL

### Nuxtフロントエンド

https://wp-nuxt-demo.nagashun.jp/

Cloudflare Pagesへデプロイした公開デモです。

### WordPress CMS / REST API

https://nagashun.jp/wp-nuxt-demo/

WordPress側では、投稿やカテゴリーなどのコンテンツを管理しています。

REST API確認用URL：

https://nagashun.jp/wp-nuxt-demo/wp-json/wp/v2/posts

> 公開されている記事やカテゴリーは、動作確認用のサンプルデータです。

## 画面イメージ

### トップページ

<img src="docs/images/top-page.jpg" alt="トップページ" width="380">

### 検索結果

<img src="docs/images/search.jpg" alt="検索結果" width="380">

## 概要

このプロジェクトでは、WordPressをヘッドレスCMSとして利用し、REST APIから取得したデータをNuxt側で表示しています。

WordPress側は記事やカテゴリーの管理を担当し、Nuxt側では取得したデータをもとに以下の機能を提供します。

- 記事一覧ページ
- 記事詳細ページ
- カテゴリー別記事一覧ページ
- キーワード検索
- ページネーション
- URLクエリによる検索・絞り込み状態の管理
- ページごとのSEO情報設定
- 404・API取得エラーへの対応

## 本番環境の構成

```txt
GitHub
└─ Nuxtのソースコードを管理
   └─ mainブランチへのpushで自動デプロイ

Cloudflare Pages
└─ Nuxtフロントエンド
   └─ https://wp-nuxt-demo.nagashun.jp/

ロリポップ
└─ WordPress / REST API
   └─ https://nagashun.jp/wp-nuxt-demo/
```

Nuxt側では、Cloudflare Pagesに設定した環境変数を通して、公開中のWordPress REST APIへ接続しています。

```env
NUXT_PUBLIC_WP_API_BASE_URL=https://nagashun.jp/wp-nuxt-demo
```

## 使用技術

- Vue.js
- Nuxt 4
- TypeScript
- WordPress REST API
- Cloudflare Pages
- GitHub
- Node.js
- npm
- Local
- ロリポップ

## ディレクトリ構成

```txt
wp-nuxt-api-demo/
├─ docs/
│  └─ images/
├─ frontend/
│  ├─ app/
│  │  ├─ assets/
│  │  ├─ components/
│  │  ├─ composables/
│  │  ├─ layouts/
│  │  ├─ pages/
│  │  ├─ types/
│  │  ├─ utils/
│  │  ├─ app.vue
│  │  └─ error.vue
│  ├─ public/
│  ├─ nuxt.config.ts
│  ├─ package-lock.json
│  ├─ package.json
│  └─ tsconfig.json
├─ .gitignore
└─ README.md
```

## 起動方法

公開中のWordPress REST APIを利用する場合は、ローカルでWordPressを起動せずに動作確認できます。

### 1. `frontend`ディレクトリへ移動する

```powershell
cd frontend
```

### 2. `.env`を作成する

`frontend`ディレクトリ直下に`.env`を作成し、WordPressのベースURLを設定します。

```env
NUXT_PUBLIC_WP_API_BASE_URL=https://nagashun.jp/wp-nuxt-demo
```

`.env`はGit管理から除外しています。READMEには設定例のみを掲載しており、APIキーなどの機密情報は含んでいません。

### 3. 依存関係をインストールする

```powershell
npm ci
```

### 4. 開発サーバーを起動する

```powershell
npm run dev -- --host 127.0.0.1 --port 3001 -o
```

### 5. ブラウザで確認する

```txt
http://127.0.0.1:3001/
```

### ローカルのWordPressを利用する場合

LocalでWordPressサイトを起動し、REST APIへアクセスできることを確認します。

以下はポート番号が`10005`の場合の例です。実際のURLはLocalのサイト設定に合わせて変更してください。

```txt
http://localhost:10005/wp-json/wp/v2/posts?per_page=3
```

この場合は、`.env`もローカルのWordPress URLへ変更します。

```env
NUXT_PUBLIC_WP_API_BASE_URL=http://localhost:10005
```

## デプロイ

Nuxtフロントエンドは、GitHubリポジトリとCloudflare Pagesを連携して公開しています。

`main`ブランチへpushすると、Cloudflare Pagesで自動的にビルド・デプロイされます。

主なビルド設定は以下のとおりです。

| 項目 | 設定値 |
| --- | --- |
| Production branch | `main` |
| Root directory | `frontend` |
| Build command | `npm run build` |

Cloudflare Pagesには、次の環境変数を設定しています。

```env
NUXT_PUBLIC_WP_API_BASE_URL=https://nagashun.jp/wp-nuxt-demo
```

公開後はカスタムドメインを設定し、次のURLで配信しています。

```txt
https://wp-nuxt-demo.nagashun.jp/
```

## 実装・公開で経験したこと

このデモでは、WordPress REST APIとNuxtを組み合わせた小規模なヘッドレスCMS構成を実装しています。

### フロントエンド実装

- WordPress REST APIを利用した投稿・カテゴリー取得
- NuxtとTypeScriptによるフロントエンド実装
- `components` / `composables` / `types` / `utils`への分離
- URLクエリによる検索・絞り込み・ページ番号管理
- ページごとのSEO情報設定
- 404・取得エラーへの対応

### 開発・デプロイ

- GitHubによるソースコード管理と`main`ブランチ連携
- npmによる依存関係管理
- Cloudflare PagesでNuxtをビルド・公開
- GitHub連携による自動デプロイ
- 本番環境における環境変数の設定

### 公開環境・構成

- エックスサーバードメインでのドメイン管理
- DNS管理をCloudflareへ移行
- ロリポップでWordPressを運用
- Nuxt用サブドメインの割り当て
- カスタムドメインとSSLの設定
- WordPressとNuxtを異なる環境で公開する構成

## 制作目的

これまでに培ったWordPressの知見を活かしながら、Vue.js / Nuxtを使ったフロントエンド開発を学ぶために制作しました。
WordPress側では投稿やカテゴリーなどのコンテンツ管理を担当し、Nuxt側ではREST APIから取得したデータをもとに画面を構築しています。
WordPressの管理画面を活かしつつ、フロントエンド側ではコンポーネント設計、ルーティング、検索、ページネーション、SEO設定などを役割ごとに分離して実装しています。
