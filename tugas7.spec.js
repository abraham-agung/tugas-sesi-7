const { test, expect, request } = require('@playwright/test');
const Ajv = require('ajv');
const { get } = require('http');
const ajv = new Ajv();

const userSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        id: { type: "integer" },
        email: { type: "string" },
        first_name: { type: "string" },
        last_name: { type: "string" },
        avatar: { type: "string" }
      },
      required: ["id", "email", "first_name", "last_name", "avatar"]
    }
  },
  required: ["data"]
};

test.describe('API Automation using Playwright', () => {

  //GET Request
  test('GET single user', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2');
    console.log(await response.json()); 
    
    const body = await response.json();
    const validate = ajv.compile(userSchema);
    const valid = validate(body); 
    expect(valid).toBe(true); 
  });

  //POST Request
  test('POST create a new user', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
      data: {
        name: 'John',
        job: 'leader'
      }
    });
    console.log(await response.json());
    expect(response.status()).toBe(201); 
  });

  //DELETE Request
  test('DELETE a user', async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/users/2');
    expect(response.status()).toBe(204); 
  });

  //PUT Request
  test('PUT update a user', async ({ request }) => {
    const response = await request.put('https://reqres.in/api/users/2', {
      data: {
        name: 'Jane',
        job: 'manager'
      }
    });
    console.log(await response.json());
    expect(response.status()).toBe(200); 
  });

});