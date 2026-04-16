/**
 * ISO 문자열을 한국 날짜(연.월.일)로 포매팅한다.
 *
 * @param iso - ISO 8601 형식의 날짜 문자열
 * @returns "YYYY. MM. DD." 형식의 날짜 문자열
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  })
}

/**
 * ISO 문자열을 한국 날짜+시간(연.월.일 오전/오후 시:분)으로 포매팅한다.
 *
 * @param iso - ISO 8601 형식의 날짜 문자열
 * @returns "YYYY. MM. DD. 오전/오후 HH:MM" 형식의 날짜+시간 문자열
 */
export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Seoul",
  })
}
