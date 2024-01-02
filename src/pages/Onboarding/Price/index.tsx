import React, { useState } from 'react'

import styles from "./Price.module.css"

interface PriceProps{
  confirmPrice: (Price: string) => void ;
}

const fixedMinPrice = 0;
const fixedMaxPrice = 10000 ;
const priceGap = 100;

const fixed2MinPrice = 0;
const fixed2MaxPrice = 180 ;
const priceGap2 = 1;

const fixed3MinPrice = 0;
const fixed3MaxPrice = 90 ;
const priceGap3 = 1; 

export default function Price( {confirmPrice} : PriceProps) {
  const [price, setPrice] = useState("");
  const [priceType,setPriceType] = useState("");

  const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice); 
  const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);
  const [rangeMinPercent, setRangeMinPercent] = useState(0);
  const [rangeMaxPercent, setRangeMaxPercent] = useState(0);  

  const [range2MinValue, setRange2MinValue] = useState(fixed2MinPrice); 
  const [range2MaxValue, setRange2MaxValue] = useState(fixed2MaxPrice);
  const [range2MinPercent, setRange2MinPercent] = useState(0);
  const [range2MaxPercent, setRange2MaxPercent] = useState(0);  

  const [range3MinValue, setRange3MinValue] = useState(fixed3MinPrice); 
  const [range3MaxValue, setRange3MaxValue] = useState(fixed3MaxPrice);
  const [range3MinPercent, setRange3MinPercent] = useState(0);
  const [range3MaxPercent, setRange3MaxPercent] = useState(0);  

  const priceRangeMinValueHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setRangeMinValue(parseInt(e.target.value));
  };
  
  const priceRangeMaxValueHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setRangeMaxValue(parseInt(e.target.value));
  };

  const twoRangeHandler = () => {
    if (rangeMaxValue - rangeMinValue < priceGap) {
      setRangeMaxValue(rangeMinValue + priceGap);
      setRangeMinValue(rangeMaxValue - priceGap);
    } else {
      setRangeMinPercent((rangeMinValue / fixedMaxPrice) * 100);
      setRangeMaxPercent(100 - (rangeMaxValue / fixedMaxPrice) * 100);
    }
  };

  const priceRange2MinValueHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setRange2MinValue(parseInt(e.target.value));
  };
  
  const priceRange2MaxValueHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setRange2MaxValue(parseInt(e.target.value));
  };

  const twoRange2Handler = () => {
    if (range2MaxValue - range2MinValue < priceGap2) {
      setRange2MaxValue(range2MinValue + priceGap2);
      setRange2MinValue(range2MaxValue - priceGap2);
    } else {
      setRange2MinPercent((range2MinValue / fixed2MaxPrice) * 100);
      setRange2MaxPercent(100 - (range2MaxValue / fixed2MaxPrice) * 100);
    }
  };

  const priceRange3MinValueHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setRange3MinValue(parseInt(e.target.value));
  };
  
  const priceRange3MaxValueHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setRange3MaxValue(parseInt(e.target.value));
  };

  const twoRange3Handler = () => {
    if (range3MaxValue - range3MinValue < priceGap3) {
      setRange3MaxValue(range3MinValue + priceGap3);
      setRange3MinValue(range3MaxValue - priceGap3);
    } else {
      setRange3MinPercent((range3MinValue / fixed3MaxPrice) * 100);
      setRange3MaxPercent(100 - (range3MaxValue / fixed3MaxPrice) * 100);
    }
  };



  function handleConfirmClick() {
    confirmPrice(price);
}

  function handlePriceType(priceType : string){
    setPriceType(priceType);
}


  return (
    <div className={styles.root}>
        <div className={styles.header}>
            <h1>
              거래 유형에 따른<br></br>가격 범위를 설정해주세요
            </h1>
        </div>
        <div className={styles.price}>
            <button className={priceType ==="월세" ? styles.activeButton : ""}
            onClick={() => handlePriceType("월세")}>월세</button>
            <button className={priceType ==="전세" ? styles.activeButton : ""}
            onClick={() => handlePriceType("전세")}>전세</button>
            <button className={priceType ==="매매" ? styles.activeButton : ""}
            onClick={() => handlePriceType("매매")}>매매</button>
        </div>

      <div className={styles.priceTypeInf}>
        {priceType === "월세" && (
          <a className={styles.depositRange}>
          <div>
            <p>보증금</p> 
            <p>
              <a style={{ left: `${rangeMinPercent}%` }}>
              {rangeMinPercent !== 0 ? `${Math.ceil(rangeMinPercent*100)}만` : "최소"}
              </a>
              <a style={{right: `${rangeMaxPercent-5}%`}}>
              {Math.ceil(100-rangeMaxPercent)*100}만
              </a>
            </p>
          
          <div className={styles.priceSlide}>
            <div className={styles.priceSlideInner} 
              style={{left: `${rangeMinPercent}%`,right:`${rangeMaxPercent}%`}}></div>
            
            <div className={styles.priceRangeWrap}>
              <input className={styles.priceRangeMin} type="range"
              min={fixedMinPrice}  max={fixedMaxPrice - priceGap}
              step="100"
              value={rangeMinValue}
              onChange={e => {
                priceRangeMinValueHandler(e);
                twoRangeHandler();
              }}/>
              <input className={styles.priceRangeMax} type="range" 
              min={fixedMinPrice + priceGap}
              max={fixedMaxPrice}
              step="100"
              value={rangeMaxValue}
              onChange={e => {
                priceRangeMaxValueHandler(e);
                twoRangeHandler();
              }}/>
              <div className={styles.priceRangeLine1}></div>
              <div className={styles.priceRangeLine2}></div>
              <div className={styles.priceRangeText1}>3300만</div>
              <div className={styles.priceRangeText2}>6600만</div>
            </div>
          </div>
        </div>
        <div>
          <p>월세</p> 
          <p>
            <a style={{ left: `${range2MinPercent}%` }}>
            {range2MinPercent !== 0 ? `${Math.ceil(range2MinPercent)}만` : "최소"}
            </a>
            <a style={{right: `${range2MaxPercent-5}%`}}>
              {Math.ceil(180-range2MaxPercent)}만
            </a>
          </p>
          
          <div className={styles.priceSlide}>
            <div className={styles.priceSlideInner} 
              style={{left: `${range2MinPercent}%`,right:`${range2MaxPercent}%`}}></div>
            
            <div className={styles.priceRangeWrap}>
              <input className={styles.priceRangeMin} type="range"
              min={fixed2MinPrice}  max={fixed2MaxPrice - priceGap2}
              step="1"
              value={range2MinValue}
              onChange={e => {
                priceRange2MinValueHandler(e);
                twoRange2Handler();
              }}/>
              <input className={styles.priceRangeMax} type="range" 
              min={fixed2MinPrice + priceGap2}
              max={fixed2MaxPrice}
              step="1"
              value={range2MaxValue}
              onChange={e => {
                priceRange2MaxValueHandler(e);
                twoRange2Handler();
              }}/>
              <div className={styles.priceRangeLine1}></div>
              <div className={styles.priceRangeLine2}></div>
              <div className={styles.priceRangeText1}>60만</div>
              <div className={styles.priceRangeText2}>120만</div>
            </div>
          </div>
        </div>
        </a>
      )}

        {priceType === "전세" && (
        <a>
          <div>
          <p>보증금</p> 
          <p>
            <a style={{ left: `${range3MinPercent}%` }}>
            {range3MinPercent !== 0 ? `${Math.ceil(range3MinPercent)}만` : "최소"}
            </a>
            <a style={{right: `${range3MaxPercent-5}%`}}>
              {Math.ceil(180-range3MaxPercent)}만
            </a>
          </p>
          
          <div className={styles.priceSlide}>
            <div className={styles.priceSlideInner} 
              style={{left: `${range3MinPercent}%`,right:`${range3MaxPercent}%`}}></div>
            
            <div className={styles.priceRangeWrap}>
              <input className={styles.priceRangeMin} type="range"
              min={fixed3MinPrice}  max={fixed3MaxPrice - priceGap3}
              step="1"
              value={range3MinValue}
              onChange={e => {
                priceRange3MinValueHandler(e);
                twoRange3Handler();
              }}/>
              <input className={styles.priceRangeMax} type="range" 
              min={fixed3MinPrice + priceGap3}
              max={fixed3MaxPrice}
              step="1"
              value={range3MaxValue}
              onChange={e => {
                priceRange3MaxValueHandler(e);
                twoRange3Handler();
              }}/>
              <div className={styles.priceRangeLine1}></div>
              <div className={styles.priceRangeLine2}></div>
              <div className={styles.priceRangeText1}>60만</div>
              <div className={styles.priceRangeText2}>120만</div>
            </div>
          </div>
        </div>
        </a>
        )}
        
        {priceType === "매매" && (
      <a>
        <div>
          <p>매매가</p> 
          <p>
            <a style={{ left: `${rangeMinPercent}%` }}>
            {rangeMinPercent !== 0 ? `${Math.ceil(rangeMinPercent)}억` : "최소"}
            </a>
            <a style={{right: `${rangeMaxPercent-5}%`}}>
              {Math.ceil(90-rangeMaxPercent)}억
            </a>
          </p>
          
          <div className={styles.priceSlide}>
            <div className={styles.priceSlideInner} 
              style={{left: `${rangeMinPercent}%`,right:`${rangeMaxPercent}%`}}></div>
            
            <div className={styles.priceRangeWrap}>
              <input className={styles.priceRangeMin} type="range"
              min={fixedMinPrice}  max={fixedMaxPrice - priceGap}
              step="1"
              value={rangeMinValue}
              onChange={e => {
                priceRangeMinValueHandler(e);
                twoRangeHandler();
              }}/>
              <input className={styles.priceRangeMax} type="range" 
              min={fixedMinPrice + priceGap}
              max={fixedMaxPrice}
              step="1"
              value={rangeMaxValue}
              onChange={e => {
                priceRangeMaxValueHandler(e);
                twoRangeHandler();
              }}/>
              <div className={styles.priceRangeLine1}></div>
              <div className={styles.priceRangeLine2}></div>
              <div className={styles.priceRangeText1}>30억</div>
              <div className={styles.priceRangeText2}>60억</div>
            </div>
          </div>
        </div> 
        </a> )}
      </div>
        <div className={styles.footer}>
          <a>나중에 설정하기</a>
          <button className="btnBottom" disabled={priceType === ""} 
            onClick={handleConfirmClick}>
              확인
          </button>
        </div>
    </div>
  )
}