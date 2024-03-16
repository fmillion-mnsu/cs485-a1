-- MySQL Script to create the CS Projects Database, Table and User

CREATE USER cs IDENTIFIED BY 'ComputerScience!';
CREATE DATABASE cs24s;
GRANT ALL PRIVILEGES ON cs24s.* TO cs;

USE cs24s;

CREATE TABLE project (
    id INT NOT NULL AUTO_INCREMENT,
    project_name VARCHAR(255),
    code_review_completed BOOLEAN,
    is_nda BOOLEAN,
    PRIMARY KEY (id)
);
ALTER TABLE project AUTO_INCREMENT = 1;

INSERT INTO project (project_name, code_review_completed, is_nda) VALUES("Mayo Scheduling", 1, 1);
INSERT INTO project (project_name, code_review_completed, is_nda) VALUES("Mayo Prediction", 0, 1);
INSERT INTO project (project_name, code_review_completed, is_nda) VALUES("Mayo Placer", 0, 1);
INSERT INTO project (project_name, code_review_completed, is_nda) VALUES("Mayo Wayfinder", 1, 1);
INSERT INTO project (project_name, code_review_completed, is_nda) VALUES("NextGen Embedded", 0, 1);
INSERT INTO project (project_name, code_review_completed, is_nda) VALUES("NextGen Database", 1, 1);
INSERT INTO project (project_name, code_review_completed, is_nda) VALUES("NextGen GUI", 1, 0);
INSERT INTO project (project_name, code_review_completed, is_nda) VALUES("Impekable", 0, 1);
INSERT INTO project (project_name, code_review_completed, is_nda) VALUES("Intuilize", 0, 1);
INSERT INTO project (project_name, code_review_completed, is_nda) VALUES("Hockey", 1, 0);
INSERT INTO project (project_name, code_review_completed, is_nda) VALUES("BBB Data Gets Better", 0, 0);
INSERT INTO project (project_name, code_review_completed, is_nda) VALUES("Team Falcon (SENAL)", 0, 0);
INSERT INTO project (project_name, code_review_completed, is_nda) VALUES("Team Guario (NVDA)", 0, 0);
INSERT INTO project (project_name, code_review_completed, is_nda) VALUES("Seliya-Sentiment Analysis", 1, 0);
INSERT INTO project (project_name, code_review_completed, is_nda) VALUES("Student Government (Wayfinder)", 0, 0);
INSERT INTO project (project_name, code_review_completed, is_nda) VALUES("UWM", 1, 0);
INSERT INTO project (project_name, code_review_completed, is_nda) VALUES("Team Lin (MSU Predictor)", 0, 0);
