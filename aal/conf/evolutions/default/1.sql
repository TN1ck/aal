# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table calendar_item (
  id                        bigint not null,
  text                      TEXT,
  location                  TEXT,
  priority                  varchar(255),
  category                  varchar(255),
  start_date                timestamp,
  end_date                  timestamp,
  constraint pk_calendar_item primary key (id))
;

create table news_item (
  id                        bigint not null,
  header                    TEXT,
  text                      TEXT,
  category                  varchar(255),
  publisher                 varchar(255),
  date                      timestamp,
  constraint pk_news_item primary key (id))
;

create table social_item (
  id                        bigint not null,
  text                      varchar(255),
  type                      varchar(255),
  url                       varchar(255),
  picture                   varchar(255),
  name                      varchar(255),
  created                   timestamp,
  constraint pk_social_item primary key (id))
;

create table todo_item (
  id                        bigint not null,
  text                      TEXT,
  type                      varchar(255),
  created                   timestamp,
  constraint pk_todo_item primary key (id))
;

create sequence calendar_item_seq;

create sequence news_item_seq;

create sequence social_item_seq;

create sequence todo_item_seq;




# --- !Downs

drop table if exists calendar_item cascade;

drop table if exists news_item cascade;

drop table if exists social_item cascade;

drop table if exists todo_item cascade;

drop sequence if exists calendar_item_seq;

drop sequence if exists news_item_seq;

drop sequence if exists social_item_seq;

drop sequence if exists todo_item_seq;

