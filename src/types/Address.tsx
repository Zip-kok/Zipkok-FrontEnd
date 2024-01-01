export default interface Address {
    roadAddr: string; // 전체 도로명주소
    roadAddrPart1: string; // 도로명주소(참고항목 제외)
    roadAddrPart2?: string; // 도로명주소 참고항목
    jibunAddr: string; // 지번주소
    engAddr: string; // 도로명주소(영문)
    zipNo: string; // 우편번호
    admCd: string; // 행정구역코드
    rnMgtSn: string; // 도로명코드
    bdMgtSn: string; // 건물관리번호
    detBdNmList?: string; // 상세건물명
    bdNm?: string; // 건물명
    bdKdcd: string; // 공동주택여부(1 : 공동주택, 0 : 비공동주택)
    siNm: string; // 시도명
    sggNm?: string; // 시군구명
    emdNm: string; // 읍면동명
    liNm?: string; // 법정리명
    rn: string; // 도로명
    udrtYn: string; // 지하여부(0 : 지상, 1 : 지하)
    buldMnnm: string; // 건물본번
    buldSlno: string; // 건물부번(부번이 없는 경우 0)
    mtYn: string; // 산여부(0 : 대지, 1 : 산)
    lnbrMnnm: string; // 지번본번(번지)
    lnbrSlno: string; // 지번부번(호)
    emdNo: string; // 읍면동일련번호
}
