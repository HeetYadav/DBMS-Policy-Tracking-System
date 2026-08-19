/* ═══════════════════════════════════════════════════════════════
   PolicyTrack — app.js
   All data hardcoded from queries.sql + full rendering engine
═══════════════════════════════════════════════════════════════ */

/* ─── STATE ─────────────────────────────────────────────── */
let dmlState = { q1Applied: false, q2Applied: false };

/* ─── RAW TABLE DATA ─────────────────────────────────────── */
const DB = {
  Departments: {
    columns: ['DEPT_ID','DEPT_NAME','DEPT_HEAD','CREATED_AT'],
    rows: [
      [1,'Human Resources','Heet Yadav','15-JAN-23'],
      [2,'Finance','Harshil Kanani','10-FEB-23'],
      [3,'Legal','Kevin Hingu','05-MAR-23'],
      [4,'Information Technology','Om Jani','20-APR-23'],
      [5,'Operations','Gauri Mathur','12-MAY-23'],
    ]
  },
  Users: {
    columns: ['USER_ID','USERNAME','EMAIL','ROLE','DEPT_ID','CREATED_AT'],
    rows: [
      [101,'heety','heety@company.com','Admin',1,'01-JUN-23'],
      [102,'harshilk','harshilk@company.com','Policy Manager',2,'15-JUN-23'],
      [103,'kevinh','kevinh@company.com','Auditor',3,'10-JUL-23'],
      [104,'gaurim','gaurim@company.com','Viewer',5,'22-JUL-23'],
      [105,'omj','omj@company.com','Policy Manager',4,'05-AUG-23'],
      [106,'hetp','hetp@company.com','Viewer',1,'18-AUG-23'],
      [107,'garvitj','garvitj@company.com','Auditor',3,'30-SEP-23'],
    ]
  },
  Categories: {
    columns: ['Category_ID','Category_Name','Description'],
    rows: [
      [10,'Security','Data protection and cyber safety rules'],
      [20,'Finance','Budgeting and expense reporting'],
      [30,'Compliance','Regulatory and legal adherence'],
      [40,'Operations','Daily workflow and logistics'],
      [50,'HR','Employee conduct and benefits'],
    ]
  },
  Policies: {
    columns: ['Policy_ID','Policy_Name','Category_ID','DEPT_ID','Status','Created_By','Effective_Date'],
    rows: [
      [501,'Data Privacy Policy',10,4,'Active',105,'01-JAN-24'],
      [502,'Travel Reimbursement',20,2,'Active',102,'15-FEB-24'],
      [503,'Code of Conduct',50,1,'Active',101,'10-MAR-24'],
      [504,'Remote Work Policy',50,1,'Draft',101,'01-OCT-24'],
      [505,'Network Access Rule',10,4,'Active',105,'20-MAY-24'],
      [506,'Anti-Money Laundering',30,3,'Archived',103,'01-JAN-22'],
      [507,'Safety Protocols',40,5,'Active',104,'15-JUN-24'],
      [508,'Vendor Management',30,3,'Draft',107,'01-NOV-24'],
    ]
  },
  PolicyVersions: {
    columns: ['Version_ID','Policy_ID','Version_Number','Changes_Made','Modified_By','Modified_At','Is_Current'],
    rows: [
      [1001,501,'1.0','Initial Release',105,'2023-12-01 09:00:00','N'],
      [1002,501,'1.1','Updated Encryption',105,'2024-01-01 10:30:00','Y'],
      [1003,502,'1.0','Initial policy',102,'2024-02-10 14:00:00','Y'],
      [1004,503,'1.0','Initial policy',101,'2024-03-01 08:45:00','N'],
      [1005,503,'2.0','Social media section added',101,'2024-03-10 11:00:00','Y'],
      [1006,504,'1.0','Drafting phase',101,'2024-09-25 16:00:00','Y'],
      [1007,505,'1.0','Initial Rule set',105,'2024-05-15 09:20:00','Y'],
      [1008,506,'1.0','Legacy rules',103,'2021-12-15 10:00:00','Y'],
      [1009,507,'1.0','Workplace safety basics',104,'2024-06-01 13:00:00','Y'],
      [1010,508,'1.0','Vendor criteria',107,'2024-10-20 15:30:00','Y'],
      [1011,501,'1.2','GDPR compliance clause',105,'2024-02-01 10:00:00','N'],
      [1012,503,'2.1','Clarified dress code',101,'2024-03-20 12:00:00','N'],
    ]
  },
  ChangeHistory: {
    columns: ['Change_ID','Policy_ID','Version_ID','Type','Description','Changed_By','Changed_At'],
    rows: [
      [201,501,1002,'Update','Encryption upgrade',105,'2024-01-01 10:00:00'],
      [202,501,1011,'Revision','GDPR alignment',105,'2024-02-01 09:00:00'],
      [203,503,1005,'Major Update','Social media addition',101,'2024-03-10 10:30:00'],
      [204,503,1012,'Minor Update','Dress code change',101,'2024-03-20 11:30:00'],
      [205,502,1003,'Creation','New Policy Setup',102,'2024-02-10 14:00:00'],
      [206,504,1006,'Draft','Internal Review',101,'2024-09-25 16:00:00'],
      [207,505,1007,'Creation','Rule Established',105,'2024-05-15 09:20:00'],
      [208,507,1009,'Creation','Safety Guidelines',104,'2024-06-01 13:00:00'],
      [209,508,1010,'Draft','Procurement Check',107,'2024-10-20 15:30:00'],
      [210,501,1001,'Creation','Base policy',105,'2023-12-01 09:00:00'],
      [211,503,1004,'Creation','Base policy',101,'2024-03-01 08:45:00'],
      [212,506,1008,'Legacy','System migration',103,'2021-12-15 10:00:00'],
      [213,501,1002,'Security','Firewall rules',105,'2024-01-05 10:00:00'],
      [214,502,1003,'Finance','Rate change',102,'2024-02-20 09:00:00'],
      [215,503,1005,'Legal','Ethics update',103,'2024-03-15 14:00:00'],
      [216,507,1009,'Logistics','Emergency update',104,'2024-06-10 11:00:00'],
    ]
  },
  Approvals: {
    columns: ['Approval_ID','Policy_ID','Version_ID','Approver_ID','Status','Comments','Approval_Date'],
    rows: [
      [301,501,1002,103,'Approved','Security standards met','01-JAN-24'],
      [302,502,1003,103,'Approved','Finance review clear','14-FEB-24'],
      [303,503,1005,107,'Approved','Guidelines verified','09-MAR-24'],
      [304,504,1006,103,'Pending','Legal review pending','05-OCT-24'],
      [305,505,1007,103,'Approved','IT check passed','18-MAY-24'],
      [306,508,1010,107,'Pending','Under review','01-NOV-24'],
      [307,501,1011,103,'Rejected','Missing clause 4','05-FEB-24'],
      [308,503,1012,107,'Approved','Minor change accepted','21-MAR-24'],
      [309,501,1001,103,'Approved','Initial approval','05-DEC-23'],
      [310,503,1004,107,'Approved','Ready for draft','05-MAR-24'],
      [311,507,1009,103,'Approved','Safety compliance met','12-JUN-24'],
    ]
  }
};

/* ─── COLUMN METADATA ─────────────────────────────────────── */
// pk: primary key columns, fk: {colIndex: 'RefTable'}, status: col index with pills, role: col index
const COL_META = {
  Departments:    { pk:[0], fk:{}, status:-1, role:-1 },
  Users:          { pk:[0], fk:{4:'Departments'}, status:-1, role:3 },
  Categories:     { pk:[0], fk:{}, status:-1, role:-1 },
  Policies:       { pk:[0], fk:{2:'Categories',3:'Departments',5:'Users'}, status:4, role:-1 },
  PolicyVersions: { pk:[0], fk:{1:'Policies',4:'Users'}, status:-1, role:-1, isCurrent:6 },
  ChangeHistory:  { pk:[0], fk:{1:'Policies',2:'PolicyVersions',5:'Users'}, status:-1, role:-1 },
  Approvals:      { pk:[0], fk:{1:'Policies',2:'PolicyVersions',3:'Users'}, status:4, role:-1 },
};

/* ─── 20 QUERIES ─────────────────────────────────────────── */
const QUERIES = [
  {
    id: 1,
    title: 'Update Policy Status',
    types: ['DML'],
    purpose: 'Promotes the "Remote Work Policy" (ID 504) from <strong>Draft</strong> to <strong>Active</strong> status, signifying it has been officially approved and is now enforced across the organization.',
    sql: `-- Query 1: Update Policy Status (DML)
UPDATE Policies
    SET Status = 'Active'
    WHERE Policy_ID = 504;`,
    isDML: true,
    dmlType: 'update',
    outputCols: ['Policy_ID','Policy_Name','Status','Note'],
    outputRows: [
      { before: [504,'Remote Work Policy','Draft','← BEFORE'], after: [504,'Remote Work Policy','Active','← AFTER'] }
    ],
    note: '<strong>Interactive Simulation:</strong> Click "Run Simulation" to apply this UPDATE to the live Tables Viewer above (Section 3). The Remote Work Policy row will change from Draft → Active in real-time.'
  },
  {
    id: 2,
    title: 'Delete Archived Policies (Cascade)',
    types: ['DML'],
    purpose: 'Safely removes all data associated with policies that are <strong>Archived</strong> and older than Jan 1, 2023. The deletion cascades through three child tables in the correct dependency order: Approvals → ChangeHistory → PolicyVersions → Policies — preserving referential integrity.',
    sql: `-- Query 2: Cascading Delete of Archived Policies (DML)
DELETE FROM Approvals
    WHERE Policy_ID IN (
        SELECT Policy_ID FROM Policies
        WHERE Status = 'Archived'
        AND Effective_Date < TO_DATE('01-JAN-23','DD-MON-YY'));

DELETE FROM ChangeHistory
    WHERE Policy_ID IN (
        SELECT Policy_ID FROM Policies
        WHERE Status = 'Archived'
        AND Effective_Date < TO_DATE('01-JAN-23','DD-MON-YY'));

DELETE FROM PolicyVersions
    WHERE Policy_ID IN (
        SELECT Policy_ID FROM Policies
        WHERE Status = 'Archived'
        AND Effective_Date < TO_DATE('01-JAN-23','DD-MON-YY'));

DELETE FROM Policies
    WHERE Status = 'Archived'
    AND Effective_Date < TO_DATE('01-JAN-23','DD-MON-YY');`,
    isDML: true,
    dmlType: 'delete',
    outputCols: ['Table','Rows Deleted','Reason'],
    outputRows: [
      [['Approvals'],'1 row (Approval_ID 309)','Linked to Policy 506'],
      [['ChangeHistory'],'1 row (Change_ID 212)','Linked to Policy 506'],
      [['PolicyVersions'],'1 row (Version_ID 1008)','Linked to Policy 506'],
      [['Policies'],'1 row (Policy_ID 506)','Anti-Money Laundering — Archived, Eff. 01-JAN-22'],
    ],
    note: '<strong>Referential Integrity:</strong> Child tables must be deleted before the parent Policies row. This query demonstrates cascade delete in the correct FK dependency order, a core 3NF data integrity principle.'
  },
  {
    id: 3,
    title: 'List All Active Policies',
    types: ['SELECT'],
    purpose: 'Retrieves all policies currently in <strong>Active</strong> status with their name and effective date — the primary governance view used by stakeholders to identify enforceable policies.',
    sql: `-- Query 3: List All Active Policies
SELECT Policy_Name,
       Status,
       TO_CHAR(Effective_Date, 'DD-MON-YY') AS Effective_Date
    FROM Policies
    WHERE Status = 'Active';`,
    outputCols: ['POLICY_NAME','STATUS','EFFECTIVE_DATE'],
    outputRows: [
      ['Data Privacy Policy','Active','01-JAN-24'],
      ['Travel Reimbursement','Active','15-FEB-24'],
      ['Code of Conduct','Active','10-MAR-24'],
      ['Network Access Rule','Active','20-MAY-24'],
      ['Safety Protocols','Active','15-JUN-24'],
      ['Remote Work Policy','Active','01-OCT-24'],
    ]
  },
  {
    id: 4,
    title: 'Security Category Policies',
    types: ['SELECT','JOIN'],
    purpose: 'Joins Policies with Categories to find all policies classified under the <strong>Security</strong> category — used for IT compliance audits and security governance reviews.',
    sql: `-- Query 4: Policies in Security Category (JOIN)
SELECT P.Policy_Name,
       C.Category_Name
    FROM Policies P
    JOIN Categories C ON P.Category_ID = C.Category_ID
    WHERE C.Category_Name = 'Security';`,
    outputCols: ['POLICY_NAME','CATEGORY_NAME'],
    outputRows: [
      ['Data Privacy Policy','Security'],
      ['Network Access Rule','Security'],
    ]
  },
  {
    id: 5,
    title: 'Recent Change History (2024+)',
    types: ['SELECT'],
    purpose: 'Fetches all change log entries recorded from <strong>January 1, 2024</strong> onwards — the primary audit trail query for recent policy activity reviews.',
    sql: `-- Query 5: Change History Since 2024
SELECT Change_ID,
       Type,
       Description,
       TO_CHAR(Changed_At, 'DD-MON-YY') AS Change_Date
    FROM ChangeHistory
    WHERE Changed_At >= TO_TIMESTAMP(
        '2024-01-01 00:00:00','YYYY-MM-DD HH24:MI:SS');`,
    outputCols: ['CHANGE_ID','TYPE','DESCRIPTION','CHANGE_DATE'],
    outputRows: [
      [201,'Update','Encryption upgrade','01-JAN-24'],
      [202,'Revision','GDPR alignment','01-FEB-24'],
      [203,'Major Update','Social media addition','10-MAR-24'],
      [204,'Minor Update','Dress code change','20-MAR-24'],
      [205,'Creation','New Policy Setup','10-FEB-24'],
      [206,'Draft','Internal Review','25-SEP-24'],
      [207,'Creation','Rule Established','15-MAY-24'],
      [208,'Creation','Safety Guidelines','01-JUN-24'],
      [209,'Draft','Procurement Check','20-OCT-24'],
      [213,'Security','Firewall rules','05-JAN-24'],
      [214,'Finance','Rate change','20-FEB-24'],
      [215,'Legal','Ethics update','15-MAR-24'],
      [216,'Logistics','Emergency update','10-JUN-24'],
    ]
  },
  {
    id: 6,
    title: 'Policies with Department & Creator',
    types: ['SELECT','JOIN'],
    purpose: 'A multi-table join linking Policies, Departments, and Users to produce a clear ownership report showing <strong>who created each policy and in which department</strong> — essential for accountability tracking.',
    sql: `-- Query 6: Policies with Department & Creator (Multi-JOIN)
SELECT P.Policy_Name,
       D.DEPT_NAME,
       U.USERNAME AS Created_By
    FROM Policies P
    JOIN Departments D ON P.DEPT_ID = D.DEPT_ID
    JOIN Users U ON P.Created_By = U.USER_ID;`,
    outputCols: ['POLICY_NAME','DEPT_NAME','CREATED_BY'],
    outputRows: [
      ['Data Privacy Policy','Information Technology','omj'],
      ['Travel Reimbursement','Finance','harshilk'],
      ['Code of Conduct','Human Resources','heety'],
      ['Remote Work Policy','Human Resources','heety'],
      ['Network Access Rule','Information Technology','omj'],
      ['Anti-Money Laundering','Legal','kevinh'],
      ['Safety Protocols','Operations','gaurim'],
      ['Vendor Management','Legal','garvitj'],
    ]
  },
  {
    id: 7,
    title: 'Policy Version History',
    types: ['SELECT','JOIN'],
    purpose: 'Joins PolicyVersions with Users to show the full version history timeline for all policies — the primary view for tracking what changed in each version and who made the modification.',
    sql: `-- Query 7: Policy Version History (JOIN)
SELECT PV.Version_Number,
       PV.Changes_Made,
       U.USERNAME AS Modified_By
    FROM PolicyVersions PV
    JOIN Users U ON PV.Modified_By = U.USER_ID;`,
    outputCols: ['VERSION_NUMBER','CHANGES_MADE','MODIFIED_BY'],
    outputRows: [
      ['1.0','Initial Release','omj'],
      ['1.1','Updated Encryption','omj'],
      ['1.0','Initial policy','harshilk'],
      ['1.0','Initial policy','heety'],
      ['2.0','Social media section added','heety'],
      ['1.0','Drafting phase','heety'],
      ['1.0','Initial Rule set','omj'],
      ['1.0','Legacy rules','kevinh'],
      ['1.0','Workplace safety basics','gaurim'],
      ['1.0','Vendor criteria','garvitj'],
      ['1.2','GDPR compliance clause','omj'],
      ['2.1','Clarified dress code','heety'],
    ]
  },
  {
    id: 8,
    title: 'Approvals with Approver Names',
    types: ['SELECT','JOIN'],
    purpose: 'Joins Approvals, Policies, and Users to produce a complete approval audit report — showing <strong>which policies were approved/rejected by whom</strong>, critical for compliance certification.',
    sql: `-- Query 8: Approvals with Approver Names (Multi-JOIN)
SELECT P.Policy_Name,
       A.Status,
       U.USERNAME AS Approver
    FROM Approvals A
    JOIN Policies P ON A.Policy_ID = P.Policy_ID
    JOIN Users U ON A.Approver_ID = U.USER_ID;`,
    outputCols: ['POLICY_NAME','STATUS','APPROVER'],
    outputRows: [
      ['Data Privacy Policy','Approved','kevinh'],
      ['Travel Reimbursement','Approved','kevinh'],
      ['Code of Conduct','Approved','garvitj'],
      ['Remote Work Policy','Pending','kevinh'],
      ['Network Access Rule','Approved','kevinh'],
      ['Vendor Management','Pending','garvitj'],
      ['Data Privacy Policy','Rejected','kevinh'],
      ['Code of Conduct','Approved','garvitj'],
      ['Data Privacy Policy','Approved','kevinh'],
      ['Code of Conduct','Approved','garvitj'],
      ['Safety Protocols','Approved','kevinh'],
    ]
  },
  {
    id: 9,
    title: 'Category + Department + Policy Map',
    types: ['SELECT','JOIN'],
    purpose: 'A three-way join producing a cross-reference map of <strong>categories, departments, and policies</strong> — useful for organizational governance structure reporting.',
    sql: `-- Query 9: Category, Department & Policy Cross-Map (Multi-JOIN)
SELECT C.Category_Name,
       D.DEPT_NAME,
       P.Policy_Name
    FROM Policies P
    JOIN Categories C ON P.Category_ID = C.Category_ID
    JOIN Departments D ON P.DEPT_ID = D.DEPT_ID;`,
    outputCols: ['CATEGORY_NAME','DEPT_NAME','POLICY_NAME'],
    outputRows: [
      ['Security','Information Technology','Data Privacy Policy'],
      ['Finance','Finance','Travel Reimbursement'],
      ['HR','Human Resources','Code of Conduct'],
      ['HR','Human Resources','Remote Work Policy'],
      ['Security','Information Technology','Network Access Rule'],
      ['Compliance','Legal','Anti-Money Laundering'],
      ['Operations','Operations','Safety Protocols'],
      ['Compliance','Legal','Vendor Management'],
    ]
  },
  {
    id: 10,
    title: 'Change History with Actor Names',
    types: ['SELECT','JOIN'],
    purpose: 'Replaces foreign key IDs with human-readable names across three joined tables — providing a fully annotated change log showing <strong>which policy changed, what type of change, and who made it</strong>.',
    sql: `-- Query 10: Change History with Actor Names (Multi-JOIN)
SELECT P.Policy_Name,
       CH.Type,
       CH.Description,
       U.USERNAME AS Changed_By
    FROM ChangeHistory CH
    JOIN Policies P ON CH.Policy_ID = P.Policy_ID
    JOIN Users U ON CH.Changed_By = U.USER_ID;`,
    outputCols: ['POLICY_NAME','TYPE','DESCRIPTION','CHANGED_BY'],
    outputRows: [
      ['Data Privacy Policy','Update','Encryption upgrade','omj'],
      ['Data Privacy Policy','Revision','GDPR alignment','omj'],
      ['Code of Conduct','Major Update','Social media addition','heety'],
      ['Code of Conduct','Minor Update','Dress code change','heety'],
      ['Travel Reimbursement','Creation','New Policy Setup','harshilk'],
      ['Remote Work Policy','Draft','Internal Review','heety'],
      ['Network Access Rule','Creation','Rule Established','omj'],
      ['Safety Protocols','Creation','Safety Guidelines','gaurim'],
      ['Vendor Management','Draft','Procurement Check','garvitj'],
      ['Data Privacy Policy','Creation','Base policy','omj'],
      ['Code of Conduct','Creation','Base policy','heety'],
      ['Anti-Money Laundering','Legacy','System migration','kevinh'],
      ['Data Privacy Policy','Security','Firewall rules','omj'],
      ['Travel Reimbursement','Finance','Rate change','harshilk'],
      ['Code of Conduct','Legal','Ethics update','kevinh'],
      ['Safety Protocols','Logistics','Emergency update','gaurim'],
    ]
  },
  {
    id: 11,
    title: 'Policy Count by Status',
    types: ['SELECT','AGGREGATE'],
    purpose: 'Groups policies by their lifecycle status and counts each — gives management an instant <strong>portfolio health snapshot</strong> (how many are Active, Draft, or Archived).',
    sql: `-- Query 11: Policy Count by Status (GROUP BY)
SELECT Status,
       COUNT(*) AS Total_Policies
    FROM Policies
    GROUP BY Status;`,
    outputCols: ['STATUS','TOTAL_POLICIES'],
    outputRows: [
      ['Active','6'],
      ['Draft','2'],
      ['Archived','1'],
    ]
  },
  {
    id: 12,
    title: 'Policy Count per Department',
    types: ['SELECT','AGGREGATE','JOIN'],
    purpose: 'LEFT JOIN ensures every department appears even if it has zero policies — providing a complete workload distribution report across all organizational units.',
    sql: `-- Query 12: Policy Count per Department (LEFT JOIN + GROUP BY)
SELECT D.DEPT_NAME,
       COUNT(P.Policy_ID) AS Policy_Count
    FROM Departments D
    LEFT JOIN Policies P ON D.DEPT_ID = P.DEPT_ID
    GROUP BY D.DEPT_NAME;`,
    outputCols: ['DEPT_NAME','POLICY_COUNT'],
    outputRows: [
      ['Human Resources','2'],
      ['Finance','1'],
      ['Legal','2'],
      ['Information Technology','2'],
      ['Operations','1'],
    ]
  },
  {
    id: 13,
    title: 'Average Versions per Policy',
    types: ['SELECT','AGGREGATE'],
    purpose: 'Uses a subquery to first compute the version count per policy, then averages those counts — measuring the <strong>average documentation depth</strong> of policies in the system.',
    sql: `-- Query 13: Average Versions per Policy (AVG + Subquery)
SELECT ROUND(AVG(v_count), 2) AS Avg_Versions
    FROM (
        SELECT COUNT(*) AS v_count
            FROM PolicyVersions
            GROUP BY Policy_ID
    );`,
    outputCols: ['AVG_VERSIONS'],
    outputRows: [['1.5']]
  },
  {
    id: 14,
    title: 'Top Approvers by Activity',
    types: ['SELECT','AGGREGATE','JOIN'],
    purpose: 'Counts approvals handled by each user and ranks them in descending order — identifying the <strong>most active approvers</strong> for workload analysis and role assignment.',
    sql: `-- Query 14: Top Approvers by Activity (GROUP BY + ORDER BY)
SELECT U.USERNAME,
       COUNT(A.Approval_ID) AS Total_Approvals
    FROM Users U
    JOIN Approvals A ON U.USER_ID = A.Approver_ID
    GROUP BY U.USERNAME
    ORDER BY COUNT(A.Approval_ID) DESC;`,
    outputCols: ['USERNAME','TOTAL_APPROVALS'],
    outputRows: [
      ['kevinh','7'],
      ['garvitj','4'],
    ]
  },
  {
    id: 15,
    title: 'Policies per Category',
    types: ['SELECT','AGGREGATE','JOIN'],
    purpose: 'Groups policies by their category to show how many policies exist in each domain — used for <strong>category-level governance reporting</strong> and identifying over/under-served areas.',
    sql: `-- Query 15: Policies per Category (JOIN + GROUP BY)
SELECT C.Category_Name,
       COUNT(P.Policy_ID) AS Total_Policies
    FROM Categories C
    JOIN Policies P ON C.Category_ID = P.Category_ID
    GROUP BY C.Category_Name;`,
    outputCols: ['CATEGORY_NAME','TOTAL_POLICIES'],
    outputRows: [
      ['Security','2'],
      ['Finance','1'],
      ['Compliance','2'],
      ['Operations','1'],
      ['HR','2'],
    ]
  },
  {
    id: 16,
    title: 'Policies with Multiple Versions',
    types: ['SELECT','SUBQUERY'],
    purpose: 'Uses a subquery with HAVING to identify policies that have been revised more than once — flagging <strong>high-change policies</strong> that may need stability review.',
    sql: `-- Query 16: Policies with Multiple Versions (Subquery + HAVING)
SELECT Policy_Name
    FROM Policies
    WHERE Policy_ID IN (
        SELECT Policy_ID
            FROM PolicyVersions
            GROUP BY Policy_ID
            HAVING COUNT(*) > 1
    );`,
    outputCols: ['POLICY_NAME'],
    outputRows: [
      ['Data Privacy Policy'],
      ['Code of Conduct'],
    ]
  },
  {
    id: 17,
    title: 'Users with Pending Approvals',
    types: ['SELECT','SUBQUERY'],
    purpose: 'Identifies users who have outstanding pending approvals — used to follow up and <strong>unblock the policy approval pipeline</strong>.',
    sql: `-- Query 17: Users with Pending Approvals (Subquery)
SELECT USERNAME, EMAIL
    FROM Users
    WHERE USER_ID IN (
        SELECT Approver_ID
            FROM Approvals
            WHERE Status = 'Pending'
    );`,
    outputCols: ['USERNAME','EMAIL'],
    outputRows: [
      ['kevinh','kevinh@company.com'],
      ['garvitj','garvitj@company.com'],
    ]
  },
  {
    id: 18,
    title: 'Departments with No Active Policy',
    types: ['SELECT','SUBQUERY'],
    purpose: 'Uses a NOT IN subquery to find departments that have no Active policies — highlighting <strong>governance gaps</strong> where departments lack enforced rules.',
    sql: `-- Query 18: Departments with No Active Policy (NOT IN Subquery)
SELECT DEPT_NAME
    FROM Departments
    WHERE DEPT_ID NOT IN (
        SELECT DEPT_ID
            FROM Policies
            WHERE Status = 'Active'
    );`,
    outputCols: ['DEPT_NAME'],
    outputRows: [
      ['Legal'],
    ]
  },
  {
    id: 19,
    title: 'Latest Version per Policy',
    types: ['SELECT','AGGREGATE'],
    purpose: 'Uses MAX on version numbers grouped by policy — quickly identifies the <strong>most recent version of every policy</strong> for current-state review.',
    sql: `-- Query 19: Latest Version per Policy (GROUP BY + MAX)
SELECT Policy_ID,
       MAX(Version_Number) AS Latest_Version
    FROM PolicyVersions
    GROUP BY Policy_ID;`,
    outputCols: ['POLICY_ID','LATEST_VERSION'],
    outputRows: [
      [501,'1.2'],
      [502,'1.0'],
      [503,'2.1'],
      [504,'1.0'],
      [505,'1.0'],
      [506,'1.0'],
      [507,'1.0'],
      [508,'1.0'],
    ]
  },
  {
    id: 20,
    title: 'Policies with Rejected Approvals',
    types: ['SELECT','SUBQUERY'],
    purpose: 'Finds all distinct policies that have had at least one approval rejected — critical for identifying <strong>non-compliant policies</strong> that require revision before re-submission.',
    sql: `-- Query 20: Policies with Rejected Approvals (DISTINCT + Subquery)
SELECT DISTINCT Policy_Name
    FROM Policies
    WHERE Policy_ID IN (
        SELECT Policy_ID
            FROM Approvals
            WHERE Status = 'Rejected'
    );`,
    outputCols: ['POLICY_NAME'],
    outputRows: [
      ['Data Privacy Policy'],
    ]
  },
];

/* ─── SQL SYNTAX HIGHLIGHTER ──────────────────────────────── */
function highlightSQL(code) {
  const keywords = /\b(SELECT|FROM|WHERE|JOIN|LEFT|INNER|ON|GROUP BY|ORDER BY|HAVING|INSERT|UPDATE|DELETE|SET|INTO|VALUES|AND|OR|NOT|IN|AS|DISTINCT|BY|COUNT|MAX|MIN|AVG|SUM|ROUND|TO_CHAR|TO_DATE|TO_TIMESTAMP|COMMIT|CREATE|TABLE|PRIMARY|KEY|FOREIGN|REFERENCES|INT|VARCHAR2|VARCHAR|DATE|TIMESTAMP|CHAR|NULL|IS|LIKE)\b/gi;
  const strings = /('(?:[^']|'')*')/g;
  const numbers = /\b(\d+(?:\.\d+)?)\b/g;
  const comments = /(--[^\n]*)/g;
  const tables = /\b(Departments|Users|Categories|Policies|PolicyVersions|ChangeHistory|Approvals)\b/g;

  return code
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(comments, '<span class="sql-cmt">$1</span>')
    .replace(strings, '<span class="sql-str">$1</span>')
    .replace(keywords, '<span class="sql-kw">$&</span>')
    .replace(tables, '<span class="sql-tbl">$&</span>')
    .replace(numbers, '<span class="sql-num">$1</span>');
}

/* ─── PILL RENDERER ───────────────────────────────────────── */
function pill(val) {
  if (val === null || val === undefined || val === '') return '<span class="null-value">null</span>';
  const v = String(val).toLowerCase().trim();
  const map = {
    'active':'pill-active','draft':'pill-draft','archived':'pill-archived',
    'approved':'pill-approved','pending':'pill-pending','rejected':'pill-rejected',
    'admin':'pill-admin','policy manager':'pill-manager','auditor':'pill-auditor','viewer':'pill-viewer',
    'y':'pill-y','n':'pill-n'
  };
  if (map[v]) return `<span class="pill ${map[v]}">${val}</span>`;
  return val;
}

/* ─── TABLE RENDERER ──────────────────────────────────────── */
function renderTable(tableName, rows) {
  const meta = COL_META[tableName];
  const cols = DB[tableName].columns;
  let html = `<table class="data-table"><thead><tr>`;
  cols.forEach((c,i) => {
    let tag = '';
    if (meta.pk.includes(i)) tag = '<span class="pk-mark">PK</span>';
    if (meta.fk[i]) tag = `<span class="fk-mark">FK</span>`;
    html += `<th>${c}${tag}</th>`;
  });
  html += `</tr></thead><tbody>`;
  rows.forEach(row => {
    html += `<tr>`;
    row.forEach((cell, i) => {
      let val = (cell === null || cell === undefined) ? '<span class="null-value">null</span>' : cell;
      if (i === meta.status || i === meta.role || meta.isCurrent === i) {
        val = pill(cell);
      } else if (meta.fk[i]) {
        val = `<span class="fk-ref"><span class="fk-icon">⇢</span>${cell}</span>`;
      }
      html += `<td>${val}</td>`;
    });
    html += `</tr>`;
  });
  html += `</tbody></table>`;
  return html;
}

/* ─── GET LIVE TABLE ROWS (respects DML simulation state) ─── */
function getLiveRows(tableName) {
  let rows = DB[tableName].rows.map(r => [...r]);

  if (dmlState.q1Applied && tableName === 'Policies') {
    rows = rows.map(r => r[0] === 504 ? [504, r[1], r[2], r[3], 'Active', r[5], r[6]] : r);
  }
  if (dmlState.q2Applied) {
    const archivedWithOldDate = [506];
    if (tableName === 'Policies')
      rows = rows.filter(r => !archivedWithOldDate.includes(r[0]));
    if (tableName === 'PolicyVersions')
      rows = rows.filter(r => !archivedWithOldDate.includes(r[1]));
    if (tableName === 'ChangeHistory')
      rows = rows.filter(r => !archivedWithOldDate.includes(r[1]));
    if (tableName === 'Approvals')
      rows = rows.filter(r => !archivedWithOldDate.includes(r[1]));
  }
  return rows;
}

/* ─── TABLES SECTION INIT ─────────────────────────────────── */
const tableNames = Object.keys(DB);
let activeTable = 'Departments';

function initTables() {
  const tabs = document.getElementById('table-tabs');
  tabs.innerHTML = tableNames.map(name =>
    `<button class="tab-btn${name===activeTable?' active':''}" data-table="${name}" role="tab">${name}</button>`
  ).join('');
  tabs.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTable = btn.dataset.table;
      tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderActiveTable();
    });
  });
  renderActiveTable();
}

function renderActiveTable() {
  const rows = getLiveRows(activeTable);
  document.getElementById('table-display').innerHTML = renderTable(activeTable, rows);
  document.getElementById('table-row-count').textContent =
    `${activeTable} · ${rows.length} row${rows.length!==1?'s':''}`;

  const badge = document.getElementById('dml-state-badge');
  const msgs = [];
  if (dmlState.q1Applied) msgs.push('Q1 UPDATE applied');
  if (dmlState.q2Applied) msgs.push('Q2 DELETE applied');
  if (msgs.length) {
    badge.textContent = '⚡ ' + msgs.join(' · ');
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }
}

/* ─── DML SIMULATION ──────────────────────────────────────── */
function handleSimClick(queryId, btn) {
  if (queryId === 1) {
    dmlState.q1Applied = !dmlState.q1Applied;
    btn.textContent = dmlState.q1Applied ? '↩ Reset Simulation' : '▶ Run Simulation';
    btn.classList.toggle('sim-active', dmlState.q1Applied);
  } else if (queryId === 2) {
    dmlState.q2Applied = !dmlState.q2Applied;
    btn.textContent = dmlState.q2Applied ? '↩ Reset Simulation' : '▶ Run Simulation';
    btn.classList.toggle('sim-active', dmlState.q2Applied);
  }
  renderActiveTable();
  if (dmlState.q1Applied || dmlState.q2Applied) {
    document.getElementById('tables')
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      document.querySelector(`[data-table="${queryId===1?'Policies':'Policies'}"]`)?.click();
    }, 600);
  }
}

/* ─── BUILD DIFF TABLE (Query 1) ─────────────────────────── */
function buildDiffTable(q) {
  const cols = q.outputCols;
  let html = `<div class="output-table-wrap"><table class="output-table"><thead><tr>`;
  cols.forEach(c => { html += `<th>${c}</th>`; });
  html += `</tr></thead><tbody>`;
  q.outputRows.forEach(row => {
    html += `<tr class="diff-row-before"><td><span class="diff-label diff-before">BEFORE</span></td>`;
    row.before.slice(1,-1).forEach(v => { html += `<td>${v}</td>`; });
    html += `<td>${row.before[3]||''}</td></tr>`;
    html += `<tr class="diff-row-after"><td><span class="diff-label diff-after">AFTER</span></td>`;
    row.after.slice(1,-1).forEach(v => { html += `<td>${pill(v)}</td>`; });
    html += `<td>${row.after[3]||''}</td></tr>`;
  });
  html += `</tbody></table></div>`;
  return html;
}

/* ─── BUILD QUERY CARD ────────────────────────────────────── */
function buildQueryCard(q) {
  const badgeHtml = q.types.map(t => {
    const cls = {DML:'badge-dml',SELECT:'badge-select',JOIN:'badge-join',AGGREGATE:'badge-aggregate',SUBQUERY:'badge-subquery'}[t]||'badge-select';
    return `<span class="qtype-badge ${cls}">${t}</span>`;
  }).join('');

  // Output table
  let outputHtml = '';
  if (q.id === 1) {
    outputHtml = buildDiffTable(q);
  } else if (q.id === 2) {
    // Cascade delete summary table
    outputHtml = `<div class="output-table-wrap"><table class="output-table"><thead><tr>
      <th>TABLE</th><th>ROWS_DELETED</th><th>REASON</th></tr></thead><tbody>`;
    q.outputRows.forEach(r => {
      outputHtml += `<tr><td style="color:var(--red)">${r[0]}</td><td>${r[1]}</td><td style="color:var(--text-secondary);font-size:11px">${r[2]}</td></tr>`;
    });
    outputHtml += `</tbody></table></div>`;
  } else {
    outputHtml = `<div class="output-table-wrap"><table class="output-table"><thead><tr>`;
    q.outputCols.forEach(c => { outputHtml += `<th>${c}</th>`; });
    outputHtml += `</tr></thead><tbody>`;
    q.outputRows.forEach(row => {
      outputHtml += `<tr>`;
      const cells = Array.isArray(row[0]) ? [row[0][0], ...row.slice(1)] : row;
      cells.forEach(cell => {
        outputHtml += `<td>${pill(cell)}</td>`;
      });
      outputHtml += `</tr>`;
    });
    outputHtml += `</tbody></table></div>`;
  }

  // DML sim bar
  const simBar = q.isDML ? `
    <div class="dml-sim-bar">
      <span class="dml-sim-icon">⚡</span>
      <div class="dml-sim-text">
        <strong>Interactive Simulation</strong>
        <span>${q.id===1?'Apply this UPDATE to the live Tables Viewer in Section 3':'Apply this CASCADE DELETE to the live Tables Viewer in Section 3'}</span>
      </div>
      <button class="sim-btn" id="sim-btn-${q.id}" onclick="handleSimClick(${q.id},this)">▶ Run Simulation</button>
    </div>` : '';

  const noteHtml = q.note ? `<div class="note-box"><span class="note-icon">💡</span><p>${q.note}</p></div>` : '';

  return `
<div class="query-card" id="query-card-${q.id}" data-id="${q.id}">
  <div class="qcard-header">
    <div class="qcard-title-group">
      <div class="qcard-num">QUERY ${String(q.id).padStart(2,'0')}</div>
      <div class="qcard-title">${q.title}</div>
    </div>
    <div class="qcard-badges">${badgeHtml}</div>
  </div>
  <div class="qcard-body">
    <div class="qcard-purpose">
      <div class="qcard-purpose-label">Business Purpose</div>
      <p>${q.purpose}</p>
    </div>
    <div class="qcard-sql">
      <div class="qcard-sql-label">SQL Statement</div>
      <div class="sql-block">
        <div class="sql-block-toolbar">
          <span class="sql-lang-tag">Oracle SQL</span>
          <button class="copy-btn" onclick="copySQL(this, ${q.id})">⧉ Copy</button>
        </div>
        <pre class="sql-code">${highlightSQL(q.sql)}</pre>
      </div>
    </div>
    ${simBar}
    <div class="qcard-output">
      <div class="qcard-output-label">Query Output · Pre-computed from Dummy Data</div>
      ${outputHtml}
    </div>
    ${noteHtml}
  </div>
</div>`;
}

/* ─── COPY SQL ────────────────────────────────────────────── */
function copySQL(btn, queryId) {
  const q = QUERIES.find(q => q.id === queryId);
  navigator.clipboard.writeText(q.sql).then(() => {
    btn.textContent = '✓ Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = '⧉ Copy'; btn.classList.remove('copied'); }, 2000);
  }).catch(() => {
    btn.textContent = '✓ Copied!';
    setTimeout(() => { btn.textContent = '⧉ Copy'; }, 2000);
  });
}

/* ─── SEARCH ──────────────────────────────────────────────── */
function initSearch() {
  const input = document.getElementById('query-search');
  const clear = document.getElementById('search-clear');
  let noResults = document.getElementById('no-results');
  if (!noResults) {
    noResults = document.createElement('div');
    noResults.id = 'no-results';
    noResults.className = 'no-results';
    noResults.innerHTML = '🔍 No queries match your search.';
    document.getElementById('query-cards-area').appendChild(noResults);
  }

  function doSearch() {
    const term = input.value.trim().toLowerCase();
    clear.style.display = term ? 'inline' : 'none';
    let visible = 0;
    QUERIES.forEach(q => {
      const card = document.getElementById(`query-card-${q.id}`);
      const matches = !term ||
        q.title.toLowerCase().includes(term) ||
        q.types.some(t => t.toLowerCase().includes(term)) ||
        q.purpose.toLowerCase().includes(term) ||
        q.sql.toLowerCase().includes(term);
      card.classList.toggle('query-hidden', !matches);
      if (matches) visible++;
    });
    noResults.classList.toggle('visible', visible === 0);
  }
  input.addEventListener('input', doSearch);
  clear.addEventListener('click', () => { input.value = ''; doSearch(); input.focus(); });
}

/* ─── SIDEBAR ─────────────────────────────────────────────── */
function initSidebar() {
  const list = document.getElementById('sidebar-list');
  list.innerHTML = QUERIES.map(q =>
    `<li class="sidebar-item">
      <a class="sidebar-link" href="#query-card-${q.id}" data-id="${q.id}">
        <span class="sidebar-qnum">Q${String(q.id).padStart(2,'0')}</span>
        <span class="sidebar-qtitle">${q.title}</span>
      </a>
    </li>`
  ).join('');

  list.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const card = document.getElementById(`query-card-${link.dataset.id}`);
      if (card) card.scrollIntoView({ behavior:'smooth', block:'start' });
    });
  });

  // Intersection Observer for active state
  const cardEls = document.querySelectorAll('.query-card');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.dataset.id;
        list.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
        const active = list.querySelector(`[data-id="${id}"]`);
        if (active) {
          active.classList.add('active');
          active.scrollIntoView({ block:'nearest' });
        }
      }
    });
  }, { rootMargin: '-10% 0px -70% 0px', threshold: 0 });

  cardEls.forEach(c => io.observe(c));
}

/* ─── SCROLL-REVEAL ───────────────────────────────────────── */
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(el => io.observe(el));

  const cards = document.querySelectorAll('.query-card');
  const cardIO = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.06 });
  cards.forEach(c => cardIO.observe(c));
}

/* ─── STAT COUNTER ────────────────────────────────────────── */
function initCounters() {
  const nums = document.querySelectorAll('.stat-number');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.target);
      const duration = 1400;
      const start = performance.now();
      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(frame);
        else el.textContent = target;
      }
      requestAnimationFrame(frame);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => io.observe(n));
}

/* ─── NAVBAR SCROLL ───────────────────────────────────────── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ─── BACK TO TOP ─────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  const erSection = document.getElementById('er-diagram');
  const io = new IntersectionObserver(entries => {
    btn.classList.toggle('visible', !entries[0].isIntersecting);
  }, { threshold: 0 });
  io.observe(erSection);
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── ER DIAGRAM ZOOM ─────────────────────────────────────── */
function initERZoom() {
  const btn = document.getElementById('diagram-zoom-btn');
  const modal = document.getElementById('er-modal');
  const modalClose = document.getElementById('er-modal-close');
  const backdrop = document.getElementById('er-modal-backdrop');
  const modalDiagram = document.getElementById('er-modal-diagram');

  btn.addEventListener('click', () => {
    const originalSVG = document.querySelector('#er-mermaid svg');
    if (originalSVG) modalDiagram.innerHTML = originalSVG.outerHTML;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    modalDiagram.innerHTML = '';
  }
  modalClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

/* ─── MERMAID INIT ────────────────────────────────────────── */
function initMermaid() {
  mermaid.initialize({
    startOnLoad: true,
    theme: 'base',
    themeVariables: {
      primaryColor: '#1a1a1a',
      primaryTextColor: '#F5F0E8',
      primaryBorderColor: '#6EE7B7',
      lineColor: '#6EE7B7',
      secondaryColor: '#111111',
      tertiaryColor: '#0a0a0a',
      background: '#0a0a0a',
      mainBkg: '#161616',
      nodeBorder: '#2a2a2a',
      clusterBkg: '#0d0d0d',
      titleColor: '#F5F0E8',
      edgeLabelBackground: '#1a1a1a',
      attributeBackgroundColorEven: '#101010',
      attributeBackgroundColorOdd: '#161616',
    },
    er: { diagramPadding: 24, layoutDirection: 'LR', minEntityWidth: 120, minEntityHeight: 80, entityPadding: 14, useMaxWidth: true },
    securityLevel: 'loose',
    fontFamily: "'Space Grotesk', sans-serif",
  });
}

/* ─── MAIN INIT ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initMermaid();
  initNavbar();
  initTables();
  initCounters();

  // Render query cards
  const area = document.getElementById('query-cards-area');
  area.innerHTML = QUERIES.map(q => buildQueryCard(q)).join('');

  // Render sidebar
  initSidebar();
  initSearch();
  initReveal();
  initBackToTop();
  initERZoom();
});
