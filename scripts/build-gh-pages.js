#!/usr/bin/env node

/**
 * Скрипт для подготовки релиза клиентской части приложения для GitHub Pages
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Запускаем стандартную сборку
console.log('Building client application...');
execSync('npm run build', { stdio: 'inherit' });

// Путь к директории сборки
const distDir = path.resolve(__dirname, '../dist');
const publicDir = path.resolve(distDir, 'public');

// Копируем 404.html в корень dist
console.log('Copying 404.html to dist root...');
fs.copyFileSync(
  path.resolve(publicDir, '404.html'),
  path.resolve(distDir, '404.html')
);

// Создаем базовые файлы для GitHub Pages
console.log('Creating .nojekyll file...');
fs.writeFileSync(path.resolve(distDir, '.nojekyll'), '');

// Сообщаем об успешном завершении
console.log('\nBuild completed successfully!');
console.log('Files ready for GitHub Pages deployment in ./dist directory');