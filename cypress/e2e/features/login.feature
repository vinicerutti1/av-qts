Feature: Login de usuário
  Como um usuário do sistema
  Quero poder acessar minha conta com segurança
  Para gerenciar minhas tarefas pessoais

  Background:
    Given o usuário "John" está cadastrado com o e-mail "john@user.example" e a senha "123456"
    And o usuário acessa a página de login

  Scenario: Login com credenciais válidas
    When o usuário insere o e-mail "john@user.example" e a senha "123456"
    Then o usuário deve ser redirecionado para a página de tarefas
    And deve ver a lista de suas tarefas

  Scenario: Login com senha incorreta
    When o usuário insere o e-mail "john@user.example" e a senha "12345"
    Then o usuário deve ver a mensagem de erro "Falha no login. Verifique suas credenciais."
    And deve continuar na página de login
