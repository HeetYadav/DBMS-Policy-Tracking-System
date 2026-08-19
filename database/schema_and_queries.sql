-- 1. TABLE CREATION (DDL)
CREATE TABLE Departments (
    DEPT_ID INT PRIMARY KEY,
    DEPT_NAME VARCHAR2(100),
    DEPT_HEAD VARCHAR2(100),
    CREATED_AT DATE
);

CREATE TABLE Users (
    USER_ID INT PRIMARY KEY,
    USERNAME VARCHAR2(50),
    EMAIL VARCHAR2(100),
    ROLE VARCHAR2(50),
    DEPT_ID INT,
    CREATED_AT DATE,
    FOREIGN KEY (DEPT_ID) REFERENCES Departments(DEPT_ID)
);

CREATE TABLE Categories (
    Category_ID INT PRIMARY KEY,
    Category_Name VARCHAR2(100),
    Description VARCHAR2(255)
);

CREATE TABLE Policies (
    Policy_ID INT PRIMARY KEY,
    Policy_Name VARCHAR2(150),
    Category_ID INT,
    DEPT_ID INT,
    Status VARCHAR2(20),
    Created_By INT,
    Effective_Date DATE,
    FOREIGN KEY (Category_ID) REFERENCES Categories(Category_ID),
    FOREIGN KEY (DEPT_ID) REFERENCES Departments(DEPT_ID),
    FOREIGN KEY (Created_By) REFERENCES Users(USER_ID)
);

CREATE TABLE PolicyVersions (
    Version_ID INT PRIMARY KEY,
    Policy_ID INT,
    Version_Number VARCHAR2(10),
    Changes_Made VARCHAR2(1000), 
    Modified_By INT,
    Modified_At TIMESTAMP,
    Is_Current CHAR(1),
    FOREIGN KEY (Policy_ID) REFERENCES Policies(Policy_ID),
    FOREIGN KEY (Modified_By) REFERENCES Users(USER_ID)
);

CREATE TABLE ChangeHistory (
    Change_ID INT PRIMARY KEY,
    Policy_ID INT,
    Version_ID INT,
    Type VARCHAR2(50),
    Description VARCHAR2(1000), 
    Changed_By INT,
    Changed_At TIMESTAMP,
    FOREIGN KEY (Policy_ID) REFERENCES Policies(Policy_ID),
    FOREIGN KEY (Version_ID) REFERENCES PolicyVersions(Version_ID),
    FOREIGN KEY (Changed_By) REFERENCES Users(USER_ID)
);

CREATE TABLE Approvals (
    Approval_ID INT PRIMARY KEY,
    Policy_ID INT,
    Version_ID INT,
    Approver_ID INT,
    Status VARCHAR2(20),
    Comments VARCHAR2(1000), 
    Approval_Date DATE,
    FOREIGN KEY (Policy_ID) REFERENCES Policies(Policy_ID),
    FOREIGN KEY (Version_ID) REFERENCES PolicyVersions(Version_ID),
    FOREIGN KEY (Approver_ID) REFERENCES Users(USER_ID)
);

-- 2. DATA INSERTION (DML)
INSERT INTO Departments VALUES (1, 'Human Resources', 'Heet Yadav', TO_DATE('15-JAN-23', 'DD-MON-YY'));
INSERT INTO Departments VALUES (2, 'Finance', 'Harshil Kanani', TO_DATE('10-FEB-23', 'DD-MON-YY'));
INSERT INTO Departments VALUES (3, 'Legal', 'Kevin Hingu', TO_DATE('05-MAR-23', 'DD-MON-YY'));
INSERT INTO Departments VALUES (4, 'Information Technology', 'Om Jani', TO_DATE('20-APR-23', 'DD-MON-YY'));
INSERT INTO Departments VALUES (5, 'Operations', 'Gauri Mathur', TO_DATE('12-MAY-23', 'DD-MON-YY'));

INSERT INTO Users VALUES (101, 'heety', 'heety@company.com', 'Admin', 1, TO_DATE('01-JUN-23', 'DD-MON-YY'));
INSERT INTO Users VALUES (102, 'harshilk', 'harshilk@company.com', 'Policy Manager', 2, TO_DATE('15-JUN-23', 'DD-MON-YY'));
INSERT INTO Users VALUES (103, 'kevinh', 'kevinh@company.com', 'Auditor', 3, TO_DATE('10-JUL-23', 'DD-MON-YY'));
INSERT INTO Users VALUES (104, 'gaurim', 'gaurim@company.com', 'Viewer', 5, TO_DATE('22-JUL-23', 'DD-MON-YY'));
INSERT INTO Users VALUES (105, 'omj', 'omj@company.com', 'Policy Manager', 4, TO_DATE('05-AUG-23', 'DD-MON-YY'));
INSERT INTO Users VALUES (106, 'hetp', 'hetp@company.com', 'Viewer', 1, TO_DATE('18-AUG-23', 'DD-MON-YY'));
INSERT INTO Users VALUES (107, 'garvitj', 'garvitj@company.com', 'Auditor', 3, TO_DATE('30-SEP-23', 'DD-MON-YY'));

INSERT INTO Categories VALUES (10, 'Security', 'Data protection and cyber safety rules');
INSERT INTO Categories VALUES (20, 'Finance', 'Budgeting and expense reporting');
INSERT INTO Categories VALUES (30, 'Compliance', 'Regulatory and legal adherence');
INSERT INTO Categories VALUES (40, 'Operations', 'Daily workflow and logistics');
INSERT INTO Categories VALUES (50, 'HR', 'Employee conduct and benefits');

INSERT INTO Policies VALUES (501, 'Data Privacy Policy', 10, 4, 'Active', 105, TO_DATE('01-JAN-24', 'DD-MON-YY'));
INSERT INTO Policies VALUES (502, 'Travel Reimbursement', 20, 2, 'Active', 102, TO_DATE('15-FEB-24', 'DD-MON-YY'));
INSERT INTO Policies VALUES (503, 'Code of Conduct', 50, 1, 'Active', 101, TO_DATE('10-MAR-24', 'DD-MON-YY'));
INSERT INTO Policies VALUES (504, 'Remote Work Policy', 50, 1, 'Draft', 101, TO_DATE('01-OCT-24', 'DD-MON-YY'));
INSERT INTO Policies VALUES (505, 'Network Access Rule', 10, 4, 'Active', 105, TO_DATE('20-MAY-24', 'DD-MON-YY'));
INSERT INTO Policies VALUES (506, 'Anti-Money Laundering', 30, 3, 'Archived', 103, TO_DATE('01-JAN-22', 'DD-MON-YY'));
INSERT INTO Policies VALUES (507, 'Safety Protocols', 40, 5, 'Active', 104, TO_DATE('15-JUN-24', 'DD-MON-YY'));
INSERT INTO Policies VALUES (508, 'Vendor Management', 30, 3, 'Draft', 107, TO_DATE('01-NOV-24', 'DD-MON-YY'));

INSERT INTO PolicyVersions VALUES (1001, 501, '1.0', 'Initial Release', 105, TO_TIMESTAMP('2023-12-01 09:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'N');
INSERT INTO PolicyVersions VALUES (1002, 501, '1.1', 'Updated Encryption', 105, TO_TIMESTAMP('2024-01-01 10:30:00', 'YYYY-MM-DD HH24:MI:SS'), 'Y');
INSERT INTO PolicyVersions VALUES (1003, 502, '1.0', 'Initial policy', 102, TO_TIMESTAMP('2024-02-10 14:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'Y');
INSERT INTO PolicyVersions VALUES (1004, 503, '1.0', 'Initial policy', 101, TO_TIMESTAMP('2024-03-01 08:45:00', 'YYYY-MM-DD HH24:MI:SS'), 'N');
INSERT INTO PolicyVersions VALUES (1005, 503, '2.0', 'Social media section added', 101, TO_TIMESTAMP('2024-03-10 11:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'Y');
INSERT INTO PolicyVersions VALUES (1006, 504, '1.0', 'Drafting phase', 101, TO_TIMESTAMP('2024-09-25 16:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'Y');
INSERT INTO PolicyVersions VALUES (1007, 505, '1.0', 'Initial Rule set', 105, TO_TIMESTAMP('2024-05-15 09:20:00', 'YYYY-MM-DD HH24:MI:SS'), 'Y');
INSERT INTO PolicyVersions VALUES (1008, 506, '1.0', 'Legacy rules', 103, TO_TIMESTAMP('2021-12-15 10:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'Y');
INSERT INTO PolicyVersions VALUES (1009, 507, '1.0', 'Workplace safety basics', 104, TO_TIMESTAMP('2024-06-01 13:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'Y');
INSERT INTO PolicyVersions VALUES (1010, 508, '1.0', 'Vendor criteria', 107, TO_TIMESTAMP('2024-10-20 15:30:00', 'YYYY-MM-DD HH24:MI:SS'), 'Y');
INSERT INTO PolicyVersions VALUES (1011, 501, '1.2', 'GDPR compliance clause', 105, TO_TIMESTAMP('2024-02-01 10:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'N');
INSERT INTO PolicyVersions VALUES (1012, 503, '2.1', 'Clarified dress code', 101, TO_TIMESTAMP('2024-03-20 12:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'N');

INSERT INTO ChangeHistory VALUES (201, 501, 1002, 'Update', 'Encryption upgrade', 105, TO_TIMESTAMP('2024-01-01 10:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO ChangeHistory VALUES (202, 501, 1011, 'Revision', 'GDPR alignment', 105, TO_TIMESTAMP('2024-02-01 09:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO ChangeHistory VALUES (203, 503, 1005, 'Major Update', 'Social media addition', 101, TO_TIMESTAMP('2024-03-10 10:30:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO ChangeHistory VALUES (204, 503, 1012, 'Minor Update', 'Dress code change', 101, TO_TIMESTAMP('2024-03-20 11:30:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO ChangeHistory VALUES (205, 502, 1003, 'Creation', 'New Policy Setup', 102, TO_TIMESTAMP('2024-02-10 14:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO ChangeHistory VALUES (206, 504, 1006, 'Draft', 'Internal Review', 101, TO_TIMESTAMP('2024-09-25 16:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO ChangeHistory VALUES (207, 505, 1007, 'Creation', 'Rule Established', 105, TO_TIMESTAMP('2024-05-15 09:20:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO ChangeHistory VALUES (208, 507, 1009, 'Creation', 'Safety Guidelines', 104, TO_TIMESTAMP('2024-06-01 13:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO ChangeHistory VALUES (209, 508, 1010, 'Draft', 'Procurement Check', 107, TO_TIMESTAMP('2024-10-20 15:30:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO ChangeHistory VALUES (210, 501, 1001, 'Creation', 'Base policy', 105, TO_TIMESTAMP('2023-12-01 09:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO ChangeHistory VALUES (211, 503, 1004, 'Creation', 'Base policy', 101, TO_TIMESTAMP('2024-03-01 08:45:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO ChangeHistory VALUES (212, 506, 1008, 'Legacy', 'System migration', 103, TO_TIMESTAMP('2021-12-15 10:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO ChangeHistory VALUES (213, 501, 1002, 'Security', 'Firewall rules', 105, TO_TIMESTAMP('2024-01-05 10:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO ChangeHistory VALUES (214, 502, 1003, 'Finance', 'Rate change', 102, TO_TIMESTAMP('2024-02-20 09:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO ChangeHistory VALUES (215, 503, 1005, 'Legal', 'Ethics update', 103, TO_TIMESTAMP('2024-03-15 14:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO ChangeHistory VALUES (216, 507, 1009, 'Logistics', 'Emergency update', 104, TO_TIMESTAMP('2024-06-10 11:00:00', 'YYYY-MM-DD HH24:MI:SS'));

INSERT INTO Approvals VALUES (301, 501, 1002, 103, 'Approved', 'Security standards met', TO_DATE('01-JAN-24', 'DD-MON-YY'));
INSERT INTO Approvals VALUES (302, 502, 1003, 103, 'Approved', 'Finance review clear', TO_DATE('14-FEB-24', 'DD-MON-YY'));
INSERT INTO Approvals VALUES (303, 503, 1005, 107, 'Approved', 'Guidelines verified', TO_DATE('09-MAR-24', 'DD-MON-YY'));
INSERT INTO Approvals VALUES (304, 504, 1006, 103, 'Pending', 'Legal review pending', TO_DATE('05-OCT-24', 'DD-MON-YY'));
INSERT INTO Approvals VALUES (305, 505, 1007, 103, 'Approved', 'IT check passed', TO_DATE('18-MAY-24', 'DD-MON-YY'));
INSERT INTO Approvals VALUES (306, 508, 1010, 107, 'Pending', 'Under review', TO_DATE('01-NOV-24', 'DD-MON-YY'));
INSERT INTO Approvals VALUES (307, 501, 1011, 103, 'Rejected', 'Missing clause 4', TO_DATE('05-FEB-24', 'DD-MON-YY'));
INSERT INTO Approvals VALUES (308, 503, 1012, 107, 'Approved', 'Minor change accepted', TO_DATE('21-MAR-24', 'DD-MON-YY'));
INSERT INTO Approvals VALUES (309, 501, 1001, 103, 'Approved', 'Initial approval', TO_DATE('05-DEC-23', 'DD-MON-YY'));
INSERT INTO Approvals VALUES (310, 503, 1004, 107, 'Approved', 'Ready for draft', TO_DATE('05-MAR-24', 'DD-MON-YY'));
INSERT INTO Approvals VALUES (311, 507, 1009, 103, 'Approved', 'Safety compliance met', TO_DATE('12-JUN-24', 'DD-MON-YY'));

COMMIT;

-- 3. THE 20 WORKING QUERIES
-- Query 1
UPDATE Policies SET Status = 'Active' WHERE Policy_ID = 504;

-- Query 2
DELETE FROM Approvals WHERE Policy_ID IN (SELECT Policy_ID FROM Policies WHERE Status = 'Archived' AND Effective_Date < TO_DATE('01-JAN-23', 'DD-MON-YY'));
DELETE FROM ChangeHistory WHERE Policy_ID IN (SELECT Policy_ID FROM Policies WHERE Status = 'Archived' AND Effective_Date < TO_DATE('01-JAN-23', 'DD-MON-YY'));
DELETE FROM PolicyVersions WHERE Policy_ID IN (SELECT Policy_ID FROM Policies WHERE Status = 'Archived' AND Effective_Date < TO_DATE('01-JAN-23', 'DD-MON-YY'));
DELETE FROM Policies WHERE Status = 'Archived' AND Effective_Date < TO_DATE('01-JAN-23', 'DD-MON-YY');

-- Query 3
SELECT Policy_Name, Status, TO_CHAR(Effective_Date, 'DD-MON-YY') AS Effective_Date 
FROM Policies WHERE Status = 'Active';

-- Query 4
SELECT P.Policy_Name, C.Category_Name 
FROM Policies P 
JOIN Categories C ON P.Category_ID = C.Category_ID 
WHERE C.Category_Name = 'Security';

-- Query 5
SELECT Change_ID, Type, Description, TO_CHAR(Changed_At, 'DD-MON-YY') AS Change_Date 
FROM ChangeHistory 
WHERE Changed_At >= TO_TIMESTAMP('2024-01-01 00:00:00', 'YYYY-MM-DD HH24:MI:SS');

-- Query 6
SELECT P.Policy_Name, D.DEPT_NAME, U.USERNAME AS Created_By
FROM Policies P
JOIN Departments D ON P.DEPT_ID = D.DEPT_ID
JOIN Users U ON P.Created_By = U.USER_ID;

-- Query 7
SELECT PV.Version_Number, PV.Changes_Made, U.USERNAME AS Modified_By
FROM PolicyVersions PV
JOIN Users U ON PV.Modified_By = U.USER_ID;

-- Query 8
SELECT P.Policy_Name, A.Status, U.USERNAME AS Approver
FROM Approvals A
JOIN Policies P ON A.Policy_ID = P.Policy_ID
JOIN Users U ON A.Approver_ID = U.USER_ID;

-- Query 9
SELECT C.Category_Name, D.DEPT_NAME, P.Policy_Name 
FROM Policies P
JOIN Categories C ON P.Category_ID = C.Category_ID
JOIN Departments D ON P.DEPT_ID = D.DEPT_ID;

-- Query 10
SELECT P.Policy_Name, CH.Type, CH.Description, U.USERNAME AS Changed_By
FROM ChangeHistory CH
JOIN Policies P ON CH.Policy_ID = P.Policy_ID
JOIN Users U ON CH.Changed_By = U.USER_ID;

-- Query 11
SELECT Status, COUNT(*) AS Total_Policies FROM Policies GROUP BY Status;

-- Query 12
SELECT D.DEPT_NAME, COUNT(P.Policy_ID) AS Policy_Count 
FROM Departments D
LEFT JOIN Policies P ON D.DEPT_ID = P.DEPT_ID
GROUP BY D.DEPT_NAME;

-- Query 13
SELECT ROUND(AVG(v_count), 2) AS Avg_Versions 
FROM (SELECT COUNT(*) AS v_count FROM PolicyVersions GROUP BY Policy_ID);

-- Query 14
SELECT U.USERNAME, COUNT(A.Approval_ID) AS Total_Approvals 
FROM Users U
JOIN Approvals A ON U.USER_ID = A.Approver_ID
GROUP BY U.USERNAME 
ORDER BY COUNT(A.Approval_ID) DESC;

-- Query 15
SELECT C.Category_Name, COUNT(P.Policy_ID) AS Total_Policies 
FROM Categories C
JOIN Policies P ON C.Category_ID = P.Category_ID
GROUP BY C.Category_Name;

-- Query 16
SELECT Policy_Name FROM Policies 
WHERE Policy_ID IN (SELECT Policy_ID FROM PolicyVersions GROUP BY Policy_ID HAVING COUNT(*) > 1);

-- Query 17
SELECT USERNAME, EMAIL FROM Users 
WHERE USER_ID IN (SELECT Approver_ID FROM Approvals WHERE Status = 'Pending');

-- Query 18
SELECT DEPT_NAME FROM Departments 
WHERE DEPT_ID NOT IN (SELECT DEPT_ID FROM Policies WHERE Status = 'Active');

-- Query 19
SELECT Policy_ID, MAX(Version_Number) AS Latest_Version 
FROM PolicyVersions GROUP BY Policy_ID;

-- Query 20
SELECT DISTINCT Policy_Name FROM Policies 
WHERE Policy_ID IN (SELECT Policy_ID FROM Approvals WHERE Status = 'Rejected');