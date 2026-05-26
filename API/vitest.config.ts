import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts', 'tests/**/*.spec.ts', 'tests/**/*.routes.test.ts', 'tests/**/*.routes.ts']
  },
  esbuild: {
    tsconfig: 'tsconfig.vitest.json'
  }
});
