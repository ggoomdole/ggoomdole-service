import Image from "next/image";

import { Carousel, CarouselItem } from "@/components/carousel";

const carouselExample = "/static/carousel-example.png";

export default function HomePage() {
  return (
    <main className="flex w-full items-center">
      <Carousel className="py-5" interval={3000}>
        <CarouselItem className="rounded-2xl p-4 shadow-lg">
          <h1 className="typo-bold">
            꿈돌이님,
            <br />
            오늘 어떤 길을
            <br /> 걸어볼까요?
          </h1>
          <p>
            지금 바로 특별한 <span className="text-main-900 typo-medium">순례길</span>에
            참여해보세요!
          </p>
        </CarouselItem>
        <CarouselItem className="relative overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={carouselExample}
            alt="carousel-example"
            fill
            className="object-cover"
            draggable={false}
          />
        </CarouselItem>
      </Carousel>
    </main>
  );
}
