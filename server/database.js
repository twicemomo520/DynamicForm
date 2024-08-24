
const express = require('express');
const fs = require('fs');
const mysql = require('mysql2')
const app = express();
const port = 3000;
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'jason2345',
    database: "database_json",
    connectionLimit: 10
});

const jsonData = JSON.parse(fs.readFileSync('../src/assets/database.json', 'utf8'));

jsonData.pages.forEach(page => {
    const form = page.firstPage;

    // 插入 forms 表
    pool.query('INSERT INTO forms (id, formName, formDescribe, startDate, endDate) VALUES (?, ?, ?, ?, ?)',
        [form.id, form.formName, form.formDescribe, form.startDate, form.endDate],
        (err) => {
            if (err) {
                console.error('Error inserting form:', err);
                return;
            }

            // 插入 form_questions 表
            form.tableData.forEach(question => {
                pool.query('INSERT INTO form_questions (id, formId, formQuestion, formSingleOrMulti, formMustCheckbox, formOptionTemp) VALUES (?, ?, ?, ?, ?, ?)',
                    [question.id, form.id, question.formQuestion, question.formSingleOrMulti, question.formMustCheckbox, question.formOptionTemp],
                    (err) => {
                        if (err) {
                            console.error('Error inserting question:', err);
                            return;
                        }

                        // 插入 form_options 表
                        question.formOption.forEach(option => {
                            pool.query('INSERT INTO form_options (questionId, optionValue) VALUES (?, ?)',
                                [question.id, option],
                                (err) => {
                                    if (err) {
                                        console.error('Error inserting option:', err);
                                    }
                                }
                            );
                        });
                    }
                );
            });
        }
    );
});