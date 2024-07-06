SELECT s.name AS student_name,
       c.name AS class_name,
       t.name AS teacher_name
FROM students AS s
         JOIN
     classes c ON s.class_id = c.id
         JOIN
     teachers t ON c.teacher_id = t.id;
