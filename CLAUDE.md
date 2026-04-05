@AGENTS.md

# 프로젝트 개요

**밤공원**은 YouTube 플레이리스트 채널의 시청자 대상 신청 관리 사이트다.
구독자가 플레이리스트를 신청하면 채널 운영자가 채택 여부를 결정하고,
제작 진행 상태(채택됨 → 제작중 → 제작완료)를 공개한다.

## 주요 기능
- 플레이리스트 신청 목록 조회 및 상태 필터링 (`/requests`)
- Google OAuth 로그인 (Supabase Auth)
- 로그인한 구독자만 신청 폼 접근 가능 (`/requests/new`)

## 기술 스택
- **Next.js 16** (App Router) — `proxy.ts`가 미들웨어 역할 (Next.js 16 명칭 변경)
- **React 19** + TypeScript
- **Tailwind CSS v4** — oklch 색상, `@custom-variant dark (&:is(.dark *))`
- **shadcn/ui** (radix-nova 스타일)
- **next-themes** — system/dark/light 테마
- **Supabase** (`@supabase/ssr`) — Auth + DB (`playlist_requests` 테이블)

## 라우트
| 경로 | 설명 |
|------|------|
| `/` | 메인 (히어로 + 최근 신청 3건 미리보기) |
| `/requests` | 전체 신청 목록 (필터 탭 포함) |
| `/requests/new` | 플레이리스트 신청 폼 (로그인 필요, 미로그인 시 `/` 리다이렉트) |
| `/auth/callback` | Google OAuth 콜백 처리 |

## 폴더 구조
```
app/                    # 페이지 및 라우트 핸들러
├── actions/            # Server Actions (request.ts)
components/
├── auth/               # 인증 관련 (auth-button, sign-in-button, sign-out-button)
├── layout/             # 레이아웃 (header, footer, hero-section)
├── playlist/           # 플레이리스트 (playlist-board, playlist-card, playlist-preview, request-form)
├── theme/              # 테마 (theme-provider, theme-toggle)
└── ui/                 # shadcn/ui 기본 컴포넌트
lib/supabase/           # 브라우저/서버 Supabase 클라이언트
types/                  # TypeScript 타입 정의
```
