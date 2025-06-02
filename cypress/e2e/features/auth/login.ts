import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given(
    'que o usuário {string} está cadastrado com o e-mail {string} e a senha {string}',
    (name: string, email: string, password: string) => {
        cy.registerUser({ name, email, password });
    },
);

Given('está na página de login', () => {
    cy.visit('/login');
    cy.url().should('include', '/login');
    cy.contains('Entrar').should('be.visible');
});

When('informa o e-mail {string} e a senha {string}', (email: string, password: string) => {
    cy.get('input[name="email"]').clear().type(email);
    cy.get('input[name="password"]').clear().type(password);
});

When('envia o formulário de login', () => {
    cy.get('form[data-testid="login-form"]').submit();
});

Then('deve ser redirecionado para a página de tarefas', () => {
    cy.url().should('include', '/tasks');
});

Then('deve visualizar a lista de tarefas', () => {
    cy.contains('Minhas Tarefas').should('be.visible');
});

Then('deve visualizar a mensagem de erro {string}', (message: string) => {
    cy.get('.error-message').should('contain.text', message).and('be.visible');
});

Then('deve permanecer na página de login', () => {
    cy.url().should('include', '/login');
});
