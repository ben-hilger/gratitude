create table if not exists users
(
    id              uuid not null
        primary key,
    name            varchar(200),
    email           varchar(200),
    hashed_password varchar(500)
);

create table if not exists gratitude_entries
(
    id                 uuid not null
        primary key,
    message            varchar(1000),
    date_gratitude_utc date not null,
    date_added_utc     date default now(),
    date_modified_utc  date default now(),
    user_id            uuid
        references users
);

create table if not exists user_sessions
(
    id               uuid,
    user_id          uuid
        references users,
    expires_date_utc date
);


