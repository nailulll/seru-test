SELECT t.name AS teacher_name,
       GROUP_CONCAT(c.name SEPARATOR ', ') AS class_names
FROM classes c
         JOIN
     teachers t ON c.teacher_id = t.id
GROUP BY t.name;

