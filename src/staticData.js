// src/staticData.js
export const staticCustomers =[
    {
      "id": "1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "123-456-7890"
    },
    {
      "id": "2",
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "phone": "098-765-4321"
    },
    {
      "id": "3",
      "name": "Alice Johnson",
      "email": "alice.johnson@example.com",
      "phone": "555-123-4567"
    }
  ]
  
  
  export const staticProducts = 
    [
        {
          "id": "p1",
          "name": "Product A",
          "rate": 10.0
        },
        {
          "id": "p2",
          "name": "Product B",
          "rate": 20.0
        },
        {
          "id": "p3",
          "name": "Product C",
          "rate": 15.0
        }
      ];
      
  
  export const staticInvoices = [

        {
          "id": "inv1",
          "customerId": "1",
          "detailLines": [
            {
              "productId": "p1",
              "qty": 2,
              "rate": 10.0,
              "amount": 20.0
            },
            {
              "productId": "p2",
              "qty": 1,
              "rate": 20.0,
              "amount": 20.0
            }
          ],
          "totalAmount": 40.0
        },
        {
          "id": "inv2",
          "customerId": "2",
          "detailLines": [
            {
              "productId": "p3",
              "qty": 3,
              "rate": 15.0,
              "amount": 45.0
            }
          ],
          "totalAmount": 45.0
        },
        {
          "id": "inv3",
          "customerId": "3",
          "detailLines": [
            {
              "productId": "p1",
              "qty": 5,
              "rate": 10.0,
              "amount": 50.0
            }
          ],
          "totalAmount": 50.0
        }
      
    // Add more invoices as needed
  ];
  