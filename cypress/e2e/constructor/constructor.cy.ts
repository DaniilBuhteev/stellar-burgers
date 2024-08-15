/// <reference types="cypress" />

describe('consctructor test', () => {
  beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', {
          fixture: 'ingredients.json'
      });
      cy.viewport(1300, 800);
      cy.visit('http://localhost:5173/');
      cy.wait(1000)
  });

  //тест конструктора
  it('test of adding ingredients to the constructor', () => {
      cy.get('[data-cy=burger-ingredient_1')
          .contains('Добавить').click({
              force: true
          });
      cy.get('[data-cy=bun-top]')
          .contains('Краторная булка N-200i')
          .should('exist');
      cy.get('[data-cy=bun-bot]')
          .contains('Краторная булка N-200i')
          .should('exist');
      cy.get('[data-cy=burger-ingredient_2]')
          .contains('Добавить').click({
              force: true
          })
      cy.get('[data-cy=burger-constructor]').contains('Биокотлета из марсианской Магнолии').should('exist');
      cy.get('[data-cy=burger-ingredient_4')
          .contains('Добавить').click({
              force: true
          })
      cy.get('[data-cy=burger-constructor]').contains('Соус Spicy-X').should('exist');
  });

  //тест открытия
  it('open modal', () => {
      cy.get('[data-cy=burger-ingredient_1]').find('a').click({
          force: true
      });
      cy.contains('Детали ингредиента').should('exist');
      cy.get('#modals')
          .contains('Краторная булка N-200i')
          .should('exist');
  });
  // тест закрытия на кнопку
  it('close modal', () => {
      cy.get('[data-cy=burger-ingredient_1]').find('a').click({
          force: true
      });
      cy.contains('Детали ингредиента').should('exist');
      cy.get('[data-cy=modal-close-button]').should('exist').click({
          force: true
      });
  });
  // тест закрытия при клике на оверлей
  it('close modal click on overlay', () => {
      cy.get('[data-cy=burger-ingredient_1]').find('a').click({
          force: true
      });
      cy.contains('Детали ингредиента').should('exist');
      cy.get('[data-cy=overlay]')
          .should('exist')
          .click({
              force: true
          });
      cy.contains('Детали ингредиента').should('not.exist');
  });
});

//тест создания заказа

describe('test order create', () => {
  beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', {
          fixture: 'ingredients.json'
      });
      cy.intercept('GET', 'api/auth/user', {
          fixture: 'user.json'
      });
      cy.intercept('POST', 'api/orders', {
          fixture: 'order.json'
      }).as('order');

      window.localStorage.setItem(
          'refreshToken',
          JSON.stringify('testRefreshToken')
      );
      cy.setCookie('accessToken', 'testAccessToken')
      cy.viewport(1300, 800);
      cy.visit('http://localhost:5173/');
  });

  afterEach(() => {
      cy.clearLocalStorage();
      cy.clearCookies();
  });

  it('test order', () => {
      cy.get('[data-cy=burger-ingredient_1')
          .contains('Добавить').click({
              force: true
          });
      cy.get('[data-cy=burger-ingredient_2]')
          .contains('Добавить').click({
              force: true
          })
      cy.get('[data-cy=burger-ingredient_4]')
          .contains('Добавить').click({
              force: true
          })

      cy.get(`[data-cy=burger-constructor]`).contains('Оформить заказ').click({
          force: true
      });
      cy.wait('@order');
      cy.get('[data-cy=order-number]').contains('49657').should('exist');
      cy.get('[data-cy=overlay]')
          .should('exist')
          .click({
              force: true
          });
      cy.get('[data-cy=order-number]').should('not.exist');

      cy.get('[data-cy=burger-constructor]')
          .contains('Краторная булка N-200i')
          .should('not.exist');
      cy.get('[data-cy=burger-constructor]')
          .contains('Биокотлета из марсианской Магнолии')
          .should('not.exist');
      cy.get('[data-cy=burger-constructor]')
          .contains('Соус Spicy-X')
          .should('not.exist');
  });
});