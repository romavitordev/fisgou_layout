// Em GitHub Pages o site fica em https://<user>.github.io/fisgou_layout/,
// então precisamos de basePath/assetPrefix. Ativado só no build de Pages
// (env GITHUB_PAGES=true), pra não atrapalhar o dev local.
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "fisgou_layout";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Importa @fisgou/shared direto como TS (sem build no pacote).
  transpilePackages: ["@fisgou/shared"],

  // Site 100% estático (HTML/CSS/JS) — gera a pasta `out/` no build.
  output: "export",
  // Pages não tem otimizador de imagem; e o app só usa blocos de cor.
  images: { unoptimized: true },
  // URLs como /pesqueiros/ -> pesqueiros/index.html (robusto no GH Pages).
  trailingSlash: true,
  basePath: isPages ? `/${repo}` : undefined,
  assetPrefix: isPages ? `/${repo}/` : undefined,

  experimental: {
    // Node 24 + Next 14: o worker de geração estática crasha com
    // "Zone Allocation failed". Rodar em processo único evita o crash.
    workerThreads: false,
    cpus: 1,
  },
};

module.exports = nextConfig;
