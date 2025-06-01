import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given(
    'o usuário {string} está cadastrado com o e-mail {string} e a senha {string}',
    (name: string, email: string, password: string) => {
        cy.registerUser({ name, email, password });
    },
);

Given('o usuário acessa a página de login', () => {
    cy.visit('/login');
    cy.url().should('include', '/login');
    cy.contains('Entrar').should('be.visible');
});

When('o usuário insere o e-mail {string} e a senha {string}', (email: string, password: string) => {
    cy.get('input[name="email"]').clear().type(email);
    cy.get('input[name="password"]').clear().type(password);
    cy.get('button[type="submit"]').click();
});

Then('o usuário deve ser redirecionado para a página de tarefas', () => {
    cy.url().should('include', '/tasks');
});

Then('deve ver a lista de suas tarefas', () => {
    cy.contains('Minhas Tarefas').should('be.visible');
});

Then('o usuário deve ver a mensagem de erro {string}', (message: string) => {
    cy.get('.error-message').should('contain.text', message).and('be.visible');
});

Then('deve continuar na página de login', () => {
    cy.url().should('include', '/login');
});
