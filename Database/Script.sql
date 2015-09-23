CREATE TABLE access_level(
	id serial not null,
	description varchar(150) not null,
	constraint al_pk primary key(id)
);

CREATE TABLE users(
	cpf bigint not null,
	name varchar(300) not null,
	address varchar(500) not null,
	city varchar(200) not null,
	state_city varchar(2) not null,
	country varchar(100) not null,
	zip_code bigint,
	password varchar(500) not null,
	email varchar(200) not null,
	number_of_residents int,
	access_level int not null,
	constraint users_pk primary key(cpf),
	constraint al_fk foreign key(access_level)
		references access_level(id)
);

CREATE TABLE boards(
	mac_address varchar(12) not null,
	cpf_user bigint not null,
	constraint boards_pk primary key(mac_address),
	constraint users_fk foreign key (cpf_user)
		references users(cpf)
);

CREATE TABLE history(
	id serial not null,
	mac_address varchar(12) not null,
	time_register timestamp not null,
	water_flow double precision not null,
	constraint history_pk primary key(id),
	constraint board_fk foreign key (mac_address)
		references boards(mac_address)
);

INSERT INTO access_level(description) VALUES ('Administrator');
INSERT INTO access_level(description) VALUES ('User');
