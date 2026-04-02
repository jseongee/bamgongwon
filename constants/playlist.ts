import { PlaylistRequest } from "@/types/playlist"

export const DUMMY_REQUESTS: PlaylistRequest[] = [
  {
    id: 1,
    title: "새벽 3시, 잠 못 드는 밤의 Lo-fi",
    description:
      "야근 후 집에 가는 버스 안에서 들을 수 있는 차분한 비트",
    requester: "구독자 김**",
    requestedAt: "2026.03.28",
    status: "completed",
  },
  {
    id: 2,
    title: "봄비 내리는 카페, 재즈 무드",
    description: "창가에 앉아 빗소리 들으며 책 읽을 때 어울리는 재즈",
    requester: "구독자 이**",
    requestedAt: "2026.03.30",
    status: "in_progress",
  },
  {
    id: 3,
    title: "집중력 올려주는 스터디 BGM",
    description:
      "시험 기간에 공부할 때 방해 안 되는 인스트루멘탈",
    requester: "구독자 박**",
    requestedAt: "2026.04.01",
    status: "adopted",
  },
  {
    id: 4,
    title: "드라이브할 때 신나는 시티팝",
    description:
      "야간 드라이브에 어울리는 80-90년대 감성 시티팝",
    requester: "구독자 최**",
    requestedAt: "2026.04.01",
    status: "adopted",
  },
  {
    id: 5,
    title: "운동할 때 듣는 EDM 믹스",
    description: "헬스장에서 에너지 끌어올릴 하이에너지 트랙 모음",
    requester: "구독자 정**",
    requestedAt: "2026.03.20",
    status: "adopted",
  },
]
