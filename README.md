# Simple Weather

### Aplicativo que permite visualizar as condições climáticas de acordo com seu local

##### Desenvolvido com React Native, é possível compilar tanto para IOS como para Android, o mesmo retorna as condições climáticas de acordo com o local do dispositivo, a latitude e longitude são capturadas via GPS, essas informações são requeridas pela API [Open Weather](https://openweathermap.org/api) que retorna os dados do clima daquela região.

##### Na tela de boas-vindas o usuário toca no botão "Começar", depois disso o aplicativo vai requerer a permissão de Localização. Após obter o local o usuário vai ser redirecionado para a tela home, onde os dados principais são exibidos.

### Informações Disponíveis:

- Local
- Temperatura máxima e mínima
- Sensação Térmica
- Umidade
- Velocidade do vento
- Visibilidade
- Previsão do clima para às próximas horas e dias
- Visualizar no mapa o local atual

### Comportamento do App

- Além de mostrar as informações meteorológicas, o layout que se ajusta de forma inteligente às condições atuais.
- Imagens e fundos animados representam as condições climáticas atuais.
- É possível selecionar e atualizar a região através dos ícones inferiores na página inicial.

<div>
  <img alt="img-1" src="https://i.imgur.com/SW14Qyv.jpeg" width="220em" />
  <img alt="img-2" src="https://i.imgur.com/onntn9N.jpg" width="220em" />
</div>

### Estrutura

O app utiliza [Expo](https://expo.dev/) em seu workflow e as libs [styled-components](https://styled-components.com/) e [styled-system](https://styled-system.com/) na composição de sua UI e componentes, esses recursos facilitaram bastante a construção e extensão do aplicativo.

### Instalação Para Testes

Para testar o app deve-se ter o ambiente React Native configurado, e o Expo devidamente instalado, após isso basta no diretório do App executar `yarn instal`.

Obs: Para executar o app corretamente é necessário um dispositivo real, pois no emulador não é possível obter a localização.
