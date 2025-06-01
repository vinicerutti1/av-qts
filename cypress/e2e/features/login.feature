Feature: Login

  Scenario: Login com credenciais válidas
    Given o usuário "John" está cadastrado com o e-mail "john@user.example" e com a senha "123456"
    And o usuário acessa a página de login
    When o usuário insere o e-mail "john@user.example" e a senha "123456"
    Then o usuário deve ver a lista das suas tarefas
