# Ignite Shoes

O **Ignite Shoes** é um aplicativo desenvolvido utilizando a plataforma Expo, que proporciona aos entusiastas de tênis uma experiência de compra simplificada e a oportunidade de ficar atualizado com as últimas novidades do mundo dos calçados esportivos.

---

## 🧭 Como rodar o projeto

Instale as dependências

```bash
npm install
```

Crie e preencha as variáveis de ambiente no arquivo `.env`

```bash
cp .env.example .env
```

Rode o projeto

```bash
npx expo run:android
```

## 🎯 Funcionalidades

- **Busca por Marca:** Explore uma ampla seleção de tênis de diversas marcas renomadas. Utilize a funcionalidade de busca para encontrar facilmente os modelos desejados.

- **Adicionar ao Carrinho:** Encontre o par de tênis perfeito e adicione-o ao carrinho de compras com apenas um toque. Visualize e gerencie os itens do carrinho antes de prosseguir para a finalização da compra.

- **Finalizar Compra:** Conclua suas compras de forma rápida e segura. O Ignite Shoes oferece um processo simplificado de finalização da compra, permitindo que você revise seu pedido antes da finalização.

- **Notificações Push:** Mantenha-se atualizado com as últimas novidades, lançamentos e promoções exclusivas do mundo dos tênis. O Ignite Shoes utiliza o serviço OneSignal para enviar notificações push relevantes diretamente para o seu dispositivo. Nunca perca uma oportunidade de adquirir aquele tênis que você tanto deseja.

## 🔗 Deep Linking

**Listagem links**

```bash
npx uri-scheme list
```

**Abrir app usando o link:**

```bash
npx uri-scheme open com.vitorsemidio.igniteshoesapp://192.168.11.11:8081 --android
```

**Abrir app usando deep linking:**

```bash
npx uri-scheme open com.vitorsemidio.igniteshoesapp://details/7 --android
```
