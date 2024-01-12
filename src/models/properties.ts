import img from '../assets/img/kokList/propertyImg.svg';

const properties = [
  {
    id: 1,
    like: true,
    type: '원룸',
    priceType: '월세',
    price: 1000,
    maintenanceFee: 50,
    address: '서울시 관악구 신림동 123-123',
    propertyName: 'OO 부동산',
    imageUrl: img,
  },
  {
    id: 2,
    like: false,
    type: '투룸',
    priceType: '전세',
    price: 10000,
    maintenanceFee: 0,
    address: '서울시 관악구 신림동 123-124',
    propertyName: 'OO 부동산',
    imageUrl: img,
  },
  {
    id: 3,
    like: true,
    type: '원룸',
    priceType: '월세',
    price: 2000,
    maintenanceFee: 50,
    address: '서울시 관악구 신림동 123-125',
    propertyName: 'OO 부동산',
    imageUrl: null,
  },
];

export default properties;