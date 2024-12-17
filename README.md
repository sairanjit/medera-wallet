# Medera Mobile Wallet

![Medera Logo](./assets/medera.png)  
**Medera** - Mobile Wallet for the Hedera Hackathon

This repository contains the mobile wallet for the **Medera** project, a healthcare solution built using the [Hedera Hashgraph](https://hedera.com/) platform. The application is developed using [React Native](https://reactnative.dev).

- We have started the development of the Medera mobile wallet from the [adeya-wallet](https://github.com/credebl/adeya-wallet) repository and proceed to make the changes to the codebase to suit the requirements of the hackathon and to add the functionalities required for the hackathon for the hedera credo Module and hbar payment module.

## Project Overview

**Medera** aims to revolutionize healthcare by leveraging the power of distributed ledger technology (DLT). Using the Hedera network, we ensure secure, transparent, and decentralized healthcare solutions.

This project was built for the **Hedera Hackathon**, showcasing the integration of cutting-edge technologies for a transformative healthcare application.

## Features

- **Payment Module**: Integrates with the Hedera Payment Module to enable secure and efficient payments.
- **Credo Module**: Integrates with the Hedera Credo Module to enable secure and efficient credential exchange and verification.
- **Trust Registry**: Integrates with the Hedera Trust Registry to securely connect and verify identities.

## Table of Contents

- [Medera Mobile Wallet](#medera-mobile-wallet)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
  - [Contributing](#contributing)
    - [Thank you,](#thank-you)

---

## Getting Started

### Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [yarn](https://yarnpkg.com/) (1.22.22)
- [Android](https://developer.android.com/studio)
- [React Native](https://reactnative.dev/docs/environment-setup)
- A Hedera testnet/mainnet account ([Get one here](https://portal.hedera.com/))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sairanjit/medera-wallet.git
   cd medera-wallet.
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Install the application on your android device:

   ```bash
   yarn android
   ```

4. For development mode with hot-reloading:

   ```bash
   yarn start
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
MEDIATOR_URL=https://us-east2.public.mediator.indiciotech.io/message?oob=eyJAaWQiOiIyNzFmYTZiYS0xYmUxLTQ0ZDEtYjZlZi01ZmM2ODcyZTY4NmYiLCJAdHlwZSI6Imh0dHBzOi8vZGlkY29tbS5vcmcvb3V0LW9mLWJhbmQvMS4xL2ludml0YXRpb24iLCJoYW5kc2hha2VfcHJvdG9jb2xzIjpbImh0dHBzOi8vZGlkY29tbS5vcmcvZGlkZXhjaGFuZ2UvMS4wIl0sImFjY2VwdCI6WyJkaWRjb21tL2FpcDEiLCJkaWRjb21tL2FpcDI7ZW52PXJmYzE5Il0sImxhYmVsIjoiQ2xvdWQgTWVkaWF0b3IiLCJzZXJ2aWNlcyI6W3siaWQiOiIjaW5saW5lIiwidHlwZSI6ImRpZC1jb21tdW5pY2F0aW9uIiwicmVjaXBpZW50S2V5cyI6WyJkaWQ6a2V5Ono2TWtnczZNd1lCM1lnVG9aWEd3a25xQzM1MmNiSHR4SnNpM3pYWmZGMXQyZk5rVCN6Nk1rZ3M2TXdZQjNZZ1RvWlhHd2tucUMzNTJjYkh0eEpzaTN6WFpmRjF0MmZOa1QiXSwic2VydmljZUVuZHBvaW50IjoiaHR0cHM6Ly91cy1lYXN0Mi5wdWJsaWMubWVkaWF0b3IuaW5kaWNpb3RlY2guaW8vbWVzc2FnZSJ9LHsiaWQiOiIjaW5saW5lIiwidHlwZSI6ImRpZC1jb21tdW5pY2F0aW9uIiwicmVjaXBpZW50S2V5cyI6WyJkaWQ6a2V5Ono2TWtnczZNd1lCM1lnVG9aWEd3a25xQzM1MmNiSHR4SnNpM3pYWmZGMXQyZk5rVCN6Nk1rZ3M2TXdZQjNZZ1RvWlhHd2tucUMzNTJjYkh0eEpzaTN6WFpmRjF0MmZOa1QiXSwic2VydmljZUVuZHBvaW50Ijoid3NzOi8vd3MudXMtZWFzdDIucHVibGljLm1lZGlhdG9yLmluZGljaW90ZWNoLmlvL3dzIn1dfQ==
```

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

### Thank you,

![Hedera Logo](./assets/hedera.png)
