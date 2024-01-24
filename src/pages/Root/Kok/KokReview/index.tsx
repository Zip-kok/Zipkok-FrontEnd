import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import BottomBtn from 'components/BottomBtn';
import Header from 'components/Header';
import StarRating from 'components/StarRating';
import SwiperCom from 'components/Swiper';

import styles from './KokReview.module.css';
import starRed from '../../../../assets/img/kokList/star_red.svg';
import starWhite from '../../../../assets/img/line(1)/star_white.svg';
import data from '../../../../models/kokItemDetail.json';

const Tags = [
  { name: '깔끔해요', selected: false },
  { name: '조용해요', selected: false },
  { name: '세련돼요', selected: false },
  { name: '심플해요', selected: false },
  { name: '더러워요', selected: false },
  { name: '냄새나요', selected: false },
  { name: '시끄러워요', selected: false },
  { name: '좁아요', selected: false },
  { name: '그냥 그래요', selected: false },
  { name: '마음에 들어요', selected: false },
  { name: '별로예요', selected: false },
];

export default function KokItem() {
  const navigate = useNavigate();
  const [tags, setTags] = useState(Tags);

  const [rating, setRating] = useState(0);
  const totalStars = 5;
  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleTagClick = (index: number) => {
    setTags(
      tags.map((tag, i) => {
        if (i === index) {
          return { ...tag, selected: !tag.selected };
        }
        return tag;
      }),
    );
  };
  const { code, message, result } = data;

  return (
    <div className={styles.root}>
      <div className="top">
        <Header title="발품 후기" backBtnEnabled onBack={() => navigate(-1)} />
      </div>
      <div className={styles.image}>
        <SwiperCom imageUrls={result.imageInfo.imageUrls}></SwiperCom>
      </div>
      <div className={styles.reviews}>
        <div className={styles.review}>
          <h1 style={{ marginBottom: '17px', marginTop: '25px' }}>
            집의 첫인상이 어땠나요?
          </h1>
          <div>
            <div className={styles.tags}>
              {tags.map((tag, index) => (
                <button
                  key={index}
                  className={tag.selected ? styles.tagSelected : styles.tag}
                  onClick={() => handleTagClick(index)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.review}>
          <h1 style={{ marginBottom: '28px', marginTop: '45px' }}>
            매물은 어떠셨나요?
          </h1>
          <StarRating label="시설" onRating={(rating) => console.log(rating)} />
          <StarRating
            label="인프라"
            onRating={(rating) => console.log(rating)}
          />
          <StarRating label="구조" onRating={(rating) => console.log(rating)} />
          <StarRating
            label="분위기"
            onRating={(rating) => console.log(rating)}
          />
        </div>
        <div className={styles.review}>
          <textarea placeholder="매물에 대한 후기를 자유롭게 남겨보세요."></textarea>
        </div>
      </div>
      <BottomBtn text="저장하기" onClick={() => {}} />
    </div>
  );
}
