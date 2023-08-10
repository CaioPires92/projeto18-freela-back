--
-- PostgreSQL database dump
--

-- Dumped from database version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    category_id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;


--
-- Name: services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.services (
    id integer NOT NULL,
    user_id integer,
    category_id integer,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    photo_url character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    phone character varying(20) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.id;


--
-- Name: categories category_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);


--
-- Name: services id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.categories VALUES (1, 'Limpeza', '2023-08-08 21:40:59.392756');
INSERT INTO public.categories VALUES (2, 'Reparos', '2023-08-08 21:40:59.392756');
INSERT INTO public.categories VALUES (3, 'Beleza', '2023-08-08 21:40:59.392756');
INSERT INTO public.categories VALUES (4, 'Educação', '2023-08-08 21:40:59.392756');
INSERT INTO public.categories VALUES (5, 'Saúde e Bem-Estar', '2023-08-08 21:40:59.392756');
INSERT INTO public.categories VALUES (6, 'Alimentação', '2023-08-08 21:40:59.392756');
INSERT INTO public.categories VALUES (7, 'Transporte', '2023-08-08 21:40:59.392756');
INSERT INTO public.categories VALUES (8, 'Tecnologia', '2023-08-08 21:40:59.392756');
INSERT INTO public.categories VALUES (9, 'Artes e Entretenimento', '2023-08-08 21:40:59.392756');
INSERT INTO public.categories VALUES (10, 'Construção e Reforma', '2023-08-08 21:40:59.392756');


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.services VALUES (4, 1, 1, 'encanador', 'especialista em banheiro', 'https://uploads.metropoles.com/wp-content/uploads/2022/10/06182914/super-mario-bros..jpg', 100.00, true, '2023-08-08 22:53:09.467392');
INSERT INTO public.services VALUES (5, 1, 1, 'encanador', 'especialista em banheiro', 'https://uploads.metropoles.com/wp-content/uploads/2022/10/06182914/super-mario-bros..jpg', 100.00, true, '2023-08-08 22:56:08.054934');
INSERT INTO public.services VALUES (1, 1, 3, 'Manicuri', 'especialista mão', 'https://uploads.metropoles.com/wp-content/uploads/2022/10/06182914/super-mario-bros..jpg', 300.00, true, '2023-08-08 22:39:54.49193');
INSERT INTO public.services VALUES (7, 2, 2, 'Mecanico2', 'especialista em carros', 'https://uploads.metropoles.com/wp-content/uploads/2022/10/06182914/super-mario-bros..jpg', 1000.00, true, '2023-08-09 21:02:08.943575');
INSERT INTO public.services VALUES (9, 3, 2, 'Mecanico2', 'especialista em carros', 'https://uploads.metropoles.com/wp-content/uploads/2022/10/06182914/super-mario-bros..jpg', 1000.00, true, '2023-08-09 22:14:48.346561');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 1, '8087e8eb-696c-4cdb-863d-010ac8aa9785', '2023-08-08 22:55:49.709046');
INSERT INTO public.sessions VALUES (2, 2, '5ae39dd4-50ab-4502-a1c8-d226b92e6370', '2023-08-09 21:00:53.759526');
INSERT INTO public.sessions VALUES (3, 3, '1b0b9f54-892d-486a-8fb8-0637113757ac', '2023-08-09 21:55:32.965779');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (2, 'mario@mario.com', '$2b$10$eoawKmLMz9781inRdVx.k.lHgFjtEU3d6jeS27eEFq9AWe3JCeMOS', 'Mario', 'Serra Negra', '19-99999-8888', '2023-08-09 21:00:43.895073');
INSERT INTO public.users VALUES (3, 'mario@mario2.com', '$2b$10$M17Z34qdkS0AEagcZK.f5O/ORHQUoH1MdjbUyyGwUFcwlH5gO.EG6', 'Mario', 'Serra Negra', '19-99999-8888', '2023-08-09 21:45:34.028057');
INSERT INTO public.users VALUES (1, 'caio@caio.com', '$2b$10$sgYxGfgACTYY.a1I9U8Wc.hgEL0lADWgfPUGnMDg6IZZhkdVb03v6', 'Caio', 'Amparo', '19-99999-8888', '2023-08-08 18:45:57.356964');


--
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_category_id_seq', 10, true);


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.services_id_seq', 9, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 3, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: services services_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id);


--
-- Name: services services_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

