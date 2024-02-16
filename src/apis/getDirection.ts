interface Point {
  name: string;
  x: number;
  y: number;
}

interface Bound {
  min_x: number;
  min_y: number;
  max_x: number;
  max_y: number;
}

export interface Route {
  result_code: number;
  result_msg: string;
  sections: Section[];
  summary: {
    origin: Point;
    destination: Point;
    waypoints: Point[];
    priority: string;
    bound: Bound;
    fare: { taxi: number; toll: number };
    distance: number;
    duration: number;
  };
}

interface Section {
  distance: number;
  duration: number;
  bound: Bound;
  roads: {
    name: string;
    distance: number;
    duration: number;
    traffic_speed: number;
    traffic_state: number;
    vertexes: number[];
  }[];
}

interface Guide {
  name: string;
  x: number;
  y: number;
  distance: number;
  duration: number;
  type: number;
  guidance: string;
  road_index: number;
}

interface DirectionResponse {
  trans_id: string;
  routes: Route[];
  guides: Guide[];
}

/**
 * `GET /https://apis-navi.kakaomobility.com/v1/directions`으로 경로 정보를 요청합니다.
 * @param pinId 핀 ID (전달하지 않으면 모든 핀 목록을 가져옵니다.)
 */
export const getDirection = async (origin: Point, destination: Point) => {
  const res = (await fetch(
    `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin.x},${
      origin.y
    },name=${origin.name.replaceAll(',', '')}&destination=${destination.x},${
      destination.y
    },name=${destination.name.replaceAll(',', '')}`,
    {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK 124720d966d8d1b609e86b767001d44f`,
      },
    },
  ).then((res) => res.json())) as DirectionResponse;
  return res;
};
