import { db } from '../utils/db.server';
import axios from 'axios';

export type Expense = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
};

type ExpenseInput = {
  description: string;
  amount: number;
  date: Date;
};

// CREATE
export const createExpense = async (expense: ExpenseInput, authorId: string) => {
  const { description, amount, date } = expense;
  let predictedCategory = 'Uncategorized'; // Default category

  try {
    // 1. Call the AI service to get a category prediction
    const aiServiceUrl = `${process.env.AI_SERVICE_URL}/predict`;
    console.log(`Calling AI service at: ${aiServiceUrl}`);
    
    const response = await axios.post(aiServiceUrl, { description });
    predictedCategory = response.data.predicted_category;
    console.log(`AI predicted category: ${predictedCategory}`);

  } catch (error) {
    console.error("Error calling AI service:", error);
    // If the AI service fails, we'll just use the default category
  }

  // 2. Save the expense to the database with the predicted category
  return db.expense.create({
    data: {
      description,
      amount,
      date,
      category: predictedCategory,
      authorId,
    },
    select: { id: true, description: true, amount: true, category: true, date: true },
  });
};

// READ
export const getExpensesByUser = async (authorId: string) => {
  return db.expense.findMany({
    where: { authorId },
    select: { id: true, description: true, amount: true, category: true, date: true },
    orderBy: { date: 'desc' },
  });
};

// UPDATE
export const updateExpense = async (expense: Omit<Expense, 'id'>, id: string, authorId: string) => {
  const { description, amount, category, date } = expense;
  return db.expense.updateMany({
    where: { id, authorId },
    data: { description, amount, category, date },
  });
};

// DELETE
export const deleteExpense = async (id: string, authorId: string) => {
  return db.expense.deleteMany({
    where: { id, authorId },
  });
};
