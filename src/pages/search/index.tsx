import { fetchBooks } from "../../../lib/fetch-bookt";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import { useRouter } from "next/router";

export const getServerSideProps = async(q:GetServerSidePropsContext) => {
    const content = q.query.q
    const searchBooks = await fetchBooks(content as string)
    return {
        props: {
            searchBooks
        }
    }
}

export default function BookSearchPageUI({
    searchBooks
    }:InferGetServerSidePropsType<typeof getServerSideProps>) {
    
    const total = 128; // UI 표시용
    const [query, setQuery] = useState<string>('')
    const page = 1;
    const pageSize = 10;
    const router = useRouter()

    const handleSearch = () => {
      const q = query.trim();
  
      router.push({
        pathname: router.pathname, // 현재 페이지 경로 유지
        query: q ? { q } : {},     // q가 비면 쿼리 제거
      });
    };
  
    return (
      <div className="min-h-dvh bg-slate-50">
        {/* Top bar */}
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white">
                <span className="text-sm font-semibold">B</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  도서 검색
                </div>
                <div className="text-xs text-slate-500">
                  제목/저자/출판사로 빠르게 찾기
                </div>
              </div>
            </div>
  
            <div className="hidden items-center gap-2 sm:flex">
              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                최근 검색
              </button>
              <button className="rounded-xl bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800">
                내 서재
              </button>
            </div>
          </div>
        </header>
  
        <main className="mx-auto w-full max-w-5xl px-4 py-6">
          {/* Search box */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex-1">
                <label className="sr-only" htmlFor="q">
                  검색어
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-slate-900/10">
                  <span className="text-slate-400">🔎</span>
                  <input
                    id="q"
                    defaultValue={query}
                    placeholder="예) 클린 코드, Martin Fowler, 인사이트…"
                    className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    onChange={(e) => setQuery(e.target.value as string)}
                    onKeyDown={handleSearch}
                  />
                  <button className="rounded-lg px-2 py-1 text-xs text-slate-500 hover:bg-slate-50">
                    ⌘K
                  </button>
                </div>
              </div>
  
              <div className="flex gap-2">
                <button className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 sm:w-auto">
                  필터
                </button>
                <button className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800 sm:w-auto">
                  검색
                </button>
              </div>
            </div>
  
            {/* Quick filters */}
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-700">정렬</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button className="rounded-full bg-slate-900 px-3 py-1 text-xs text-white">
                    정확도
                  </button>
                  <button className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 hover:bg-slate-50">
                    최신순
                  </button>
                  <button className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 hover:bg-slate-50">
                    평점순
                  </button>
                </div>
              </div>
  
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-700">출간년도</div>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    defaultValue="2015"
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                  <span className="text-slate-400">~</span>
                  <input
                    defaultValue="2026"
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>
              </div>
  
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-semibold text-slate-700">옵션</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <label className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 hover:bg-slate-50">
                    <input type="checkbox" className="accent-slate-900" />
                    품절 제외
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 hover:bg-slate-50">
                    <input type="checkbox" className="accent-slate-900" />
                    전자책 포함
                  </label>
                </div>
              </div>
            </div>
          </section>
  
          {/* Results header */}
          <section className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">
                검색 결과
                <span className="ml-2 rounded-full bg-slate-900 px-2 py-0.5 text-xs text-white">
                  {total.toLocaleString()}
                </span>
              </div>
              <div className="text-xs text-slate-500">
                “{query}” 관련 도서 · {page}페이지 ({pageSize}개씩)
              </div>
            </div>
  
            <div className="flex gap-2">
              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                목록
              </button>
              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                카드
              </button>
            </div>
          </section>
  
          {/* Results list */}
          <section className="mt-4 grid grid-cols-1 gap-3">
            {searchBooks.map((b) => (
              <article
                key={b.id}
                className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="flex gap-4">
                  {/* cover */}
                  <div className="h-28 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                    {b.coverImgUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={b.coverImgUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-xs text-slate-400">
                        COVER
                      </div>
                    )}
                  </div>
  
                  {/* content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="truncate text-base font-semibold text-slate-900">
                          {b.title}
                        </h2>
                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                          <span>{b.author}</span>
                          <span className="text-slate-300">•</span>
                          <span>{b.publisher}</span>
                          <span className="text-slate-300">•</span>
                        </div>
                      </div>
  
                    </div>
  
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                      {b.description}
                    </p>
  
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                     

                    </div>
                  </div>
                </div>
              </article>
            ))}
  
            {/* Empty state example (필요시 MOCK 비우면 노출) */}
          </section>
  
          {/* Pagination */}
          <section className="mt-6 flex items-center justify-center gap-2">
            <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
              이전
            </button>
  
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const n = i + 1;
                const active = n === page;
                return (
                  <button
                    key={n}
                    className={[
                      "h-9 w-9 rounded-xl text-sm",
                      active
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {n}
                  </button>
                );
              })}
              <span className="px-1 text-slate-400">…</span>
              <button className="h-9 w-9 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50">
                13
              </button>
            </div>
  
            <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
              다음
            </button>
          </section>
        </main>
      </div>
    );
  }