--
-- PostgreSQL database dump
--

\restrict WdvId6EEWWtOmTMhkdoSG4agx9Dv4mCfakjcijfWHnTADkK4N8UWGpuUYC5tPwf

-- Dumped from database version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)

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
-- Name: admission_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admission_details (
    id integer NOT NULL,
    study_program_id integer NOT NULL,
    quota integer,
    required_documents text,
    admission_conditions text,
    entrance_exam_details text,
    additional_notes text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.admission_details OWNER TO postgres;

--
-- Name: admission_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admission_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admission_details_id_seq OWNER TO postgres;

--
-- Name: admission_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admission_details_id_seq OWNED BY public.admission_details.id;


--
-- Name: application_deadlines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.application_deadlines (
    id integer NOT NULL,
    study_program_id integer NOT NULL,
    deadline_type character varying(50) NOT NULL,
    deadline_date date NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT application_deadlines_deadline_type_check CHECK (((deadline_type)::text = ANY ((ARRAY['prijava'::character varying, 'prijemni'::character varying, 'upis'::character varying])::text[])))
);


ALTER TABLE public.application_deadlines OWNER TO postgres;

--
-- Name: application_deadlines_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.application_deadlines_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.application_deadlines_id_seq OWNER TO postgres;

--
-- Name: application_deadlines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.application_deadlines_id_seq OWNED BY public.application_deadlines.id;


--
-- Name: faculties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faculties (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    university_name character varying(150) NOT NULL,
    city character varying(100) NOT NULL,
    address character varying(200),
    type character varying(20) NOT NULL,
    description text,
    website_url text,
    cover_image text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    short_description text,
    CONSTRAINT faculties_type_check CHECK (((type)::text = ANY ((ARRAY['drzavni'::character varying, 'privatni'::character varying])::text[])))
);


ALTER TABLE public.faculties OWNER TO postgres;

--
-- Name: faculties_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faculties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.faculties_id_seq OWNER TO postgres;

--
-- Name: faculties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.faculties_id_seq OWNED BY public.faculties.id;


--
-- Name: faculty_files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faculty_files (
    id integer NOT NULL,
    faculty_id integer NOT NULL,
    file_name character varying(255) NOT NULL,
    file_path text NOT NULL,
    file_type character varying(20) NOT NULL,
    uploaded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT faculty_files_file_type_check CHECK (((file_type)::text = ANY ((ARRAY['image'::character varying, 'pdf'::character varying])::text[])))
);


ALTER TABLE public.faculty_files OWNER TO postgres;

--
-- Name: faculty_files_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faculty_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.faculty_files_id_seq OWNER TO postgres;

--
-- Name: faculty_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.faculty_files_id_seq OWNED BY public.faculty_files.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    user_id integer NOT NULL,
    faculty_id integer NOT NULL,
    rating integer NOT NULL,
    comment text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: saved_faculties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saved_faculties (
    id integer NOT NULL,
    user_id integer NOT NULL,
    faculty_id integer NOT NULL,
    saved_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.saved_faculties OWNER TO postgres;

--
-- Name: saved_faculties_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.saved_faculties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.saved_faculties_id_seq OWNER TO postgres;

--
-- Name: saved_faculties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.saved_faculties_id_seq OWNED BY public.saved_faculties.id;


--
-- Name: study_programs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.study_programs (
    id integer NOT NULL,
    faculty_id integer NOT NULL,
    name character varying(150) NOT NULL,
    field_area character varying(100) NOT NULL,
    degree_level character varying(30) NOT NULL,
    duration_years integer,
    tuition_fee numeric(10,2),
    has_entrance_exam boolean DEFAULT false,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    city character varying(100),
    CONSTRAINT study_programs_degree_level_check CHECK (((degree_level)::text = ANY ((ARRAY['osnovne'::character varying, 'master'::character varying, 'doktorske'::character varying])::text[]))),
    CONSTRAINT study_programs_duration_years_check CHECK ((duration_years > 0)),
    CONSTRAINT study_programs_tuition_fee_check CHECK (((tuition_fee IS NULL) OR (tuition_fee >= (0)::numeric)))
);


ALTER TABLE public.study_programs OWNER TO postgres;

--
-- Name: study_programs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.study_programs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.study_programs_id_seq OWNER TO postgres;

--
-- Name: study_programs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.study_programs_id_seq OWNED BY public.study_programs.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    email character varying(120) NOT NULL,
    password_hash text NOT NULL,
    role character varying(20) DEFAULT 'user'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['user'::character varying, 'admin'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: admission_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admission_details ALTER COLUMN id SET DEFAULT nextval('public.admission_details_id_seq'::regclass);


--
-- Name: application_deadlines id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application_deadlines ALTER COLUMN id SET DEFAULT nextval('public.application_deadlines_id_seq'::regclass);


--
-- Name: faculties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faculties ALTER COLUMN id SET DEFAULT nextval('public.faculties_id_seq'::regclass);


--
-- Name: faculty_files id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faculty_files ALTER COLUMN id SET DEFAULT nextval('public.faculty_files_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: saved_faculties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_faculties ALTER COLUMN id SET DEFAULT nextval('public.saved_faculties_id_seq'::regclass);


--
-- Name: study_programs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_programs ALTER COLUMN id SET DEFAULT nextval('public.study_programs_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: admission_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admission_details (id, study_program_id, quota, required_documents, admission_conditions, entrance_exam_details, additional_notes, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: application_deadlines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.application_deadlines (id, study_program_id, deadline_type, deadline_date, description, created_at) FROM stdin;
\.


--
-- Data for Name: faculties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faculties (id, name, university_name, city, address, type, description, website_url, cover_image, created_at, updated_at, short_description) FROM stdin;
3	Ekonomski fakultet	Univerzitet Crne Gore	Podgorica	Jovana Tomaševića 37	drzavni	Ekonomski fakultet Univerziteta Crne Gore obrazuje studente u oblastima ekonomije, menadžmenta, finansija, poslovanja i preduzetništva. Nastava je usmjerena na razumijevanje ekonomskih procesa, tržišta, organizacije poslovanja i donošenja poslovnih odluka. Fakultet priprema studente za rad u privredi, bankarstvu, javnom sektoru, međunarodnim organizacijama i drugim oblastima koje zahtijevaju ekonomska i menadžerska znanja.	https://www.ucg.ac.me/ef	/images/faculties/ekonomski.jpg	2026-05-11 17:37:07.54655	2026-05-11 17:37:07.54655	Studije ekonomije, menadžmenta, finansija i poslovanja.
4	Elektrotehnički fakultet	Univerzitet Crne Gore	Podgorica	Džordža Vašingtona bb	drzavni	Elektrotehnički fakultet Univerziteta Crne Gore obrazuje inženjere u oblastima elektrotehnike, računarstva, energetike, elektronike, telekomunikacija i automatike. Studenti kroz teorijsku nastavu, laboratorijske vježbe i praktične projekte razvijaju znanja potrebna za rad u savremenim tehnološkim sistemima. Fakultet je posebno značajan za razvoj ICT sektora, elektroenergetike, softverskog inženjerstva i digitalne transformacije.	https://www.ucg.ac.me/etf	/images/faculties/etf.jpg	2026-05-11 17:37:07.54655	2026-05-11 17:37:07.54655	Studije elektrotehnike, računarstva, energetike i automatike.
7	Fakultet političkih nauka	Univerzitet Crne Gore	Podgorica	13. jula br. 2	drzavni	Fakultet političkih nauka Univerziteta Crne Gore obrazuje studente u oblastima politikologije, međunarodnih odnosa, novinarstva, medijskih studija, socijalne politike i socijalnog rada. Studenti stiču znanja o političkim sistemima, javnim politikama, društvenim procesima, komunikaciji i savremenim medijima. Fakultet priprema buduće stručnjake za rad u institucijama, medijima, nevladinom sektoru, međunarodnim organizacijama i oblastima društvenog razvoja.	https://www.ucg.ac.me/fpn	/images/faculties/fpn.jpg	2026-05-11 17:37:07.54655	2026-05-11 17:37:07.54655	Studije politikologije, međunarodnih odnosa, novinarstva i socijalnog rada.
11	Filološki fakultet	Univerzitet Crne Gore	Nikšić	Danila Bojovića bb	drzavni	Filološki fakultet Univerziteta Crne Gore obrazuje studente u oblastima jezika, književnosti, lingvistike, kulture i prevodilaštva. Studenti kroz nastavu razvijaju znanje domaćih i stranih jezika, razumijevanje književnih tradicija, analitičko čitanje i komunikacijske vještine. Fakultet priprema kadrove za rad u obrazovanju, prevođenju, izdavaštvu, kulturi, medijima i drugim oblastima u kojima su jezička i kulturološka znanja važna.	https://www.ucg.ac.me/flf	/images/faculties/filoloski.jpg	2026-05-11 17:37:07.54655	2026-05-11 17:37:07.54655	Studije jezika, književnosti, prevodilaštva i filologije.
14	Mašinski fakultet	Univerzitet Crne Gore	Podgorica	Džordža Vašingtona bb	drzavni	Mašinski fakultet Univerziteta Crne Gore obrazuje studente u oblastima mašinstva, mehatronike, drumskog saobraćaja, energetike, standardizacije i tehničkih sistema. Nastava povezuje teorijska znanja, laboratorijski rad i praktične inženjerske zadatke. Fakultet priprema studente za rad u industriji, saobraćaju, energetici, proizvodnji, održavanju, projektovanju i drugim tehničkim oblastima koje zahtijevaju mašinsko-inženjerska znanja.	https://www.ucg.ac.me/mf	/images/faculties/masinski.jpg	2026-05-11 17:37:07.54655	2026-05-11 17:37:07.54655	Studije mašinstva, mehatronike, drumskog saobraćaja i energetske efikasnosti.
16	Metalurško-tehnološki fakultet	Univerzitet Crne Gore	Podgorica	Džordža Vašingtona bb	drzavni	Metalurško-tehnološki fakultet Univerziteta Crne Gore obrazuje studente u oblastima hemijske tehnologije, zaštite životne sredine, metalurgije, materijala i industrijskih procesa. Studenti stiču znanja o savremenim tehnologijama, obradi materijala, zaštiti prirodnih resursa i primjeni inženjerskih metoda u proizvodnji. Fakultet priprema stručnjake za rad u industriji, laboratorijama, istraživačkim centrima, ekološkim službama i sektorima koji se bave tehnološkim razvojem.	https://www.ucg.ac.me/mtf	/images/faculties/mtf.jpg	2026-05-17 21:21:38.47352	2026-05-17 21:21:38.47352	Studije hemijske tehnologije, zaštite životne sredine, metalurgije i materijala.
18	Pravni fakultet	Univerzitet Crne Gore	Podgorica	Bulevar Revolucije 19	drzavni	Pravni fakultet Univerziteta Crne Gore obrazuje studente u oblasti pravnih nauka, zakonodavstva, pravnog sistema, bezbjednosti i kriminalistike. Studenti kroz nastavu stiču znanja o ustavnom, građanskom, krivičnom, međunarodnom, poslovnom i drugim granama prava. Fakultet priprema buduće pravnike za rad u pravosuđu, advokaturi, državnim institucijama, privredi, međunarodnim organizacijama i drugim oblastima u kojima je pravno znanje neophodno.	https://www.ucg.ac.me/pf	/images/faculties/pravni.jpg	2026-05-11 17:37:07.54655	2026-05-11 17:37:07.54655	Studije pravnih nauka, bezbjednosti, kriminalistike i pravnih oblasti.
1	Arhitektonski fakultet	Univerzitet Crne Gore	Podgorica	Bulevar Džordža Vašingtona bb	drzavni	Arhitektonski fakultet Univerziteta Crne Gore obrazuje studente u oblasti arhitekture, urbanizma i prostornog planiranja. Nastava je usmjerena na razvoj kreativnog, tehničkog i analitičkog razmišljanja kroz projektovanje, istraživanje prostora i savremene metode oblikovanja. Fakultet priprema studente za profesionalni rad u arhitektonskim biroima, urbanističkom planiranju, dizajnu prostora i drugim oblastima povezanim sa izgrađenim okruženjem.	https://www.ucg.ac.me/af	/images/faculties/af.jpg	2026-05-11 17:37:07.54655	2026-05-11 17:37:07.54655	Studije arhitekture, urbanizma i prostornog planiranja.
2	Biotehnički fakultet	Univerzitet Crne Gore	Podgorica	Mihaila Lalića 1	drzavni	Biotehnički fakultet Univerziteta Crne Gore bavi se obrazovanjem i istraživanjem u oblastima poljoprivrede, prehrambene tehnologije, ruralnog razvoja i bezbjednosti hrane. Studenti kroz nastavu i praktičan rad stiču znanja iz biljne i animalne proizvodnje, zaštite bilja, voćarstva, vinogradarstva i savremenih poljoprivrednih tehnologija. Fakultet ima važnu ulogu u razvoju održive proizvodnje hrane i unapređenju agrarnog sektora u Crnoj Gori.	https://www.ucg.ac.me/btf	/images/faculties/biotehnicki.jpg	2026-05-11 17:37:07.54655	2026-05-11 17:37:07.54655	Studije poljoprivrede, prehrambene tehnologije i ruralnog razvoja.
9	Fakultet za sport i fizičko vaspitanje	Univerzitet Crne Gore	Nikšić	Narodnih heroja bb	drzavni	Fakultet za sport i fizičko vaspitanje Univerziteta Crne Gore obrazuje studente u oblastima fizičke kulture, sporta, zdravih stilova života, trenerstva i sportskog novinarstva. Studenti stiču teorijska i praktična znanja o fizičkoj aktivnosti, sportskom treningu, zdravlju, rekreaciji i organizaciji sportskih aktivnosti. Fakultet priprema kadrove za rad u školama, sportskim klubovima, rekreativnim centrima, medijima i institucijama koje se bave sportom i zdravljem.	https://www.ucg.ac.me/sport	/images/faculties/dif.jpg	2026-05-11 17:37:07.54655	2026-05-11 17:37:07.54655	Studije sporta, fizičke kulture, zdravih stilova života i trenerstva.
5	Fakultet dramskih umjetnosti	Univerzitet Crne Gore	Cetinje	Bajova 5	drzavni	Fakultet dramskih umjetnosti Univerziteta Crne Gore obrazuje studente u oblastima glume, režije, dramaturgije, produkcije, filma, medija i pozorišta. Nastava je zasnovana na kombinaciji teorijskog znanja, praktičnog rada i umjetničkog istraživanja. Fakultet omogućava studentima da razvijaju kreativnost, scenski izraz, produkcione vještine i razumijevanje savremenih umjetničkih i medijskih formi.	https://www.ucg.ac.me/fdu	/images/faculties/fdu.jpg	2026-05-11 17:37:07.54655	2026-05-11 17:37:07.54655	Studije glume, filma, medija, drame i pozorišta.
6	Fakultet likovnih umjetnosti	Univerzitet Crne Gore	Cetinje	Njegoševa bb	drzavni	Fakultet likovnih umjetnosti Univerziteta Crne Gore obrazuje studente u oblastima slikarstva, vajarstva, grafičkog dizajna, konzervacije i restauracije. Nastavni proces podstiče razvoj individualnog umjetničkog izraza, vizuelne kulture i tehničkih vještina kroz rad u ateljeima, radionice i praktične projekte. Fakultet priprema studente za umjetnički, dizajnerski, pedagoški i istraživački rad u oblasti vizuelnih umjetnosti.	https://www.ucg.ac.me/flu	/images/faculties/flu.jpg	2026-05-11 17:37:07.54655	2026-05-11 17:37:07.54655	Studije slikarstva, vajarstva, grafičkog dizajna i restauracije.
8	Fakultet za pomorstvo	Univerzitet Crne Gore	Kotor	Put I Bokeljske brigade 44	drzavni	Fakultet za pomorstvo Univerziteta Crne Gore obrazuje studente za potrebe pomorske privrede, brodarstva, logistike i pomorskih tehnologija. Nastava obuhvata oblasti nautike, pomorskog saobraćaja, brodomašinstva, pomorske elektrotehnike i menadžmenta u pomorstvu. Fakultet priprema studente za profesionalni rad u pomorskim kompanijama, lukama, logističkim sistemima i drugim oblastima povezanim sa morem i pomorskim transportom.	https://www.ucg.ac.me/fzp	/images/faculties/pomorski.jpg	2026-05-11 17:37:07.54655	2026-05-11 17:37:07.54655	Studije pomorstva, nautike, brodomašinstva i pomorske elektrotehnike.
10	Fakultet za turizam i hotelijerstvo	Univerzitet Crne Gore	Kotor	Stari grad 320	drzavni	Fakultet za turizam i hotelijerstvo Univerziteta Crne Gore obrazuje studente za rad u turizmu, hotelijerstvu, ugostiteljstvu i menadžmentu turističkih destinacija. Nastava je usmjerena na razumijevanje turističkog tržišta, organizaciju hotelskog poslovanja, razvoj turističkih proizvoda i upravljanje uslugama. Fakultet priprema studente za profesionalni rad u hotelima, turističkim organizacijama, agencijama, ugostiteljskim preduzećima i drugim oblastima turizma.	https://www.ucg.ac.me/fth	/images/faculties/hotel.jpg	2026-05-11 17:37:07.54655	2026-05-11 17:37:07.54655	Studije turizma, hotelijerstva i menadžmenta u ugostiteljstvu.
12	Filozofski fakultet	Univerzitet Crne Gore	Nikšić	Danila Bojovića bb	drzavni	Filozofski fakultet Univerziteta Crne Gore obrazuje studente u oblastima filozofije, pedagogije, psihologije, sociologije, istorije, geografije i obrazovanja. Nastava je usmjerena na proučavanje društva, čovjeka, vaspitanja, kulture, prostora i istorijskih procesa. Fakultet priprema studente za rad u obrazovnim ustanovama, istraživačkim institucijama, javnom sektoru, centrima za podršku i drugim oblastima društvenih i humanističkih nauka.	https://www.ucg.ac.me/ff	/images/faculties/filozofski.jpg	2026-05-11 17:37:07.54655	2026-05-11 17:37:07.54655	Studije filozofije, pedagogije, psihologije, istorije, geografije i sociologije.
13	Građevinski fakultet	Univerzitet Crne Gore	Podgorica	Džordža Vašingtona bb	drzavni	Građevinski fakultet Univerziteta Crne Gore obrazuje studente u oblastima građevinarstva, konstrukcija, infrastrukture i menadžmenta u građevinarstvu. Studenti stiču znanja iz projektovanja, izgradnje, održavanja i upravljanja građevinskim objektima i infrastrukturnim sistemima. Fakultet priprema buduće inženjere za rad u projektantskim biroima, građevinskim kompanijama, javnim službama i institucijama koje se bave razvojem prostora i infrastrukture.	https://www.ucg.ac.me/gf	/images/faculties/gradjevina.jpg	2026-05-11 17:37:07.54655	2026-05-11 17:37:07.54655	Studije građevinarstva, infrastrukture, konstrukcija i menadžmenta u građevinarstvu.
15	Medicinski fakultet	Univerzitet Crne Gore	Podgorica	Ljubljanska bb	drzavni	Medicinski fakultet Univerziteta Crne Gore obrazuje studente u oblastima medicine, stomatologije, farmacije, fizioterapije, zdravstvene njege i drugih zdravstvenih disciplina. Nastava obuhvata teorijsko znanje, praktične vježbe, laboratorijski rad i kliničku praksu, kako bi studenti stekli stručne kompetencije potrebne za rad u zdravstvenom sistemu. Fakultet ima važnu ulogu u obrazovanju budućih ljekara, farmaceuta, stomatologa, fizioterapeuta i zdravstvenih radnika u Crnoj Gori.	https://www.ucg.ac.me/med	/images/faculties/medicinski.jpg	2026-05-11 17:37:07.54655	2026-05-11 17:37:07.54655	Studije medicine, stomatologije, farmacije, fizioterapije i zdravstvene njege.
17	Muzička akademija	Univerzitet Crne Gore	Cetinje	Njegoševa bb	drzavni	Muzička akademija Univerziteta Crne Gore obrazuje studente u oblastima izvođačkih umjetnosti, muzičke pedagogije, kompozicije, dirigovanja i instrumentalnog izvođenja. Nastava je usmjerena na razvoj muzičkog talenta, tehničkih vještina, umjetničkog izraza i razumijevanja muzičke teorije i prakse. Akademija priprema studente za umjetnički, pedagoški i kulturni rad u muzičkim institucijama, školama, orkestrima, ansamblima i drugim oblastima muzičke umjetnosti.	https://www.ucg.ac.me/ma	/images/faculties/muzicka.jpg	2026-05-11 17:37:07.54655	2026-05-11 17:37:07.54655	Studije muzike, izvođačkih umjetnosti, kompozicije i muzičke pedagogije.
19	Prirodno-matematički fakultet	Univerzitet Crne Gore	Podgorica	Džordža Vašingtona bb	drzavni	Prirodno-matematički fakultet Univerziteta Crne Gore obrazuje studente u oblastima matematike, računarstva, fizike, biologije i hemije. Nastava je usmjerena na razvoj analitičkog, logičkog i istraživačkog mišljenja, uz kombinaciju teorijskog znanja, laboratorijskog rada i praktične primjene. Fakultet priprema studente za rad u obrazovanju, nauci, IT sektoru, laboratorijama, istraživačkim institucijama i drugim oblastima prirodnih i računarskih nauka.	https://www.ucg.ac.me/pmf	/images/faculties/pmf.jpg	2026-05-11 17:37:07.54655	2026-05-11 17:37:07.54655	Studije matematike, računarstva, fizike, biologije i hemije.
\.


--
-- Data for Name: faculty_files; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faculty_files (id, faculty_id, file_name, file_path, file_type, uploaded_at) FROM stdin;
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, user_id, faculty_id, rating, comment, created_at) FROM stdin;
2	1	3	3	Zadovoljna	2026-05-21 13:54:44.399504
3	4	1	4		2026-05-21 14:48:23.604728
4	4	4	4	odlican!	2026-05-22 11:43:10.234781
6	1	19	4		2026-05-22 13:53:09.635161
\.


--
-- Data for Name: saved_faculties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.saved_faculties (id, user_id, faculty_id, saved_at) FROM stdin;
1	1	3	2026-05-19 17:00:55.929269
3	1	8	2026-05-20 14:04:37.943856
4	4	3	2026-05-20 14:08:12.41371
5	4	4	2026-05-22 11:43:15.767613
6	1	19	2026-05-22 13:52:47.710637
\.


--
-- Data for Name: study_programs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.study_programs (id, faculty_id, name, field_area, degree_level, duration_years, tuition_fee, has_entrance_exam, description, created_at, updated_at, city) FROM stdin;
145	1	Arhitektura	OSNOVNE INTEGRISANE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
146	2	Biljna proizvodnja	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
147	2	Animalna proizvodnja	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
150	2	Voćarstvo, vinogradarstvo i vinarstvo	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
151	2	Ratarstvo i povrtarstvo	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
152	2	Zaštita bilja	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
153	2	Tehnologije u animalnoj proizvodnji	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
154	2	Agrobiznis i ruralni razvoj	MASTER INTERDISCIPLINARNE AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
155	2	Bezbjednost hrane	MASTER INTERDISCIPLINARNE AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
158	3	Ekonomija	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
159	3	Business and Economics	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
160	3	Menadžment	OSNOVNE PRIMIJENJENE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
162	3	Ekonomija	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
163	3	Poslovna ekonomija	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
164	3	Menadžment	MASTER PRIMIJENJENE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
165	4	Energetika i automatika	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
166	4	Elektronika, telekomunikacije i računari	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
167	4	Primijenjeno računarstvo	OSNOVNE PRIMIJENJENE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
168	4	Elektronika	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
169	4	Telekomunikacije	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
170	4	Računari	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
171	4	Automatika i industrijska elektrotehnika	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
172	4	Elektroenergetski sistemi	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
173	4	Primijenjeno računarstvo	MASTER PRIMIJENJENE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
174	5	GLUMA	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
175	5	FILM I MEDIJI	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
176	5	DRAMA I POZORIŠTE	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
177	5	GLUMA	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
178	5	PRODUKCIJA	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
179	5	DRAMATURGIJA	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
180	5	REŽIJA	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
181	6	KONZERVACIJA I RESTAURACIJA	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
182	6	SLIKARSTVO	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
183	6	VAJARSTVO	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
184	6	GRAFIČKI DIZAJN	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
185	7	MEDIJSKE STUDIJE I NOVINARSTVO	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
186	7	SOCIJALNA POLITIKA I SOCIJALNI RAD	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
187	7	POLITIKOLOGIJA - MEĐUNARODNI ODNOSI	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
188	8	Nautika i pomorski saobraćaj	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
149	2	Kontinentalno voćarstvo i ljekovito bilje, Bijelo Polje	OSNOVNE PRIMIJENJENE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	Bijelo Polje
157	2	Kontinentalno voćarstvo i ljekovito bilje, Bijelo Polje	PRIMIJENJENE MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	Bijelo Polje
189	8	Brodomašinstvo	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
190	8	Pomorska elektrotehnika	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
191	8	Menadžment u pomorstvu i logistika	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
192	8	Nautika i pomorski saobraćaj	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
193	8	Brodomašinstvo	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
194	8	Pomorska elektrotehnika	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
195	8	Menadžment u pomorstvu i logistika	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
196	9	FIZIČKA KULTURA I ZDRAVI STILOVI ŽIVOTA	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
197	9	SPORTSKI NOVINARI I TRENERI	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
198	9	FIZIČKA KULTURA I ZDRAVI STILOVI ŽIVOTA	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
199	9	SPORT FITNESS I TURIZAM	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
200	10	TURIZAM I HOTELIJERSTVO	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
201	10	TURIZAM	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
202	10	MEĐUNARODNO HOTELIJERSTVO	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
203	11	CRNOGORSKI JEZIK I JUŽNOSLOVENSKE KNJIŽEVNOSTI	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
204	11	SRPSKI JEZIK I JUŽNOSLOVENSKE KNJIŽEVNOSTI	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
205	11	RUSKI JEZIK I KNJIŽEVNOST	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
206	11	ENGLESKI JEZIK I KNJIŽEVNOST	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
207	11	ITALIJANSKI JEZIK I KNJIŽEVNOST	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
208	11	FRANCUSKI JEZIK I KNJIŽEVNOST	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
209	11	NJEMAČKI JEZIK I KNJIŽEVNOST	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
210	11	Prevodilaštvo - Modul: Engleski i ruski jezik	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
211	11	Prevodilaštvo - Modul: Engleski i francuski jezik	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
212	11	ENGLESKI JEZIK I KNJIŽEVNOST - Berane	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
213	11	SRPSKI JEZIK I JUŽNOSLOVENSKE KNJIŽEVNOSTI	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
214	11	CRNOGORSKI JEZIK I JUŽNOSLOVENSKE KNJIŽEVNOSTI	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
215	11	RUSKI JEZIK I KNJIŽEVNOST	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
216	11	ENGLESKI JEZIK I KNJIŽEVNOST	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
217	11	ITALIJANSKI JEZIK I KNJIŽEVNOST	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
218	11	FRANCUSKI JEZIK I KNJIŽEVNOST	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
219	11	NJEMAČKI JEZIK I KNJIŽEVNOST	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
220	11	PREVODILAŠTVO - ENGLESKI JEZIK	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
221	12	FILOZOFIJA	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
222	12	OBRAZOVANJE UČITELJA	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
223	12	PREDŠKOLSKO OBRAZOVANJE I VASPITANJE	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
224	12	SOCIOLOGIJA	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
225	12	PSIHOLOGIJA	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
226	12	PEDAGOGIJA	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
227	12	ISTORIJA	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
228	12	GEOGRAFIJA	OSNOVNE AKADEMSKE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
229	12	FILOZOFIJA	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
230	12	PREDŠKOLSKO VASPITANJE I OBRAZOVANJE	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
231	12	SOCIOLOGIJA	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
232	12	PSIHOLOGIJA	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
233	12	PEDAGOGIJA	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
234	12	ISTORIJA	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
235	12	GEOGRAFIJA	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
236	12	INKLUZIVNO OBRAZOVANJE	MASTER AKADEMSKE STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
237	13	GRAĐEVINARSTVO	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
238	13	MENADŽMENT U GRAĐEVINARSTVU	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
239	13	KONSTRUKCIJE	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
240	13	INFRASTRUKTURE	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
241	13	MENADŽMENT U GRAĐEVINARSTVU	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
242	14	MEHATRONIKA	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
243	14	MAŠINSTVO	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
244	14	DRUMSKI SAOBRAĆAJ	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
245	14	MAŠINSTVO	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
246	14	ENERGETSKA EFIKASNOST	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
247	14	KVALITET I STANDARDIZACIJA	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
248	14	DRUMSKI SAOBRAĆAJ	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
249	14	MEHATRONIKA	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
250	15	STOMATOLOGIJA	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
251	15	FARMACIJA	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
252	15	MEDICINA	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
253	15	VISOKA MEDICINSKA ŠKOLA	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
254	15	PRIMIJENJENA FIZIOTERAPIJA	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
255	15	ZDRAVSTVENA NJEGA	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
256	15	FIZIOTERAPIJA	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
257	16	HEMIJSKA TEHNOLOGIJA	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
258	16	ZAŠTITA ŽIVOTNE SREDINE	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
259	16	METALURGIJA I MATERIJALI	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
260	16	HEMIJSKA TEHNOLOGIJA	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
261	16	ZAŠTITA ŽIVOTNE SREDINE	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
262	16	METALURGIJA I MATERIJALI	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
263	17	OPŠTA MUZIČKA PEDAGOGIJA	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
264	17	IZVOĐAČKE UMJETNOSTI	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
265	17	KOMPOZICIJA	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
266	17	KLAVIR	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
267	17	GUDAČKI INSTRUMENTI	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
268	17	DUVAČKI INSTRUMENTI	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
269	17	GITARA	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
270	17	HARMONIKA	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
271	17	DIRIGOVANJE	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
272	17	Pedagoško-instrumentalni	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
273	17	OPŠTA MUZIČKA PEDAGOGIJA	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
274	17	IZVOĐAČKE UMJETNOSTI	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
275	18	PRAVNE NAUKE	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
277	18	BEZBJEDNOST I KRIMINALISTIKA	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
278	18	KRIVIČNO PRAVO	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
279	18	MEĐUNARODNO PRAVO	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
280	18	GRAĐANSKO PRAVO	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
281	18	POSLOVNO PRAVO	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
282	19	HEMIJA	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
283	19	MATEMATIKA	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
284	19	MATEMATIKA I RAČUNARSKE NAUKE	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
285	19	RAČUNARSKE NAUKE	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
286	19	FIZIKA	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
287	19	BIOLOGIJA	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
288	19	RAČUNARSTVO I INFORMACIONE TEHNOLOGIJE	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	\N
289	19	MATEMATIKA	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-19 14:20:13.182925	2026-05-19 14:20:13.182925	\N
290	19	MATEMATIKA I RAČUNARSKE NAUKE	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-19 14:20:13.182925	2026-05-19 14:20:13.182925	\N
291	19	RAČUNARSKE NAUKE	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-19 14:20:13.182925	2026-05-19 14:20:13.182925	\N
292	19	FIZIKA	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-19 14:20:13.182925	2026-05-19 14:20:13.182925	\N
293	19	BIOLOGIJA	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-19 14:20:13.182925	2026-05-19 14:20:13.182925	\N
294	19	RAČUNARSTVO I INFORMACIONE TEHNOLOGIJE	MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-19 14:20:13.182925	2026-05-19 14:20:13.182925	\N
148	2	Mediteransko voćarstvo, Bar	OSNOVNE PRIMIJENJENE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	Bar
156	2	Rasadničarstvo, Bar	PRIMIJENJENE MASTER STUDIJE	master	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	Bar
161	3	Menadžment, Bijelo Polje	OSNOVNE PRIMIJENJENE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore za akademsku 2025/2026. godinu.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	Bijelo Polje
276	18	PRAVNE NAUKE - Bijelo Polje	OSNOVNE STUDIJE	osnovne	\N	\N	\N	Studijski program Univerziteta Crne Gore.	2026-05-17 21:25:11.640449	2026-05-17 21:25:11.640449	Bijelo Polje
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, full_name, email, password_hash, role, created_at) FROM stdin;
2	Ivana Kovacevic	ivana@testgmial.com	$2b$10$A5uoJyUiyomk0ylxJytxGetvirpF3TA.5OMfwqH6wm0Nb2vuk4dT2	user	2026-05-12 13:53:20.167553
3	Ivana Kovacevic	ivanatest@gmail.com	$2b$10$eU9r/g9TEzwu9hFPezsrgu61Vwtihy7WEddAK8UKuJbUtp7Ye3Qwm	user	2026-05-12 13:57:42.207316
1	Test User	testuser@gmail.com	$2b$10$uXnyLzVP6706APd/DA0Fw.Re7TQWZ.AM8Yt3u6WVPg/0HXS2l0vd6	admin	2026-05-12 13:36:58.685484
4	Andjela Ivanovic	ivana.kov12@gmail.com	$2b$10$sD5QhHPVGiajCZIkNmW2a.qjoloufn4dVeXiex6silT8qH79q0fC2	user	2026-05-19 17:26:05.352045
\.


--
-- Name: admission_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admission_details_id_seq', 1, false);


--
-- Name: application_deadlines_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.application_deadlines_id_seq', 1, false);


--
-- Name: faculties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faculties_id_seq', 19, true);


--
-- Name: faculty_files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faculty_files_id_seq', 1, false);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 6, true);


--
-- Name: saved_faculties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.saved_faculties_id_seq', 6, true);


--
-- Name: study_programs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.study_programs_id_seq', 294, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: admission_details admission_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admission_details
    ADD CONSTRAINT admission_details_pkey PRIMARY KEY (id);


--
-- Name: admission_details admission_details_study_program_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admission_details
    ADD CONSTRAINT admission_details_study_program_id_key UNIQUE (study_program_id);


--
-- Name: application_deadlines application_deadlines_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application_deadlines
    ADD CONSTRAINT application_deadlines_pkey PRIMARY KEY (id);


--
-- Name: faculties faculties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faculties
    ADD CONSTRAINT faculties_pkey PRIMARY KEY (id);


--
-- Name: faculty_files faculty_files_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faculty_files
    ADD CONSTRAINT faculty_files_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: saved_faculties saved_faculties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_faculties
    ADD CONSTRAINT saved_faculties_pkey PRIMARY KEY (id);


--
-- Name: study_programs study_programs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_programs
    ADD CONSTRAINT study_programs_pkey PRIMARY KEY (id);


--
-- Name: saved_faculties unique_user_faculty; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_faculties
    ADD CONSTRAINT unique_user_faculty UNIQUE (user_id, faculty_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_deadlines_program_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_deadlines_program_id ON public.application_deadlines USING btree (study_program_id);


--
-- Name: idx_faculty_city; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_faculty_city ON public.faculties USING btree (city);


--
-- Name: idx_faculty_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_faculty_name ON public.faculties USING btree (name);


--
-- Name: idx_program_faculty_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_program_faculty_id ON public.study_programs USING btree (faculty_id);


--
-- Name: idx_program_field_area; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_program_field_area ON public.study_programs USING btree (field_area);


--
-- Name: idx_reviews_faculty_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_reviews_faculty_id ON public.reviews USING btree (faculty_id);


--
-- Name: idx_reviews_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_reviews_user_id ON public.reviews USING btree (user_id);


--
-- Name: admission_details fk_admission_program; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admission_details
    ADD CONSTRAINT fk_admission_program FOREIGN KEY (study_program_id) REFERENCES public.study_programs(id) ON DELETE CASCADE;


--
-- Name: application_deadlines fk_deadlines_program; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application_deadlines
    ADD CONSTRAINT fk_deadlines_program FOREIGN KEY (study_program_id) REFERENCES public.study_programs(id) ON DELETE CASCADE;


--
-- Name: faculty_files fk_files_faculty; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faculty_files
    ADD CONSTRAINT fk_files_faculty FOREIGN KEY (faculty_id) REFERENCES public.faculties(id) ON DELETE CASCADE;


--
-- Name: reviews fk_reviews_faculty; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_reviews_faculty FOREIGN KEY (faculty_id) REFERENCES public.faculties(id) ON DELETE CASCADE;


--
-- Name: reviews fk_reviews_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: saved_faculties fk_saved_faculty; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_faculties
    ADD CONSTRAINT fk_saved_faculty FOREIGN KEY (faculty_id) REFERENCES public.faculties(id) ON DELETE CASCADE;


--
-- Name: saved_faculties fk_saved_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_faculties
    ADD CONSTRAINT fk_saved_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: study_programs fk_study_programs_faculty; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_programs
    ADD CONSTRAINT fk_study_programs_faculty FOREIGN KEY (faculty_id) REFERENCES public.faculties(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict WdvId6EEWWtOmTMhkdoSG4agx9Dv4mCfakjcijfWHnTADkK4N8UWGpuUYC5tPwf

