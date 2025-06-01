/* eslint-disable @typescript-eslint/no-namespace */

Cypress.Commands.add('registerUser', (user) => {
    cy.request('POST', 'http://localhost:5000/api/auth/register', user);
});

Cypress.Commands.add('resetDatabase', () => {
    cy.request('POST', 'http://localhost:5000/api/test/reset-database');
});

declare global {
    namespace Cypress {
        interface Chainable {
            resetDatabase(): Chainable<void>;
            registerUser(user: { name: string; email: string; password: string }): Chainable<void>;
        }
    }
}

export {};
