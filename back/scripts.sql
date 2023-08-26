DROP SCHEMA IF EXISTS news;

create schema news;

use news;

create table news
(
    id      int auto_increment,
    title   varchar(100) not null,
    content text         not null,
    image   varchar(200) null,
    datetime datetime default NOW() NULL,
    constraint news_pk
        primary key (id)
);

create table comments
(
    id      int auto_increment
        primary key,
    news_id int          not null,
    author  varchar(100) null,
    content text         not null,
    constraint comments_news_id_fk
        foreign key (news_id) references news (id)
    on update cascade on delete cascade
);

INSERT INTO news.news (title, content) VALUES ('Эндокринолог Павлова объяснила вред фруктово-ягодной диеты', 'Врач пояснила, что фруктоза в ягодах и фруктах способствует накоплению жира в организме. Кроме того, она пробуждает выработку инсулина, что повышает аппетит. Кроме того, из-за значительного потребления фруктов и ягод у человека может начаться метеоризм и вздутие живота.

«Ни в коем случае не призываю отказаться от ягод, особенно сезонных! Ешьте хоть каждый день, но не больше стаканчика и только после завтрака/обеда. На ужин ягоды — не лучшее решение», — заключила специалист.');

INSERT INTO news.comments (news_id, author, content) VALUES (1, 'Юлия Анасян', 'Какой кошмар!!!');
INSERT INTO news.news (title, content) VALUES ('Канадская «столица белых медведей» скоро окажется переполнена животными', 'Канадский город Черчилль в провинции Манитоба известен как неофициальная «столица белых медведей» из-за того, что ежегодно его и близлежащий Гудзонов залив в период с июля по ноябрь посещает несколько сотен этих животных, однако в этом году число белых медведей может стать рекордным. Отмечается, что жители населенного пункта уже отметили необычайно высокое количество медведей в окрестностях города, что, предположительно, обусловлено низким уровнем морского льда.

      ')