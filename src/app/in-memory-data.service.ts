import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Hero} from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      {id: 1,

        name: 'Нежное женственное платье из креп -шифона',
        img: ["./assets/photo-dress/photo1.jpg",
          "./assets/photo-dress/photo2.jpg" ],
        size: ["X","L"],
        content: 'Костюм выполнен из натурального итальянского льна , в жаркий день в нем Вы будите чувствовать себя максимально комфортно',
        price:'5000 ₴'
      },
      {id: 2,

        name: 'Платье -бюстье из натурального итальянского льна',
        img: ["./assets/photo-dress/photo3.jpg",
          "./assets/photo-dress/photo4.jpg" ],
        size: ["X","L"],
        content:'Необыкновенной красоты лён из которого выполнено наше платье бюстье',
        price:'6000 ₴'
      },

      {id: 3,

        name: 'Костюм топ с юбкой из итальянского льна',
        img: ["./assets/photo-dress/photo5.jpg",
          "./assets/photo-dress/photo6.jpg" ],
        size: ["X","L"],
        content:'Костюм очень просто сочетать \n'+'\n с другими изделиями из вашего гардероба . Например юбку можно носить с футболкой или рубашкой , топом .',
        price:'7000 ₴'
      },
      {id: 4,

        name: 'Платье из итальянского полированного хлопка с шёлком',
        img: ["./assets/photo-dress/photo7.jpg",
          "./assets/photo-dress/photo8.jpg"],
        size: ["X","L"],
        content:'Ткань шелковистая и лёгкая очень приятная тактильно 💕',
      price:'8000 ₴'},
      {id: 5,

        name: 'Сочное платье в оттенке Сицилийский апельсин',
        img: ["./assets/photo-dress/photo9.jpg",
        "./assets/photo-dress/photo10.jpg"],
        size: ["X","L"],
        content:'Сочное платье с открытой спинкой самого популярного цвета в этом сезоне 🍊',
        price:'9000 ₴'},
      {id: 6,

        name: 'Костюм топ с юбкой из итальянского льна',
        img: ["./assets/photo-dress/photo11.jpg",
        "./assets/photo-dress/photo12.jpg"],
        size: ["X","L"],
        content:'Топ можно носить в двух вариантах , завязывая на груди ,или на запах',
        price:'2000 ₴'},
      {id:7,

        name:'Костюм',
        img:[
          "./assets/photocostume/photo1.jpg",
          "./assets/photocostume/photo2.jpg"
        ],
        size: ["X","L"],
        content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
        price:'4000 ₴'
      },
      {id:8,

      name:'Костюм',
      img:[
      "./assets/photocostume/photo3.jpg",
      "./assets/photocostume/photo4.jpg"
    ],
      size: ["X","L"],
      content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
      price:'5000 ₴'
  },
      {id:9,

        name:'Костюм',
        img:[
          "./assets/photocostume/photo5.jpg",
          "./assets/photocostume/photo6.jpg"
        ],
        size: ["X","L"],
        content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
        price:'7000 ₴'
      },
      {id:10,

        name:'Костюм',
        img:[
          "./assets/photocostume/photo7.jpg",
          "./assets/photocostume/photo8.jpg"
        ],
        size: ["X","L"],
        content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
        price:'1000 ₴'
      },
      {id:11,

        name:'Костюм',
        img:[
          "./assets/photocostume/photo9.jpg",
          "./assets/photocostume/photo10.jpg"
        ],
        size: ["X","L"],
        content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
        price:'7000 ₴'
      },
      {id:12,

        name:'Пальто',
        img:[
          "./assets/photo-outerwear/photo1.jpg",
          "./assets/photo-outerwear/photo2.jpg"
        ],
        size: ["X","L"],
        content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
        price:'3000 ₴'
      },
      {id:13,

        name:'Пальто',
        img:[
          "./assets/photo-outerwear/photo3.jpg",
          "./assets/photo-outerwear/photo4.jpg"
        ],
        size: ["X","L"],
        content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
        price:'7000 ₴'
      },
      {id:14,

        name:'Пальто',
        img:[
          "./assets/photo-outerwear/photo5.jpg",
          "./assets/photo-outerwear/photo6.jpg"
        ],
        size: ["X","L"],
        content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
        price:'9000 ₴'
      },
      {id:15,

        name:'Пальто',
        img:[
          "./assets/photo-outerwear/photo7.jpg",
          "./assets/photo-outerwear/photo8.jpg"
        ],
        size: ["X","L"],
        content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
        price:'4000 ₴'
      },

      {id:16,

        name:'Юбка',
        img:[
          "./assets/photo-skirt/photo1.jpg",
          "./assets/photo-skirt/photo2.jpg"
        ],
        size: ["X","L"],
        content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
        price:'9000 ₴'
      },
      {id:17,

        name:'Юбка',
        img:[
          "./assets/photo-skirt/photo3.jpg",
          "./assets/photo-skirt/photo4.jpg"
        ],
        size: ["X","L"],
        content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
        price:'7000 ₴'
      },
      {id:18,

        name:'Юбка',
        img:[
          "./assets/photo-skirt/photo5.jpg",
          "./assets/photo-skirt/photo6.jpg"
        ],
        size: ["X","L"],
        content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
        price:'7000 ₴'
      },
      {id:19,

        name:'Юбка',
        img:[
          "./assets/photo-skirt/photo7.jpg",
          "./assets/photo-skirt/photo8.jpg"
        ],
        size: ["X","L"],
        content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
        price:'8000 ₴'
      },
      {id:20,

        name:'Юбка',
        img:[
          "./assets/photo-skirt/photo9.jpg",
          "./assets/photo-skirt/photo10.jpg"
        ],
        size: ["X","L"],
        content:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
        price:'4000 ₴'
      },
    ];



    return {heroes};
  }

  getId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
  constructor() { }
}

