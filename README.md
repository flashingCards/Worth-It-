# "Worth It?" Calculator

This is a Next.js application that helps users determine if a purchase is worth their time by calculating how many days of work are needed to afford it.

## Description

The "Worth It?" calculator is a simple yet powerful tool for financial planning and decision-making. By inputting your salary and the price of a product, you can quickly see the real-time cost of an item in terms of your work life. The app also provides an estimated completion date for when you'll have earned enough to make the purchase, helping you visualize your financial goals.

## Features

- **Time-to-Purchase Calculation**: Calculates the number of workdays required to afford a product based on your salary.
- **Flexible Salary Input**: Supports both annual and monthly salary inputs for accurate calculations.
- **Customizable Work Schedule**: Allows you to adjust the number of workdays per week and hours per day for a personalized result.
- **Estimated Completion Date**: Provides an estimated date of when you can afford the item if you start saving from a specific day.
- **Dark & Light Mode**: Includes a theme toggle to switch between light and dark modes for user comfort.
- **Responsive Design**: Fully responsive interface that works on all screen sizes, from mobile to desktop.
- **Local Storage**: Your settings (salary type, work schedule, theme) are saved in your browser for a seamless experience.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Form Management**: [React Hook Form](https://react-hook-form.com/)
- **Schema Validation**: [Zod](https://zod.dev/)
- **Date Utilities**: [date-fns](https://date-fns.org/)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit)

## How To Use

1.  Enter your annual or monthly salary.
2.  Enter the price of the product you're considering.
3.  (Optional) Select a start date to estimate when you'll be able to afford it.
4.  Click "Calculate" to see the result.
5.  Use the settings panel to adjust your work schedule for a more accurate calculation.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later)
- [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username_/Project-Name.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Run the development server
    ```sh
    npm run dev
    ```
The application will be available at `http://localhost:9002`.
