export const SAMPLE_DATASETS = [
  {
    id: 'ecommerce-sales',
    name: 'E-Commerce Sales & Orders',
    description: 'Contains customer orders, regions, revenue, discount rates, and missing shipping statuses.',
    filename: 'sample_ecommerce_sales.csv',
    content: `order_id,customer_id,region,category,revenue,quantity,discount_pct,order_date,status
ORD-1001,CUST-201,North America,Electronics,299.99,1,0.05,2024-01-15,Delivered
ORD-1002,CUST-202,Europe,Furniture,450.00,2,0.10,2024-01-16,Delivered
ORD-1003,CUST-203,Asia,Electronics,120.50,1,0.00,2024-01-16,Processing
ORD-1004,CUST-204,North America,Clothing,45.00,3,0.00,2024-01-17,Delivered
ORD-1005,CUST-205,Europe,Electronics,899.00,1,0.15,2024-01-18,Cancelled
ORD-1006,CUST-206,North America,Furniture,320.00,1,0.00,2024-01-19,Delivered
ORD-1007,CUST-207,Asia,Clothing,65.50,2,0.05,2024-01-20,
ORD-1008,CUST-208,Europe,Electronics,1250.00,2,0.20,2024-01-21,Delivered
ORD-1009,CUST-209,North America,Electronics,299.99,1,0.05,2024-01-22,Delivered
ORD-1001,CUST-201,North America,Electronics,299.99,1,0.05,2024-01-15,Delivered
ORD-1011,CUST-211,Europe,Clothing,78.00,,0.00,2024-01-23,Delivered
ORD-1012,CUST-212,Asia,Furniture,540.00,2,0.10,2024-01-24,Processing
ORD-1013,CUST-213,North America,Electronics,15000.00,10,0.25,2024-01-25,Delivered
ORD-1014,CUST-214,Europe,Electronics,310.00,1,0.00,2024-01-26,
ORD-1015,CUST-215,North America,Clothing,95.00,2,0.05,2024-01-27,Delivered`,
  },
  {
    id: 'customer-churn',
    name: 'Customer Support & Subscription Churn',
    description: 'Tracks customer tenure, monthly spend, support tickets, and subscription plan status.',
    filename: 'sample_customer_support.csv',
    content: `customer_name,plan_tier,tenure_months,monthly_spend,tickets_opened,satisfaction_score,churned
John Doe,Basic,12,29.99,2,4.5,No
Jane Smith,Pro,24,79.99,0,4.9,No
Michael Brown,Basic,3,29.99,5,2.1,Yes
Emily Davis,Enterprise,36,299.99,1,4.8,No
David Wilson,Pro,8,79.99,4,3.0,Yes
Sarah Taylor,Basic,1,,3,3.2,
James Anderson,Pro,18,79.99,0,4.7,No
Laura Martin,Enterprise,48,299.99,2,4.9,No
Robert White,Basic,5,29.99,6,1.8,Yes
Laura Martin,Enterprise,48,299.99,2,4.9,No`,
  },
];
