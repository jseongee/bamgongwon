@AGENTS.md

# 프로젝트 개요

**밤공원**은 YouTube 플레이리스트 채널의 시청자 대상 신청 관리 사이트다.
시청자가 플레이리스트를 신청하면 채널 운영자가 채택 여부를 결정하고,
제작 진행 상태(채택됨 → 제작중 → 제작완료)를 공개한다.

## 주요 기능
- 플레이리스트 신청 목록 조회, 상태 필터링 및 정렬(최신순/좋아요순) (`/requests`)
- 신청 상세 페이지 조회 (`/requests/[id]`)
- Google OAuth 로그인 (Supabase Auth)
- 로그인한 사용자만 신청 폼 접근 가능 (`/requests/new`)
- 신청 건 좋아요/취소 (로그인 필요, 본인 신청 건 제외)
- 제작 완료 신청 건에 YouTube 영상 링크 표시 (상세 페이지, `youtube_url` 컬럼 기반)
- 내가 쓴 글 / 좋아요한 글 조회 (`/me`, 로그인 필요)

## 기술 스택
- **Next.js 16** (App Router) — `proxy.ts`가 미들웨어 역할 (Next.js 16 명칭 변경)
- **React 19** + TypeScript
- **Tailwind CSS v4** — oklch 색상, `@custom-variant dark (&:is(.dark *))`
- **shadcn/ui** (radix-nova 스타일)
- **next-themes** — system/dark/light 테마
- **Supabase** (`@supabase/ssr`) — Auth + DB (`playlist_requests`, `playlist_likes` 테이블)

## 라우트
| 경로 | 설명 |
|------|------|
| `/` | 메인 (히어로 + 최근 신청 3건 미리보기) |
| `/requests` | 전체 신청 목록 (필터 탭 포함) |
| `/requests/[id]` | 신청 상세 페이지 (전체 내용, 좋아요, 수정/삭제, YouTube 링크) |
| `/requests/new` | 플레이리스트 신청 폼 (로그인 필요, 미로그인 시 `/` 리다이렉트) |
| `/me` | 내가 쓴 글 / 좋아요한 글 (로그인 필요, 미로그인 시 `/` 리다이렉트) |
| `/auth/callback` | Google OAuth 콜백 처리 (`?next=` 파라미터로 로그인 후 이동 경로 지정 가능) |

## 폴더 구조
```
app/                    # 페이지 및 라우트 핸들러
├── actions/            # Server Actions (request.ts)
├── me/                 # 내 활동 페이지 (page.tsx)
├── requests/[id]/      # 신청 상세 페이지 (page.tsx, not-found.tsx)
├── robots.ts           # robots.txt 자동 생성 (Next.js App Router)
├── sitemap.ts          # sitemap.xml 자동 생성 — 정적 라우트 + DB 동적 라우트 포함
components/
├── auth/               # 인증 관련
├── home/               # 홈 페이지 전용
├── layout/             # 공통 레이아웃
├── me/                 # 내 활동 페이지 전용
├── playlist/           # 플레이리스트 관련
├── theme/              # 테마
└── ui/                 # shadcn/ui 기본 컴포넌트
constants/              # 상수 및 설정
lib/
├── auth.ts             # Google OAuth 로그인 유틸
└── supabase/           # Supabase 클라이언트 및 유틸
    ├── client.ts       # 브라우저 클라이언트
    ├── server.ts       # 서버 클라이언트
    └── queries.ts      # DB 조회 함수
types/                  # TypeScript 타입 정의
```
