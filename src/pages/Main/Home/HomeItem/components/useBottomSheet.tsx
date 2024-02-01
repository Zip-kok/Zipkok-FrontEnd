import { useRef, useEffect, useState } from 'react';

import { MAX_Y, MIN_Y } from './BottomSheetOption';

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number; // touchstart에서 BottomSheet의 최상단 모서리의 Y값
    touchY: number; // touchstart에서 터치 포인트의 Y값
  };
  touchMove: {
    prevTouchY?: number; // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
    movingDirection: 'none' | 'down' | 'up'; // 유저가 터치를 움직이고 있는 방향
  };
  isContentAreaTouched: boolean; // 컨텐츠 영역을 터치하고 있음을 기록
}

export function useBottomSheet() {
  const sheet = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none',
    },
    isContentAreaTouched: false,
  });

  // 목록보기 버튼 클릭 시 바텀 시트를 올림
  const toggleSheet = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      moveSheetUp();
    }
  };
  const moveSheetUp = () => {
    if (sheet.current) {
      sheet.current.style.transform = `translateY(${MIN_Y - MAX_Y}px)`;
    }
  };

  useEffect(() => {
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;

      // 바텀시트에서 컨텐츠 영역이 아닌 부분을 터치하면 움직임
      if (!isContentAreaTouched) {
        return true;
      }

      const y = sheet.current?.getBoundingClientRect().y;
      if (y !== MIN_Y) {
        return true;
      }

      if (touchMove.movingDirection === 'down') {
        return content.current!.scrollTop <= 0;
      }

      return false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;

      touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY < currentTouch.clientY) {
        touchMove.movingDirection = 'down';
      }

      if (touchMove.prevTouchY > currentTouch.clientY) {
        touchMove.movingDirection = 'up';
      }

      if (canUserMoveBottomSheet()) {
        // content에서 scroll이 발생하는 거 막기
        e.preventDefault();

        // 터치 시작점에서부터 현재 터치 포인트까지의 변화된 y값
        const touchOffset = currentTouch.clientY - touchStart.touchY;
        let nextSheetY = touchStart.sheetY + touchOffset;

        if (nextSheetY <= MIN_Y) {
          nextSheetY = MIN_Y;
        }

        if (nextSheetY >= MAX_Y) {
          nextSheetY = MAX_Y;
        }

        // sheet 위치 갱신.
        sheet.current!.style.setProperty(
          'transform',
          `translateY(${nextSheetY - MAX_Y}px)`,
        ); //바닥 만큼은 빼야한다
      } else {
        // 컨텐츠를 스크롤하는 동안에는 body가 스크롤되는 것을 막습니다
        document.body.style.overflowY = 'hidden';
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      document.body.style.overflowY = 'auto';
      const { touchMove } = metrics.current;

      const currentSheetY = sheet.current!.getBoundingClientRect().y;

      if (currentSheetY !== MIN_Y) {
        if (touchMove.movingDirection === 'down') {
          sheet.current!.style.setProperty('transform', 'translateY(0)');
        }

        if (touchMove.movingDirection === 'up') {
          sheet.current!.style.setProperty(
            'transform',
            `translateY(${MIN_Y - MAX_Y}px)`,
          );
        }
      }

      // metrics 초기화.
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none',
        },
        isContentAreaTouched: false,
      };
    };

    sheet.current!.addEventListener('touchstart', handleTouchStart);
    sheet.current!.addEventListener('touchmove', handleTouchMove);
    sheet.current!.addEventListener('touchend', handleTouchEnd);
  }, []);

  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current.isContentAreaTouched = true;
    };

    content.current!.addEventListener('touchstart', handleTouchStart);
  }, []);

  return { sheet, content, toggleSheet };
}
