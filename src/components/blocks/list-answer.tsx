import { useGameCtx } from '@/contexts/game-context';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Answer from './answer';

const ListAnswer = () => {
  const { answers } = useGameCtx();
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div className="absolute bottom-0 p-5 z-10 left-0 right-0">
      <div className="flex items-center gap-[14px]">
        <div
          ref={navigationPrevRef}
          className="cursor-pointer disabled:opacity-90"
        >
          <img src="/prev-btn.svg" alt="" className="w-8 h-8" />
        </div>
        <Swiper
          data-should-center={
            answers.filter((row) => !row.isAnswered).length < 9
          }
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          className="relative w-full"
          slidesPerView={9}
          slidesPerGroup={9}
          spaceBetween={14}
          allowTouchMove={false}
          modules={[Navigation]}
        >
          {answers.map((row) =>
            !row.isAnswered ? (
              <SwiperSlide
                key={row.id}
                className="!flex items-center justify-center"
              >
                <Answer question={row} />
              </SwiperSlide>
            ) : null,
          )}
        </Swiper>
        <div
          ref={navigationNextRef}
          className="cursor-pointer disabled:opacity-90"
        >
          <img src="/next-btn.svg" alt="" className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

export default ListAnswer;
