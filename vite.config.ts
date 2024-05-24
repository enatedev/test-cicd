import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { exec } from 'child_process';

export default defineConfig({
  plugins: [
    preact(),
    {
      name: 'obfuscate-js',
      writeBundle() {
        exec('node obfuscate.js', (err, stdout, stderr) => {
          if (err) {
            console.error(`Error: ${stderr}`);
            throw err;
          }
          console.log(stdout);
        });
      },
    },
  ],

  define: {
    global: {},
  },
  optimizeDeps: {
		exclude: ['js-big-decimal']
	},
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/index.css';
          }
          return '[name].[ext]';
        },
      },
      plugins: [
        {
          name: 'exclude-images',
          load(id) {
            // Prevent images from being included in the build
            if (id.match(/\.(png|jpe?g|gif|svg)$/)) {
              return 'export default ""';
            }
          },
        },
      ],
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});
