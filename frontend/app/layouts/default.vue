<template>
    <div class="site">
        <!-- 共通ヘッダー -->
        <header class="site-header">
            <div class="site-header-inner">
                <NuxtLink to="/" class="site-logo">
                    WordPress Nuxt Demo
                </NuxtLink>

                <nav class="site-nav">
                    <NuxtLink to="/">
                        記事一覧
                    </NuxtLink>
                </nav>
            </div>
        </header>

        <!-- 各ページの中身 -->
        <slot />
    </div>
</template>

<style scoped>
.site {
    min-height: 100vh;
}

.site-header {
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
}

.site-header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 960px;
    margin: 0 auto;
    padding: 18px 20px;
    font-family: sans-serif;
}

.site-logo {
    color: #222;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
}

.site-nav {
    display: flex;
    gap: 16px;
}

.site-nav a {
    color: #0066cc;
    text-decoration: underline;
}

@media (max-width: 640px) {
    .site-header-inner {
        align-items: flex-start;
        flex-direction: column;
        gap: 8px;
        padding: 16px;
    }
}
</style>