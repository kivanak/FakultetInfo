-- FakultetInfo baza podataka

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, --datum kreiranja
    CHECK (role IN ('user', 'admin'))
);


CREATE TABLE faculties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    university_name VARCHAR(150) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address VARCHAR(200),
    type VARCHAR(20) NOT NULL,
    description TEXT,
    website_url TEXT,
    cover_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (type IN ('drzavni', 'privatni'))
);


CREATE TABLE study_programs (
    id SERIAL PRIMARY KEY,
    faculty_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    field_area VARCHAR(100) NOT NULL,
    degree_level VARCHAR(30) NOT NULL,
    duration_years INT NOT NULL,
    tuition_fee DECIMAL(10,2),
    has_entrance_exam BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_study_programs_faculty
        FOREIGN KEY (faculty_id)
        REFERENCES faculties(id)
        ON DELETE CASCADE,
    CHECK (degree_level IN ('osnovne', 'master', 'doktorske')),
    CHECK (duration_years > 0),
    CHECK (tuition_fee IS NULL OR tuition_fee >= 0)
);


CREATE TABLE admission_details (
    id SERIAL PRIMARY KEY,
    study_program_id INT NOT NULL UNIQUE,
    quota INT,
    required_documents TEXT,
    admission_conditions TEXT,
    entrance_exam_details TEXT,
    additional_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_admission_program
        FOREIGN KEY (study_program_id)
        REFERENCES study_programs(id)
        ON DELETE CASCADE
);


CREATE TABLE application_deadlines (
    id SERIAL PRIMARY KEY,
    study_program_id INT NOT NULL,
    deadline_type VARCHAR(50) NOT NULL,
    deadline_date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_deadlines_program
        FOREIGN KEY (study_program_id)
        REFERENCES study_programs(id)
        ON DELETE CASCADE,
    CHECK (deadline_type IN ('prijava', 'prijemni', 'upis'))
);

CREATE TABLE faculty_files (
    id SERIAL PRIMARY KEY,
    faculty_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_type VARCHAR(20) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_files_faculty
        FOREIGN KEY (faculty_id)
        REFERENCES faculties(id)
        ON DELETE CASCADE,
    CHECK (file_type IN ('image', 'pdf'))
);


CREATE TABLE saved_faculties (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    faculty_id INT NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_saved_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_saved_faculty
        FOREIGN KEY (faculty_id)
        REFERENCES faculties(id)
        ON DELETE CASCADE,
    CONSTRAINT unique_user_faculty UNIQUE (user_id, faculty_id)
);

--za ubrzavanje pretrage
CREATE INDEX idx_faculty_name ON faculties(name);
CREATE INDEX idx_faculty_city ON faculties(city);
CREATE INDEX idx_program_field_area ON study_programs(field_area);
CREATE INDEX idx_program_faculty_id ON study_programs(faculty_id);
CREATE INDEX idx_deadlines_program_id ON application_deadlines(study_program_id);