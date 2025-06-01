import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given(
    'o usuário {string} está cadastrado com o e-mail {string} e com a senha {string}',
    (name: string, email: string, password: string) => {
        cy.registerUser({ name, email, password });
    },
);

Given('o usuário acessa a página de login', () => {
    cy.visit('/login');
});

When('o usuário insere o e-mail {string} e a senha {string}', (email: string, password: string) => {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
});

Then('o usuário deve ver a lista das suas tarefas', () => {
    cy.url().should('include', '/tasks');
    cy.contains('Minhas Tarefas');
});
