import RegisterReview from "./register-review";
import ReviewItem from "./review-item";
import StarRating from "../../common/star/star-rating";

const dummyReviews = [
  {
    id: 1,
    name: "똘병",
    rating: 5,
    content:
      "여기 사람이 많아도 사람이 금방 금방 빠져서 별로 안기달렸어요. 대전에 일이 있어서 기차타고 왔는데 드디어 성심당빵을 먹었네요. 튀김소보로랑 성심 순 크림빵 진짜 맛있어요. 명란바게트는 비주얼때문에 안사먹었네요. 맛있어서 하루에 두번 방문했어요. 대전에 오면 또 방문하고 싶어요 ㅎㅎ",
  },
  {
    id: 2,
    name: "똘병",
    rating: 5,
    content:
      "여기 사람이 많아도 사람이 금방 금방 빠져서 별로 안기달렸어요. 대전에 일이 있어서 기차타고 왔는데 드디어 성심당빵을 먹었네요. 튀김소보로랑 성심 순 크림빵 진짜 맛있어요. 명란바게트는 비주얼때문에 안사먹었네요. 맛있어서 하루에 두번 방문했어요. 대전에 오면 또 방문하고 싶어요 ㅎㅎ",
  },
];

export default function ReviewTab() {
  return (
    <section className="divide-main-100 divide-y-8">
      <div className="typo-medium flex flex-col items-center gap-2 py-2.5">
        <h3 className="text-gray-700">방문 후기를 남겨주세요!</h3>
        <RegisterReview locationId="1" />
      </div>
      <div className="space-y-2.5 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <p className="typo-medium text-gray-700">4.3</p>
            <StarRating rating={4.3} className="size-5" />
          </div>
          <p className="typo-regular text-gray-500">후기 474</p>
        </div>
        <div className="space-y-2.5">
          {dummyReviews.map((review) => (
            <ReviewItem key={review.id} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
}
