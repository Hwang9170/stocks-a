export interface Env {
  DB: D1Database
}

// Cloudflare 환경에서 바인딩된 DB 가져오기
export const DB = (globalThis as any).env?.DB as D1Database;

if (!DB) {
  throw new Error('D1 Database instance(DB)가 환경에 바인딩되지 않았습니다.');
}
