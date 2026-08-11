#!/usr/bin/env bash
set -e

echo "Instalando herramientas para quitar comentarios..."
npm install -g terser clean-css-cli html-minifier-terser

echo "Preparando carpeta de salida (dist)..."
mkdir -p dist
cp -r media dist/ 2>/dev/null || true
cp -r fonts dist/ 2>/dev/null || true

echo "Quitando comentarios del JavaScript..."
terser script.js \
  --compress false --mangle false \
  --format comments=false,beautify=true \
  -o dist/script.js

echo "Quitando comentarios del CSS..."
cleancss --format keep-breaks -o dist/style.css style.css

echo "Quitando comentarios del HTML..."
html-minifier-terser index.html --remove-comments -o dist/index.html

echo "Listo. La versión publicada estará en /dist, sin comentarios."
