import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * clsx와 tailwind-merge를 결합한 className 유틸리티.
 *
 * 조건부 클래스 조합(clsx)과 Tailwind 충돌 클래스 병합(twMerge)을 함께 처리한다.
 *
 * @param inputs - 문자열, 배열, 객체 등 clsx가 허용하는 모든 형태의 클래스 값
 * @returns 병합된 className 문자열
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
